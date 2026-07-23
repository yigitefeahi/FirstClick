import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const modulesSrc = join(root, "node_modules/@met4citizen/talkinghead/modules");
const meshoptSrc = join(root, "node_modules/three/examples/jsm/libs/meshopt_decoder.module.js");
const dest = join(root, "public/talkinghead");

if (!existsSync(modulesSrc)) {
  console.warn("[sync-talkinghead] @met4citizen/talkinghead not installed; skipping.");
  process.exit(0);
}

if (existsSync(dest)) {
  rmSync(dest, { recursive: true, force: true });
}
mkdirSync(dest, { recursive: true });
cpSync(modulesSrc, dest, { recursive: true });

if (existsSync(meshoptSrc)) {
  cpSync(meshoptSrc, join(dest, "meshopt_decoder.module.js"));
}

const talkingHeadPath = join(dest, "talkinghead.mjs");
let talkingHeadSource = readFileSync(talkingHeadPath, "utf8");

talkingHeadSource = talkingHeadSource.replace(
  "import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';",
  "import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';\nimport { MeshoptDecoder } from './meshopt_decoder.module.js';"
);

talkingHeadSource = talkingHeadSource.replace(
  "    // Loader\n    const loader = new GLTFLoader();\n\n    // Check if draco loading enabled",
  "    // Loader\n    const loader = new GLTFLoader();\n    if ( !TalkingHead.meshoptReady ) {\n      await MeshoptDecoder.ready;\n      TalkingHead.meshoptReady = true;\n    }\n    loader.setMeshoptDecoder( MeshoptDecoder );\n\n    // Check if draco loading enabled"
);

// VRoid / Mixamo / blendshape-less models support
talkingHeadSource = talkingHeadSource.replace(
  "    let gltf = await loader.loadAsync( avatar.url, onprogress );\n\n    // Check the gltf",
  `    let gltf = await loader.loadAsync( avatar.url, onprogress );

    // Normalize Mixamo bone prefixes (e.g. mixamorig:Head → Head)
    gltf.scene.traverse( ( obj ) => {
      if ( !obj.name ) return;
      if ( obj.name.startsWith('mixamorig:') ) {
        obj.name = obj.name.slice('mixamorig:'.length);
      } else if ( obj.name.startsWith('mixamorig') ) {
        obj.name = obj.name.replace(/^mixamorig[_:]?/, '');
      }
    });

    // Ensure modelRoot (Armature) exists — wrap scene children if needed (e.g. VRoid)
    if ( !gltf.scene.getObjectByName( this.opt.modelRoot ) ) {
      const hips = gltf.scene.getObjectByName('Hips') || gltf.scene.getObjectByName('hips');
      if ( hips ) {
        const armature = new THREE.Object3D();
        armature.name = this.opt.modelRoot;
        const children = [...gltf.scene.children];
        for ( const child of children ) {
          armature.add( child );
        }
        gltf.scene.add( armature );
      }
    }

    // Check the gltf`
);

talkingHeadSource = talkingHeadSource.replace(
  `    if ( this.morphs.length === 0 ) {
      throw new Error('Blend shapes not found');
    }

    // Morph target keys and values
    const keys = new Set(this.mtCustoms);
    this.morphs.forEach( x => {
      Object.keys(x.morphTargetDictionary).forEach( y => keys.add(y) );
    });

    // Add RPM extra blend shapes, if missing
    this.mtExtras.forEach( x => {
      if ( !keys.has(x.key) ) {
        this.addMixedMorphTarget( this.morphs, x.key, x.mix );
        keys.add(x.key);
      }
    });`,
  `    // Morph target keys and values
    const keys = new Set(this.mtCustoms);
    if ( this.morphs.length === 0 ) {
      // Allow Mixamo bodies without ARKit shapes (audio-driven mouth still works)
      console.warn('TalkingHead: Blend shapes not found; facial morphs disabled.');
      [
        'mouthOpen','jawOpen','mouthSmile','eyesClosed','eyesLookUp','eyesLookDown',
        'eyeBlinkLeft','eyeBlinkRight','browDownLeft','browDownRight',
        'eyeLookInLeft','eyeLookOutLeft','eyeLookInRight','eyeLookOutRight',
        'eyeLookUpLeft','eyeLookUpRight','eyeLookDownLeft','eyeLookDownRight',
        // mtRandomized + onchange deps — animate() indexes these every frame
        'mouthDimpleLeft','mouthDimpleRight','mouthLeft','mouthPressLeft',
        'mouthPressRight','mouthStretchLeft','mouthStretchRight',
        'mouthShrugLower','mouthShrugUpper','noseSneerLeft','noseSneerRight',
        'mouthRollLower','mouthRollUpper','browOuterUpLeft','browOuterUpRight',
        'cheekPuff','cheekSquintLeft','cheekSquintRight'
      ].forEach( (k) => keys.add(k) );
    } else {
      this.morphs.forEach( x => {
        Object.keys(x.morphTargetDictionary).forEach( y => keys.add(y) );
      });
      // Add RPM extra blend shapes, if missing
      this.mtExtras.forEach( x => {
        if ( !keys.has(x.key) ) {
          this.addMixedMorphTarget( this.morphs, x.key, x.mix );
          keys.add(x.key);
        }
      });
    }`
);

