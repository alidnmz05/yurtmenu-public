// src/lib/cities.ts
// Firestore'daki collection isimleriyle eşleşen statik şehir listesi.
// C# tarafındaki GetTargetCityMap() ile birebir aynı tutulmalı.

export type City = { id: number; name: string; slug: string };

// plaka (cityId) → Firestore collection adı (lowercase)
export const CITY_MAP: Record<number, string> = {
  1:  "adana",
  6:  "ankara",
  7:  "antalya",
  10: "balıkesir",
  16: "bursa",
  17: "çanakkale",
  19: "çorum",
  20: "denizli",
  25: "erzurum",
  26: "eskişehir",
  28: "giresun",
  32: "isparta",
  33: "mersin",
  34: "istanbul",
  35: "izmir",
  36: "kars",
  38: "kayseri",
  41: "kocaeli",
  42: "konya",
  43: "kütahya",
  44: "malatya",
  48: "muğla",
  50: "nevşehir",
  53: "rize",
  54: "sakarya",
  55: "samsun",
  59: "tekirdağ",
  61: "trabzon",
  63: "şanlıurfa",
  70: "karaman",
  78: "karabük",
  81: "düzce",
};

// "istanbul" → "İstanbul", "şanlıurfa" → "Şanlıurfa"
function capitalize(str: string): string {
  if (!str) return str;
  const trMap: Record<string, string> = { i: "İ", ı: "I", ş: "Ş", ğ: "Ğ", ç: "Ç", ö: "Ö", ü: "Ü" };
  const first = str[0];
  const upper = trMap[first] ?? first.toUpperCase();
  return upper + str.slice(1);
}

export const CITIES: City[] = Object.entries(CITY_MAP)
  .map(([id, slug]) => ({
    id: Number(id),
    name: capitalize(slug),
    slug,
  }))
  .sort((a, b) => a.id - b.id);
