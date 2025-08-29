"use client";
import { useEffect, useState } from "react";

export default function DatePickerHorizontal({
  selectedDate,
  onSelect,
}: {
  selectedDate: string;
  onSelect: (d: string) => void;
}) {
  const [dates, setDates] = useState<string[]>([]);
  const gunler = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

  // YYYY-MM-DD (yerel)
  const toYmd = (d: Date) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // "YYYY-MM-DD" -> Date (yerel)  // boyutu etkilemiyor, sadece doğru gün adı
  const fromYmdLocal = (ymd: string) => {
    const [y, m, d] = ymd.split("-").map(Number);
    return new Date(y, (m ?? 1) - 1, d ?? 1);
  };

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const all = Array.from({ length: daysInMonth }, (_, i) => {
      const d = new Date(year, month, i + 1);
      return toYmd(d);
    });

    setDates(all);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const el = document.getElementById(`menu-${selectedDate}`);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
    }
  }, [selectedDate]);

  return (
    <div
      id="datePicker"
      className="flex flex-nowrap gap-3 px-4 py-4 max-w-5xl mx-auto mt-2 overflow-x-auto no-scrollbar snap-x scroll-smooth"
    >
      {dates.map((ds) => {
        const d = fromYmdLocal(ds);
        const gunNum = d.getDate();
        const gunAdi = gunler[d.getDay()];
        const isSelected = selectedDate === ds;

        return (
          <div
            id={`menu-${ds}`}
            key={ds}
            onClick={() => onSelect(ds)}
            className={`flex-shrink-0 flex flex-col items-center justify-center min-w-[56px] px-3 py-2 rounded-xl cursor-pointer text-sm ${
              isSelected
                ? "bg-[#98d2dd] text-white font-bold"
                : "bg-white text-gray-700 border border-[#98d2dd]"
            } hover:bg-[#8ccddd] hover:text-white`}
          >
            <div className="text-lg">{gunNum}</div>
            <div>{gunAdi}</div>
          </div>
        );
      })}
    </div>
  );
}
