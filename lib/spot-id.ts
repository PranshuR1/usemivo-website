// A Mivo Spot ID: 6 to 12 uppercase letters and digits (Mivo generates 8 from an alphabet without
// look-alike characters). It is only a lookup key; the tag carries nothing else.
export const OFFICIAL_SPOT_ID = /^[A-Z0-9]{6,12}$/;
const LEGACY_SPOT_ID = /^[a-z0-9-]{8,64}$/;

// "official": https://usemivo.app/s/<ID>, the product. "legacy": https://usemivo.app/spot/<uuid>, the
// first version, where a person wrote the sticker themselves.
export type SpotLinkKind = "official" | "legacy";

export function normalizeSpotId(raw: string): string | null {
  const id = raw.trim().toUpperCase();
  return OFFICIAL_SPOT_ID.test(id) ? id : null;
}

// "RXJEEK9U" -> "RXJE EK9U"
export function formatSpotId(id: string) {
  return id.replace(/(.{4})(?=.)/g, "$1 ");
}

// Where the "Open in Mivo" button goes. The ID is only handed to the app, which checks it after sign-in.
export function spotOpenUrl(kind: SpotLinkKind, rawId: string): string {
  if (kind === "official") {
    const id = normalizeSpotId(rawId);
    return id ? `mivo://s/${id}` : "mivo://s";
  }
  const id = rawId.toLowerCase();
  return LEGACY_SPOT_ID.test(id) ? `mivo://spot/${id}` : "mivo://spot";
}
