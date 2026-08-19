export interface LegalInfo {
  name: string
  nif: string
  address: string
  email: string
  activity: string
  website: string
}

export function getLegalInfo(): LegalInfo {
  return {
    name: process.env.NEXT_PUBLIC_LEGAL_NAME ?? "Andoni Vianez Ulloa",
    nif: process.env.NEXT_PUBLIC_LEGAL_NIF ?? "72523047K",
    address:
      process.env.NEXT_PUBLIC_LEGAL_ADDRESS ??
      "Plaza Kontxa Etxeberria 11, 2C, 20115 Astigarraga, Gipuzkoa, España",
    email: process.env.NEXT_PUBLIC_LEGAL_EMAIL ?? "andoni.bartolo@gmail.com",
    activity:
      process.env.NEXT_PUBLIC_LEGAL_ACTIVITY ??
      "Programación informática, desarrollo web y móvil, consultoría técnica e IA aplicada",
    website: "https://www.andonivianez.info",
  }
}
