// src/app/[city]/page.tsx
import { redirect } from "next/navigation";

export default async function CityIndex({
  params,
}: {
  params: { city: string };
}) {
  // Şehre girince varsayılan olarak "aksam"a yönlendir
  redirect(`/${params.city}/aksam`);
}