talkingHeadSource = talkingHeadSource.replace(
  "this.volumeFrequencyData = new Uint8Array(16);",
  "this.volumeFrequencyData = new Uint8Array(this.audioAnalyzerNode.frequencyBinCount);"
);

// Guard morph-less / incomplete ARKit sets: mtRandomized keys may be missing
talkingHeadSource = talkingHeadSource.replace(
  "      j = this.mtAvatar[i];\n      if ( !j.needsUpdate ) {\n        Object.assign(j,{ base: (this.mood.baseline[i] || 0) + ( 1 + vol/255 ) * Math.random() / 5, needsUpdate: true });\n      }",
  "      j = this.mtAvatar && this.mtAvatar[i];\n      if ( j && !j.needsUpdate ) {\n        Object.assign(j,{ base: (this.mood.baseline[i] || 0) + ( 1 + vol/255 ) * Math.random() / 5, needsUpdate: true });\n      }"
);

// Only randomize morphs that actually exist on this avatar
talkingHeadSource = talkingHeadSource.replace(
  "    this.mtAvatar = mtTemp;\n\n    // Objects for needed properties",
  "    this.mtAvatar = mtTemp;\n    this.mtRandomized = this.mtRandomized.filter( (k) => !!this.mtAvatar[k] );\n\n    // Objects for needed properties"
);

// Soften onchange hooks that assume blink morphs exist
talkingHeadSource = talkingHeadSource.replace(
  `      eyesLookDown: () => {
        this.mtAvatar['eyeBlinkLeft'].needsUpdate = true;
        this.mtAvatar['eyeBlinkRight'].needsUpdate = true;
      },
      browDownLeft: () => { this.mtAvatar['eyeBlinkLeft'].needsUpdate = true; },
      browDownRight: () => { this.mtAvatar['eyeBlinkRight'].needsUpdate = true; }`,
  `      eyesLookDown: () => {
        if ( this.mtAvatar['eyeBlinkLeft'] ) this.mtAvatar['eyeBlinkLeft'].needsUpdate = true;
        if ( this.mtAvatar['eyeBlinkRight'] ) this.mtAvatar['eyeBlinkRight'].needsUpdate = true;
      },
      browDownLeft: () => { if ( this.mtAvatar['eyeBlinkLeft'] ) this.mtAvatar['eyeBlinkLeft'].needsUpdate = true; },
      browDownRight: () => { if ( this.mtAvatar['eyeBlinkRight'] ) this.mtAvatar['eyeBlinkRight'].needsUpdate = true; }`
);

talkingHeadSource = talkingHeadSource.replace(
  `    // Speaking
    if ( this.isSpeaking ) {
      vol = 0;
      this.audioAnalyzerNode.getByteFrequencyData(this.volumeFrequencyData);
      for (i=2, l=10; i<l; i++) {
        if (this.volumeFrequencyData[i] > vol) {
          vol = this.volumeFrequencyData[i];
        }
      }
    }`,
  `    // Speaking — wider band + audio-driven jaw for external TTS
    if ( this.isSpeaking ) {
      vol = 0;
      this.audioAnalyzerNode.getByteFrequencyData(this.volumeFrequencyData);
      for (i=2, l=Math.min(32, this.volumeFrequencyData.length); i<l; i++) {
        if (this.volumeFrequencyData[i] > vol) {
          vol = this.volumeFrequencyData[i];
        }
      }
      if ( this.isAudioPlaying && this.mtAvatar ) {
        const mouthOpenAmt = Math.max(0.06, Math.min(1, Math.pow(Math.max(vol, 8) / 90, 0.58) * 1.15));
        for ( const mk of ['mouthOpen','jawOpen'] ) {
          const m = this.mtAvatar[mk];
          if ( m ) { m.realtime = mouthOpenAmt; m.needsUpdate = true; }
        }
      }
    } else if ( this.mtAvatar ) {
      for ( const mk of ['mouthOpen','jawOpen'] ) {
        const m = this.mtAvatar[mk];
        if ( m && m.realtime !== null ) { m.realtime = null; m.needsUpdate = true; }
      }
    }`
);

writeFileSync(talkingHeadPath, talkingHeadSource, "utf8");
console.log("[sync-talkinghead] Copied TalkingHead modules to public/talkinghead");
