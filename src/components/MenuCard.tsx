// app/components/MenuCard.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MenuItem } from "@/types/menu";

/* ---- utils ---- */
function cssVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

/** "A/B/C" + "100,200,..." -> [{name,kcal}] */
function parseMeals(names?: string, kcals?: string) {
  const out: Array<{ name: string; kcal?: string }> = [];
  if (!names) return out;
  const n = names.split("/").map((s) => s.trim()).filter(Boolean);
  const k = (kcals ?? "").split(",").map((s) => s.trim());
  for (let i = 0; i < n.length; i++) out.push({ name: n[i], kcal: k[i] ? `${k[i]} kcal` : undefined });
  return out;
}

/** "136 kcal" -> 136 */
function kcalNumber(k?: string) {
  if (!k) return undefined;
  const m = k.match(/(\d+(?:[.,]\d+)?)/);
  if (!m) return undefined;
  return Number(m[1].replace(",", "."));
}

/* inline token tipi */
type InlineToken = { kind: "text"; text: string; color: string };

export default function MenuCard(props: MenuItem) {
  /* ---- date labels ---- */
  const GUN = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
  const AY  = ["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"];
  const d = useMemo(() => new Date(props.date), [props.date]);
  const gunAdi = GUN[d.getDay()];
  const gunNum = d.getDate();
  const ayKisa = AY[d.getMonth()];
  const yil = d.getFullYear();

  /* ---- container / canvas ---- */
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [wrapW, setWrapW] = useState(720);

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((e) => {
      const w = Math.floor(e[0].contentRect.width);
      setWrapW(Math.max(420, Math.min(1200, w)));
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  /* ---- palette (CSS vars + fallback) ---- */
  const p = useMemo(() => ({
    card:      cssVar("--card", "#ffffff"),
    border:    cssVar("--border", "#e6e8ec"),
    text:      cssVar("--text", "#1f2937"),
    muted:     cssVar("--muted", "#6b7280"),
    successBg: cssVar("--success-bg", "#e5f3e5"),
    successFg: cssVar("--success-fg", "#155c28"),
    info:      cssVar("--info", "#98d2dd"),
    warning:   cssVar("--warning", "#f8c27e"),
    dangerBg:  cssVar("--danger-bg", "#FEE2E2"),
    dangerFg:  cssVar("--danger-fg", "#991B1B"),
  }), []);

  /* ---- GRUPLAR: solda adlar, sağda kaloriler ---- */
  const groups = useMemo(() => {
    return [ [props.first, props.firstCalories],
             [props.second, props.secondCalories],
             [props.third, props.thirdCalories],
             [props.fourth, props.fourthCalories] ]
      .map(([names, kcals]) => {
        const parts = parseMeals(names, kcals); // [{name,kcal}]
        if (!parts.length) return null;

        // solda: "A / B / C"
        const leftTokens: InlineToken[] = [];
        parts.forEach((it, i) => {
          leftTokens.push({ kind: "text", text: it.name, color: p.text });
          if (i !== parts.length - 1) {
            leftTokens.push({ kind: "text", text: " / ", color: p.muted });
          }
        });

        // sağda: "x kcal / y kcal"
        const rightString = parts
          .map((it) => it.kcal)
          .filter(Boolean)
          .join(" / ");

        return { leftTokens, rightString };
      })
      .filter(Boolean) as { leftTokens: InlineToken[]; rightString: string }[];
  }, [
    props.first, props.firstCalories,
    props.second, props.secondCalories,
    props.third, props.thirdCalories,
    props.fourth, props.fourthCalories,
    p.text, p.muted
  ]);

  /* ---- painter ---- */
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const W = wrapW;

    // W/base = ölçek
    const base = 500;
    const s = Math.max(1, W / base);

    // Spacing & sizes
    const PADX = Math.round(16 * s);
    const PADY = Math.round(16 * s);
    const cornerR = Math.round(4 * s);

    const stripeH = Math.round(10 * s);
    const chipH   = Math.round(32 * s);
    const chipR   = Math.round(18 * s);
    const chipPX  = Math.round(16 * s);

    const titleSize = Math.round(20 * s);
    const dateSize  = Math.round(20 * s);

    const nameSize  = Math.round(20 * s);
    const nameLH    = Math.round(32 * s);

    const kcalSize  = Math.round(11 * s);

    const rowGap    = Math.round(24 * s);
    const sepYPad   = Math.round(24 * s); // BOŞLUK KALDI

    const maxW = W - PADX * 2;
    const gapLR = Math.round(12 * s); // sol metin ile sağ kalori arası minimum boşluk

    /* ---- (Eski) pill helpers (kullanılmıyor) ---- */
    const LOW_MAX = 250;
    const HIGH_MIN = 600;
    function kcalColors(k?: string) {
      const n = kcalNumber(k);
      if (n == null) return { bg: p.info, fg: p.text };
      if (n <= LOW_MAX)  return { bg: p.successBg, fg: p.successFg };
      if (n >= HIGH_MIN) return { bg: p.dangerBg,  fg: p.dangerFg  };
      return { bg: p.warning, fg: "#5c3b00" };
    }
    function drawKcalPill(_text: string, _x: number, _baselineY: number) {
      return 0;
    }

    /* ---- ölçüm ve çizim yardımcıları ---- */
    const nameFont = `800 ${nameSize}px ui-sans-serif, system-ui`;
    const kcalFont = `600 ${kcalSize}px ui-sans-serif, system-ui`;

    const leftTokenWidth = (t: InlineToken) => {
      ctx.font = nameFont;
      return ctx.measureText(t.text).width;
    };

    const measureLeft = (tokens: InlineToken[], availW: number, lineH: number) => {
      let w = 0, lines = 1;
      for (const t of tokens) {
        const tw = leftTokenWidth(t);
        if (w > 0 && w + tw > availW) {
          lines++;
          w = 0;
        }
        w += tw;
      }
      return { lines, lastLineWidth: w };
    };

    const drawLeft = (tokens: InlineToken[], x: number, baseY: number, availW: number, lineH: number) => {
      let curX = x, y = baseY, lastBaseline = baseY;
      for (const t of tokens) {
        const tw = leftTokenWidth(t);
        if (curX > x && curX + tw > x + availW) {
          y += lineH;
          curX = x;
        }
        ctx.font = nameFont;
        ctx.fillStyle = t.color;
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
        ctx.fillText(t.text, curX, y);
        curX += tw;
        lastBaseline = y;
      }
      return lastBaseline;
    };

    const drawRight = (text: string, xRight: number, baselineY: number) => {
      ctx.font = kcalFont;
      ctx.fillStyle = p.muted;
      ctx.textAlign = "right";
      ctx.textBaseline = "alphabetic";
      ctx.fillText(text, xRight, baselineY);
    };

    // önce yükseklik
    let bodyH = 0;
    const lineH = nameLH;
    groups.forEach(g => {
      ctx.font = kcalFont;
      const rightW = g.rightString ? ctx.measureText(g.rightString).width : 0;
      const availLeft = g.rightString ? Math.max(0, maxW - rightW - gapLR) : maxW;
      const { lines } = measureLeft(g.leftTokens, availLeft, lineH);
      const h = lines * lineH;
      bodyH += h + rowGap + sepYPad;
    });
    if (groups.length > 0) bodyH -= sepYPad; // son grupta boşluk yok

    // header
    const headerTopGap    = Math.round(14 * s);
    const headerBottomGap = Math.round(58 * s);
    const headerH = stripeH + headerTopGap + chipH + headerBottomGap;

    const H = PADY * 2 + headerH + bodyH;

    // canvas
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = Math.round(W * dpr);
    c.height = Math.round(H * dpr);
    c.style.width = `${W}px`;
    c.style.height = `${H}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    /* ---- draw ---- */
    roundedPanel(ctx, 0, 0, W, H, cornerR, p.card, p.border);

    // üst mavi şerit
    roundRectFill(ctx, PADX, PADY, W - PADX * 2, stripeH, Math.round(8 * s), p.info);

    // başlık chip
    const header = (props as any).hall ?? (props as any).title ?? gunAdi;
    ctx.font = `800 ${titleSize}px ui-sans-serif, system-ui`;
    const chipW = Math.ceil(ctx.measureText(header).width + chipPX * 2);
    const chipY = PADY + stripeH + headerTopGap;
    roundRectFill(ctx, PADX, chipY, chipW, chipH, chipR, p.info);
    ctx.fillStyle = "#ffffff";
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.fillText(header, PADX + chipPX, chipY + chipH / 2);

    // sağ üst tarih
    const dateY = chipY + chipH + Math.round(20 * s);
    ctx.textAlign = "right";
    ctx.fillStyle = p.muted;
    ctx.font = `800 ${dateSize}px ui-sans-serif, system-ui`;
    ctx.fillText(`${String(gunNum).padStart(2, "0")} ${ayKisa} ${yil}`, W - PADX, dateY);

    // Liste (ÇİZGİ YOK — sadece boşluk)
    let y = PADY + (stripeH + headerTopGap + chipH + headerBottomGap);

    groups.forEach((g, idx) => {
      ctx.font = kcalFont;
      const rightW = g.rightString ? ctx.measureText(g.rightString).width : 0;
      const availLeft = g.rightString ? Math.max(0, maxW - rightW - gapLR) : maxW;

      const lastBaseline = drawLeft(g.leftTokens, PADX, y + lineH, availLeft, lineH);

      if (g.rightString) {
        drawRight(g.rightString, PADX + maxW, lastBaseline);
      }

      const { lines } = measureLeft(g.leftTokens, availLeft, lineH);
      y += lines * lineH + rowGap;

      if (idx !== groups.length - 1) {
        // hr(...) KALDIRILDI — sadece aynı boşluk kalsın
        y += sepYPad;
      }
    });
  }, [wrapW, groups, gunAdi, gunNum, ayKisa, yil, p, props]);

  return (
    <div ref={wrapRef} className="w-full select-none">
      <canvas
        ref={canvasRef}
        className="w-full rounded-2xl border border-gray-200 shadow-sm"
      />
    </div>
  );
}

/* ---- canvas helpers ---- */
function roundedPanel(
  ctx: CanvasRenderingContext2D, x:number, y:number, w:number, h:number, r:number, fill:string, ring:string
){
  roundRectFill(ctx, x, y, w, h, r, fill);
  ctx.strokeStyle = ring;
  ctx.lineWidth = 1;
  roundedPath(ctx, x, y, w, h, r);
  ctx.stroke();
}

function roundRectFill(
  ctx: CanvasRenderingContext2D, x:number, y:number, w:number, h:number, r:number, fill:string
){
  roundedPath(ctx, x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
}

function roundedPath(ctx:CanvasRenderingContext2D, x:number, y:number, w:number, h:number, r:number){
  const rr = Math.min(r, h/2, w/2);
  ctx.beginPath();
  ctx.moveTo(x+rr, y);
  ctx.arcTo(x+w, y, x+w, y+h, rr);
  ctx.arcTo(x+w, y+h, x, y+h, rr);
  ctx.arcTo(x, y+h, x, y, rr);
  ctx.arcTo(x, y, x+w, y, rr);
  ctx.closePath();
}
