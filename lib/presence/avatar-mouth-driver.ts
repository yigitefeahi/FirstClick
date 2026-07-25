type MorphTargetState = {
  realtime: number | null;
  needsUpdate: boolean;
};

export type MouthDriverHead = {
  audioAnalyzerNode: AnalyserNode;
  mtAvatar: Record<string, MorphTargetState>;
  isSpeaking?: boolean;
  isAudioPlaying?: boolean;
};

const MOUTH_REALTIME_KEYS = ["mouthOpen", "jawOpen"] as const;
const MOUTH_OPEN_MIN = 0.02;
const MOUTH_OPEN_MAX = 0.22;
const MOUTH_RMS_GAIN = 2.1;
const MOUTH_PEAK_GAIN = 0.38;
const MOUTH_SMOOTHING = 0.34;

type MouthDriverState = {
  timeData: Uint8Array;
  smooth: number;
};

const driverState = new WeakMap<MouthDriverHead, MouthDriverState>();

function getState(head: MouthDriverHead): MouthDriverState {
  let state = driverState.get(head);
  if (!state) {
    state = {
      timeData: new Uint8Array(head.audioAnalyzerNode.fftSize),
      smooth: 0,
    };
    driverState.set(head, state);
  }
  return state;
}

function setMouthRealtime(head: MouthDriverHead, amount: number) {
  const clamped = Math.max(MOUTH_OPEN_MIN, Math.min(MOUTH_OPEN_MAX, amount));
  for (const key of MOUTH_REALTIME_KEYS) {
    const mt = head.mtAvatar[key];
    if (!mt) continue;
    mt.realtime = clamped;
    mt.needsUpdate = true;
  }
}

export function tickAudioDrivenMouth(head: MouthDriverHead): void {
  if (!head.isSpeaking && !head.isAudioPlaying) {
    clearAudioDrivenMouth(head);
    return;
  }

  const state = getState(head);
  const analyser = head.audioAnalyzerNode;

  analyser.getByteTimeDomainData(state.timeData as Uint8Array<ArrayBuffer>);
  let sum = 0;
  for (let i = 0; i < state.timeData.length; i += 1) {
    const sample = (state.timeData[i] - 128) / 128;
    sum += sample * sample;
  }
  const rms = Math.sqrt(sum / state.timeData.length);

  const freq = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(freq);
  let peak = 0;
  for (let i = 2; i < Math.min(24, freq.length); i += 1) {
    peak = Math.max(peak, freq[i]);
  }

  const target = Math.min(
    1,
    Math.max(rms * MOUTH_RMS_GAIN, Math.pow(peak / 100, 0.62) * MOUTH_PEAK_GAIN)
  );
  state.smooth += (target - state.smooth) * MOUTH_SMOOTHING;
  setMouthRealtime(head, state.smooth);
}

export function clearAudioDrivenMouth(head: MouthDriverHead): void {
  const state = driverState.get(head);
  if (state) state.smooth = 0;

  for (const key of MOUTH_REALTIME_KEYS) {
    const mt = head.mtAvatar[key];
    if (!mt || mt.realtime === null) continue;
    mt.realtime = null;
    mt.needsUpdate = true;
  }
}
