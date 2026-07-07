export interface RotaryMember {
  name: string;
  position: string;
  phone: string;
  email: string;
}

export interface RotaryDirectoryData {
  members: readonly RotaryMember[];
}

export function normalizeRotaryName(value: string) {
  const name = value.replace(/\s+/g, " ").trim();

  return /^Rtn\.?/i.test(name) ? name : `Rtn. ${name}`;
}

export function normalizePhone(value: string) {
  return value.replace(/\s+/g, " ").trim();
}