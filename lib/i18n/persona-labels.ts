import { PERSONA_OPTIONS } from "@/lib/constants";
import { translate, type Locale } from "@/lib/i18n/dictionaries";

export function personaLabelKey(id: string): string {
  return `persona.${id}.label`;
}

export function personaDescriptionKey(id: string): string {
  return `persona.${id}.description`;
}

export function personaTaglineKey(id: string): string {
  return `persona.${id}.tagline`;
}

export function personaPackDescriptionKey(id: string): string {
  return `pack.${id}.description`;
}

export function localizedPersonaLabel(t: (key: string) => string, id: string): string {
  return t(personaLabelKey(id));
}

export function localizedPersonaDescription(t: (key: string) => string, id: string): string {
  return t(personaDescriptionKey(id));
}

export function localizedPersonaTagline(t: (key: string) => string, id: string): string {
  return t(personaTaglineKey(id));
}

export function resolvePersonaIdFromDisplayName(name: string): string | null {
  for (const opt of PERSONA_OPTIONS) {
    if (opt.label === name) return opt.id;
    for (const locale of ["tr", "en"] as Locale[]) {
      if (translate(locale, personaLabelKey(opt.id)) === name) return opt.id;
    }
  }
  return null;
}

/** Map stored persona display name (TR or EN) to current UI locale label. */
export function localizedPersonaDisplayName(t: (key: string) => string, name: string): string {
  const id = resolvePersonaIdFromDisplayName(name);
  return id ? localizedPersonaLabel(t, id) : name;
}

export function localizedTimelineStep(t: (key: string) => string, step: string): string {
  const key = `timeline.step.${step}`;
  const translated = t(key);
  return translated === key ? step : translated;
}
