export const mealSlugToType: Record<string, number> = {
  kahvalti: 0,
  sabah: 0,    // sabah da kahvaltı ile aynı
  ogle: 1,     // öğle = akşam kategorisi
  aksam: 1,    // akşam = akşam kategorisi
};
export const mealTypeToSlug = ["kahvalti", "aksam"];  // API için varsayılan slug'lar

// Switch için: sabah grubu (0) veya akşam grubu (1)
export function mealTypeToSwitchValue(mealType: number): number {
  return mealType === 0 ? 0 : 1;  // 0=sabah, 1=akşam
}

// Switch değerinden meal type'a
export function switchValueToMealType(switchValue: number): number {
  return switchValue === 0 ? 0 : 1;  // 0->sabah(0), 1->akşam(1)
}

// Türkiye'deki 81 il - API'de olmasa bile dropdown'da göstermek için
export const ALL_CITIES_TR = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", 
  "Antalya", "Ardahan", "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman", 
  "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", 
  "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan", 
  "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", 
  "Iğdır", "Isparta", "İstanbul", "İzmir", "Kahramanmaraş", "Karabük", "Karaman", 
  "Kars", "Kastamonu", "Kayseri", "Kilis", "Kırıkkale", "Kırklareli", "Kırşehir", 
  "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", 
  "Muş", "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", 
  "Şanlıurfa", "Siirt", "Sinop", "Şırnak", "Sivas", "Tekirdağ", "Tokat", "Trabzon", 
  "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak"
];

export function slugifyCity(name: string) {
  return name
    .toLowerCase()
    .replaceAll("ç","c").replaceAll("ğ","g").replaceAll("ı","i")
    .replaceAll("ö","o").replaceAll("ş","s").replaceAll("ü","u")
    .replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"").replace(/-+/g,"-");
}

export function humanMeal(slug: string) {
  return slug === "kahvalti" ? "Kahvaltı" : slug === "ogle" ? "Öğle" : "Akşam";
}

// Slug'dan şehir ismini bul
export function findCityBySlug(slug: string): string | null {
  return ALL_CITIES_TR.find(city => slugifyCity(city) === slug) || null;
}
