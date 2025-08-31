export const mealSlugToType: Record<string, number> = {
  kahvalti: 0,
  ogle: 1,
  aksam: 2,
};
export const mealTypeToSlug = ["kahvalti", "ogle", "aksam"];

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
