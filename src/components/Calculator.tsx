"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ADDON_RATES,
  CURRENCY,
  ESTIMATE_MARGIN,
  KAPANDURA_PRICE,
  KOMIN_PRICE,
  RATE_PER_SQM,
  ADDON_PER_SQM,
} from "@/lib/calculator-config";
import { site } from "@/lib/site-config";
import { trackEvent } from "@/lib/meta-pixel";
import {
  IconArrow,
  IconBuild,
  IconCanopy,
  IconDrop,
  IconPhone,
  IconRoof,
  IconSheet,
  IconTile,
} from "@/components/icons";

type ServiceKey =
  | "keramichni"
  | "bitumni"
  | "metalni"
  | "shlebach"
  | "pretursvane"
  | "hidro"
  | "novPokriv"
  | "navesi"
  | "other";

type RoofType = "double" | "four" | "single" | "flat" | "other";
type AddonMode = "no" | "auto" | "manual";

const SERVICES: { key: ServiceKey; title: string; sub: string; icon: typeof IconRoof }[] = [
  { key: "keramichni", title: "Нови керемиди", sub: "Бетонни / циментови", icon: IconTile },
  { key: "bitumni", title: "Битумни керемиди", sub: "Гъвкаво покритие", icon: IconTile },
  { key: "metalni", title: "Метални керемиди", sub: "Ламарина тип керемида", icon: IconSheet },
  { key: "shlebach", title: "Шлайбах", sub: "Фалцова ламарина", icon: IconSheet },
  { key: "pretursvane", title: "Пренареждане", sub: "На съществуващи керемиди", icon: IconTile },
  { key: "hidro", title: "Хидроизолация", sub: "Мембрана / битум", icon: IconDrop },
  { key: "novPokriv", title: "Нов покрив", sub: "От нулата, с конструкция", icon: IconBuild },
  { key: "navesi", title: "Навес", sub: "Метален или дървен", icon: IconCanopy },
  { key: "other", title: "Друго / Не съм сигурен", sub: "Само допълнителни дейности", icon: IconRoof },
];

const ROOF_TYPES: { key: RoofType; label: string }[] = [
  { key: "double", label: "Двускатен" },
  { key: "four", label: "Четирискатен" },
  { key: "single", label: "Едноскатен" },
  { key: "flat", label: "Плосък" },
  { key: "other", label: "Друг / Не знам" },
];

function fmt(n: number) {
  return Math.round(n).toLocaleString("bg-BG", { maximumFractionDigits: 0 });
}

function perim(area: number, factor: number) {
  return Math.max(0, Math.round(2.2 * Math.sqrt(area) * factor));
}

function AddonRow({
  label,
  mode,
  onModeChange,
  lm,
  onLmChange,
  autoLm,
  unit = "линейни метри",
}: {
  label: string;
  mode: AddonMode;
  onModeChange: (m: AddonMode) => void;
  lm: number;
  onLmChange: (v: number) => void;
  autoLm: number;
  unit?: string;
}) {
  return (
    <div className="aero-panel p-4 sm:p-5">
      <p className="aero-label mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {(["no", "auto", "manual"] as AddonMode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onModeChange(m)}
            className={`aero-btn !py-2 !px-4 text-xs ${mode === m ? "active" : ""}`}
          >
            {m === "no" ? "Не" : m === "auto" ? `Автоматично (~${autoLm} м)` : "Въведи сам"}
          </button>
        ))}
      </div>
      {mode === "manual" && (
        <div className="mt-3">
          <span className="aero-label !mb-1 !text-xs opacity-70">{unit}</span>
          <input
            type="number"
            min={0}
            max={1000}
            value={lm}
            onChange={(e) => onLmChange(parseFloat(e.target.value) || 0)}
            className="aero-input max-w-[140px]"
          />
        </div>
      )}
    </div>
  );
}

function Stepper({ label, value, onChange, max = 20 }: { label: string; value: number; onChange: (v: number) => void; max?: number }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <span className="text-sm font-semibold text-cream">{label}</span>
      <div className="flex items-center gap-3">
        <button type="button" className="aero-qty-btn" onClick={() => onChange(Math.max(0, value - 1))}>
          −
        </button>
        <span className="w-6 text-center font-bold text-cream">{value}</span>
        <button type="button" className="aero-qty-btn" onClick={() => onChange(Math.min(max, value + 1))}>
          +
        </button>
      </div>
    </div>
  );
}

