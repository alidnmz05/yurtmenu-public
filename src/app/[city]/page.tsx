// src/app/[city]/page.tsx
import { redirect } from "next/navigation";

// ✅ params Promise olmalı
type CityParams = Promise<{ city: string }>;

export default async function CityIndex({ params }: { params: CityParams }) {
  const { city } = await params; // ✅ await etmeden kullanamazsın

  // Şehre girince varsayılan olarak "aksam"a yönlendir
  redirect(`/${city}/aksam`);
}
