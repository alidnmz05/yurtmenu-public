// ─────────────────────────────────────────────────────────────────────────────
// 📁 /components/MealTypeSwitch.tsx
// 0: sabah, 1: akşam toggle
// ─────────────────────────────────────────────────────────────────────────────
"use client";
export default function MealTypeSwitch({
value,
onChange,
}: {
value: number;
onChange: (v: number) => void;
}) {
return (
<div className="flex justify-center items-center gap-4 mt-4 animate-fade-up">
<label className="text-sm font-semibold text-[#4b3e2b]">Öğün:</label>
<div className="flex items-center gap-2">
<span className="text-sm">🌤️ Sabah</span>
<label className="relative inline-flex items-center cursor-pointer">
<input
type="checkbox"
aria-label="Öğün Seçimi (Sabah veya Akşam)"
checked={value === 1}
onChange={(e) => onChange(e.target.checked ? 1 : 0)}
className="sr-only peer"
/>
<div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-400 rounded-full peer dark:bg-gray-700 peer-checked:bg-orange-400 transition-all" />
<span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5" />
</label>
<span className="text-sm">🌙 Akşam</span>
</div>
</div>
);
}