export default function Calculator() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<ServiceKey | null>(null);
  const [area, setArea] = useState(100);
  const [roofType, setRoofType] = useState<RoofType>("double");
  const [skara, setSkara] = useState<"single" | "double">("single");
  const [newFolio, setNewFolio] = useState(false);

  const [uluci, setUluci] = useState<AddonMode>("auto");
  const [uluciLm, setUluciLm] = useState(20);
  const [kazanche, setKazanche] = useState(3);
  const [stoperi, setStoperi] = useState<AddonMode>("no");
  const [stopQty, setStopQty] = useState(0);
  const [stena, setStena] = useState<AddonMode>("no");
  const [stenaLm, setStenaLm] = useState(0);
  const [ulama, setUlama] = useState<AddonMode>("no");
  const [ulamaLm, setUlamaLm] = useState(0);
  const [nadul, setNadul] = useState<AddonMode>("no");
  const [nadulLm, setNadulLm] = useState(0);
  const [kalk, setKalk] = useState<AddonMode>("no");
  const [kalkLm, setKalkLm] = useState(0);
  const [komini, setKomini] = useState({ small: 0, medium: 0, large: 0 });
  const [kapanduri, setKapanduri] = useState({ solid: 0, poly: 0, glass: 0, velux: 0 });
  const [izvozvane, setIzvozvane] = useState(true);

  const roofRelevant = service !== "navesi" && service !== "other";

  const autoLm = useMemo(() => {
    const roofFactor = roofType === "four" ? 1.4 : roofType === "single" ? 0.6 : roofType === "flat" ? 0 : 1;
    return {
      uluci: perim(area, 1 * roofFactor),
      stena: perim(area, 0.4 * roofFactor),
      ulama: perim(area, roofType === "four" ? 0.7 : roofType === "double" ? 0.2 : 0),
      nadul: perim(area, 0.9 * roofFactor),
      kalk: perim(area, roofType === "double" ? 0.5 : roofType === "single" ? 0.25 : 0),
    };
  }, [area, roofType]);

  const total = useMemo(() => {
    let t = 0;
    if (service && service !== "other" && service !== "navesi") {
      t += RATE_PER_SQM[service as keyof typeof RATE_PER_SQM] * area;
      if ((service === "keramichni" || service === "metalni" || service === "shlebach") && skara === "double") {
        t += ADDON_PER_SQM.skaraDouble * area;
      }
      if (service === "pretursvane" && newFolio) {
        t += ADDON_PER_SQM.folio * area;
      }
    } else if (service === "navesi") {
      t += RATE_PER_SQM.navesi * area;
    }

    const ulLm = uluci === "manual" ? uluciLm : uluci === "auto" ? autoLm.uluci : 0;
    if (uluci !== "no") {
      t += ulLm * ADDON_RATES.ulukPerLm;
      t += kazanche * ADDON_RATES.kazanchePerBr;
    }

    if (stoperi !== "no") {
      const qty = stoperi === "manual" ? stopQty : Math.round(area / 20);
      t += qty * ADDON_RATES.stopBrPrice;
    }

    const stLm = stena === "manual" ? stenaLm : stena === "auto" ? autoLm.stena : 0;
    if (stena !== "no") t += stLm * ADDON_RATES.stenaPerLm;

    const ulLm2 = ulama === "manual" ? ulamaLm : ulama === "auto" ? autoLm.ulama : 0;
    if (ulama !== "no") t += ulLm2 * ADDON_RATES.ulamaPerLm;

    const ndLm = nadul === "manual" ? nadulLm : nadul === "auto" ? autoLm.nadul : 0;
    if (nadul !== "no") t += ndLm * ADDON_RATES.naduluchnaPerLm;

    const klLm = kalk === "manual" ? kalkLm : kalk === "auto" ? autoLm.kalk : 0;
    if (kalk !== "no") t += klLm * ADDON_RATES.kalkadnaPerLm;

    t += komini.small * KOMIN_PRICE.small + komini.medium * KOMIN_PRICE.medium + komini.large * KOMIN_PRICE.large;
    t +=
      kapanduri.solid * KAPANDURA_PRICE.solid +
      kapanduri.poly * KAPANDURA_PRICE.poly +
      kapanduri.glass * KAPANDURA_PRICE.glass +
      kapanduri.velux * KAPANDURA_PRICE.velux;

    if (izvozvane) t += ADDON_RATES.izvozvane;

    return t;
  }, [
    service,
    area,
    skara,
    newFolio,
    uluci,
    uluciLm,
    autoLm,
    kazanche,
    stoperi,
    stopQty,
    stena,
    stenaLm,
    ulama,
    ulamaLm,
    nadul,
    nadulLm,
    kalk,
    kalkLm,
    komini,
    kapanduri,
    izvozvane,
  ]);

  function goStep3() {
    setStep(3);
  }

  function calculate() {
    trackEvent("Lead", { content_name: "Калкулатор", value: Math.round(total) });
    setStep(4);
  }

  const serviceName = SERVICES.find((s) => s.key === service)?.title ?? "";
  const roofLabel = ROOF_TYPES.find((r) => r.key === roofType)?.label ?? "";

  return (
    <div className="aero-surface rounded-[32px] p-5 sm:p-10">
      {/* Decorative bubbles */}
      <div className="aero-bubble aero-bubble-float w-40 h-40 -top-10 -left-10" />
      <div className="aero-bubble aero-bubble-float w-24 h-24 top-24 right-4 [animation-delay:1.5s]" />
      <div className="aero-bubble aero-bubble-float w-16 h-16 bottom-10 left-8 [animation-delay:3s]" />
      <div className="aero-bubble w-56 h-56 -bottom-20 -right-16" />

      <div className="relative max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className={`aero-step-num ${step > n ? "done" : ""}`}>
              {step > n ? "✓" : n}
            </div>
          ))}
          <span className="text-sm font-semibold text-cream-dim">Ориентировъчна цена за 60 секунди</span>
        </div>

        {step === 1 && (
          <div className="aero-panel p-6 sm:p-8">
            <h3 className="font-display font-bold text-xl text-cream mb-6">Каква услуга търсите?</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {SERVICES.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => {
                    setService(s.key);
                    setStep(s.key === "other" ? 3 : 2);
                  }}
                  className={`aero-btn ${service === s.key ? "active" : ""}`}
                >
                  <span className="flex items-center gap-3">
                    <s.icon className="w-6 h-6 shrink-0" />
                    <span>
                      <span className="block font-bold">{s.title}</span>
                      <span className="block text-xs opacity-70">{s.sub}</span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="aero-panel p-6 sm:p-8 flex flex-col gap-6">
            <h3 className="font-display font-bold text-xl text-cream">Основни параметри</h3>

            <div>
              <span className="aero-label">Квадратура на покрива (м²)</span>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min={5}
                  max={2000}
                  value={area}
                  onChange={(e) => setArea(parseFloat(e.target.value) || 0)}
                  className="aero-input max-w-[110px]"
                />
                <input
                  type="range"
                  min={5}
                  max={500}
                  value={Math.min(area, 500)}
                  onChange={(e) => setArea(parseFloat(e.target.value))}
                  className="aero-range flex-1"
                />
              </div>
            </div>

            {roofRelevant && (
              <div>
                <span className="aero-label">Вид покрив</span>
                <div className="flex flex-wrap gap-2">
                  {ROOF_TYPES.map((r) => (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => setRoofType(r.key)}
                      className={`aero-btn !py-2 !px-4 text-sm ${roofType === r.key ? "active" : ""}`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {(service === "keramichni" || service === "metalni" || service === "shlebach") && (
              <div>
                <span className="aero-label">Скара от летви</span>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setSkara("single")} className={`aero-btn !py-2 !px-4 text-sm ${skara === "single" ? "active" : ""}`}>
                    Единична (включено)
                  </button>
                  <button type="button" onClick={() => setSkara("double")} className={`aero-btn !py-2 !px-4 text-sm ${skara === "double" ? "active" : ""}`}>
                    Двойна (+доплащане)
                  </button>
                </div>
              </div>
            )}

            {service === "pretursvane" && (
              <div>
                <span className="aero-label">Ново подпокривно фолио</span>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setNewFolio(false)} className={`aero-btn !py-2 !px-4 text-sm ${!newFolio ? "active" : ""}`}>
                    Не
                  </button>
                  <button type="button" onClick={() => setNewFolio(true)} className={`aero-btn !py-2 !px-4 text-sm ${newFolio ? "active" : ""}`}>
                    Да
                  </button>
                </div>
              </div>
            )}

            <button type="button" onClick={goStep3} className="aero-btn aero-btn-primary justify-center text-center">
              Продължи към допълнителни дейности
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <div className="aero-panel p-6 sm:p-8">
              <h3 className="font-display font-bold text-xl text-cream mb-1">Допълнителни дейности</h3>
              <p className="text-sm text-cream-dim">Прескочи каквото не важи за твоя обект.</p>
            </div>

            <AddonRow label="Улуци и казанчета" mode={uluci} onModeChange={setUluci} lm={uluciLm} onLmChange={setUluciLm} autoLm={autoLm.uluci} />
            {uluci !== "no" && (
              <div className="aero-panel p-4 sm:p-5">
                <Stepper label="Брой казанчета" value={kazanche} onChange={setKazanche} max={20} />
              </div>
            )}

            <div className="aero-panel p-4 sm:p-5">
              <p className="aero-label mb-3">Стопери за сняг</p>
              <div className="flex flex-wrap gap-2">
                {(["no", "auto", "manual"] as AddonMode[]).map((m) => (
                  <button key={m} type="button" onClick={() => setStoperi(m)} className={`aero-btn !py-2 !px-4 text-xs ${stoperi === m ? "active" : ""}`}>
                    {m === "no" ? "Не" : m === "auto" ? `Автоматично (~${Math.round(area / 20)} бр.)` : "Въведи сам"}
                  </button>
                ))}
              </div>
              {stoperi === "manual" && (
                <input type="number" min={0} max={500} value={stopQty} onChange={(e) => setStopQty(parseFloat(e.target.value) || 0)} className="aero-input mt-3 max-w-[140px]" />
              )}
            </div>

            <AddonRow label="Стенна ламарина" mode={stena} onModeChange={setStena} lm={stenaLm} onLmChange={setStenaLm} autoLm={autoLm.stena} />
            <AddonRow label="Улама (вътрешен ъгъл)" mode={ulama} onModeChange={setUlama} lm={ulamaLm} onLmChange={setUlamaLm} autoLm={autoLm.ulama} />
            <AddonRow label="Надулучна пола" mode={nadul} onModeChange={setNadul} lm={nadulLm} onLmChange={setNadulLm} autoLm={autoLm.nadul} />
            <AddonRow label="Калканна ламарина" mode={kalk} onModeChange={setKalk} lm={kalkLm} onLmChange={setKalkLm} autoLm={autoLm.kalk} />

            <div className="aero-panel p-4 sm:p-5">
              <p className="aero-label mb-2">Обшивка на комини</p>
              <Stepper label="Малък комин" value={komini.small} onChange={(v) => setKomini((k) => ({ ...k, small: v }))} max={10} />
              <Stepper label="Среден комин" value={komini.medium} onChange={(v) => setKomini((k) => ({ ...k, medium: v }))} max={10} />
              <Stepper label="Голям комин" value={komini.large} onChange={(v) => setKomini((k) => ({ ...k, large: v }))} max={10} />
            </div>

            <div className="aero-panel p-4 sm:p-5">
              <p className="aero-label mb-2">Капандури</p>
              <Stepper label="Обикновена" value={kapanduri.solid} onChange={(v) => setKapanduri((k) => ({ ...k, solid: v }))} max={20} />
              <Stepper label="Поликарбонат" value={kapanduri.poly} onChange={(v) => setKapanduri((k) => ({ ...k, poly: v }))} max={20} />
              <Stepper label="Стъклена" value={kapanduri.glass} onChange={(v) => setKapanduri((k) => ({ ...k, glass: v }))} max={20} />
              <Stepper label="Velux (покривен прозорец)" value={kapanduri.velux} onChange={(v) => setKapanduri((k) => ({ ...k, velux: v }))} max={20} />
            </div>

            <div className="aero-panel p-4 sm:p-5 flex items-center justify-between">
              <p className="aero-label !mb-0">Извозване на строителни отпадъци</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => setIzvozvane(false)} className={`aero-btn !py-2 !px-4 text-xs ${!izvozvane ? "active" : ""}`}>
                  Не
                </button>
                <button type="button" onClick={() => setIzvozvane(true)} className={`aero-btn !py-2 !px-4 text-xs ${izvozvane ? "active" : ""}`}>
                  Да
                </button>
              </div>
            </div>

            <button type="button" onClick={calculate} className="aero-btn aero-btn-primary justify-center text-center !text-base !py-4">
              Изчисли ориентировъчна цена
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-6">
            <div className="aero-result">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cream-dim">Ориентировъчна цена с труд и материали</p>
              <p className="aero-price font-display font-extrabold text-5xl sm:text-6xl mt-3">
                {fmt(total * (1 - ESTIMATE_MARGIN))} – {fmt(total * (1 + ESTIMATE_MARGIN))} {CURRENCY}
              </p>
              <p className="mt-3 text-sm text-cream-dim">
                {serviceName || "Допълнителни дейности"} {roofRelevant && `· ${area} м² · ${roofLabel}`}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/bezplaten-ogled" className="aero-btn aero-btn-primary justify-center text-center">
                  Заяви безплатен оглед за точна оферта
                  <IconArrow className="w-4 h-4 inline ml-2" />
                </Link>
                <a href={`tel:${site.phones[0].href}`} className="aero-btn justify-center text-center">
                  <IconPhone className="w-4 h-4 inline mr-2" />
                  {site.phones[0].display}
                </a>
              </div>
              <p className="mt-5 text-xs text-cream-dim leading-relaxed max-w-md mx-auto">
                Това е ориентировъчна оценка на база средни пазарни цени. Точната цена се определя само след безплатен оглед на място.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="aero-btn aero-btn-ghost justify-center text-center text-sm"
            >
              Изчисли отново
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
