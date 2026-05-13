// src/app/api/menu/liste/route.ts
// Firebase fallback: Firestore'dan mevcut ayın menüsünü döndürür.
//
// Firestore yapısı (MenuController.cs ile aynı):
//   mealType=0  →  breakfast/{cityId}/months/{yyyyMM}/days/all
//   mealType=1  →  meal/{cityId}/months/{yyyyMM}/days/all
//
//   Döküman alanları:
//     daysMap: {
//       "2026-05-13": {
//         items: [{ itemId, first, firstCalories[], second, secondCalories[],
//                   third, thirdCalories[], fourth, fourthCalories[], totalCalories }],
//         count: number
//       },
//       ...
//     }
//
// Response (MenuItem[]) — types/menu.ts ile uyumlu:
//   id, date, mealType, cityId, first, firstCalories (string),
//   second, secondCalories (string), third, thirdCalories (string),
//   fourth, fourthCalories (string), totalCalories

import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "@/lib/firebase-admin";

type FsItem = {
  itemId?: string;
  first?: string;
  firstCalories?: number[];
  second?: string;
  secondCalories?: number[];
  third?: string;
  thirdCalories?: number[];
  fourth?: string;
  fourthCalories?: number[];
  totalCalories?: number;
};

type DayEntry = {
  items?: FsItem[];
  count?: number;
};

function caloriesToString(arr?: number[]): string {
  if (!arr || arr.length === 0) return "";
  return arr.join(",");
}

function topCollection(mealType: number): string {
  return mealType === 0 ? "breakfast" : "meal";
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const cityId = Number(searchParams.get("cityId") ?? 0);
  const mealType = Number(searchParams.get("mealType") ?? 0);

  if (!cityId || isNaN(cityId)) {
    return NextResponse.json({ error: "cityId gerekli" }, { status: 400 });
  }

  try {
    const db = getFirestore();
    const today = new Date();

    // Mevcut ay ve gerekirse bir önceki ay verilerini çek
    // (ayın 1-2. günlerinde önceki aya ait menüler görünebilir)
    const months: string[] = [];
    const yyyyMM = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
    months.push(yyyyMM);

    // Ayın ilk 3 günündeyse önceki ayı da çek
    if (today.getDate() <= 3) {
      const prev = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const prevMM = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, "0")}`;
      months.push(prevMM);
    }

    const top = topCollection(mealType);
    const allMenuItems: unknown[] = [];
    let idCounter = 1;

    for (const month of months) {
      const docPath = `${top}/${cityId}/months/${month}/days/all`;
      const docSnap = await db.doc(docPath).get();

      if (!docSnap.exists) continue;

      const data = docSnap.data();
      if (!data?.daysMap) continue;

      const daysMap = data.daysMap as Record<string, DayEntry>;

      // Tarihe göre sıralı şekilde gün gün işle
      const sortedDates = Object.keys(daysMap).sort();

      for (const dateKey of sortedDates) {
        const dayEntry = daysMap[dateKey];
        if (!dayEntry?.items?.length) continue;

        for (const item of dayEntry.items) {
          allMenuItems.push({
            id: idCounter++,
            date: dateKey,
            mealType,
            cityId,
            first: item.first ?? "",
            firstCalories: caloriesToString(item.firstCalories),
            second: item.second ?? "",
            secondCalories: caloriesToString(item.secondCalories),
            third: item.third ?? "",
            thirdCalories: caloriesToString(item.thirdCalories),
            fourth: item.fourth ?? "",
            fourthCalories: caloriesToString(item.fourthCalories),
            totalCalories: item.totalCalories ?? 0,
          });
        }
      }
    }

    return NextResponse.json(allMenuItems);
  } catch (err) {
    console.error("[/api/menu/liste] Firestore error:", err);
    return NextResponse.json(
      { error: "Menüler yüklenemedi" },
      { status: 500 }
    );
  }
}
