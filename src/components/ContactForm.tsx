"use client";

import { useId, useState, type FormEvent } from "react";
import { roofShapes, services } from "@/lib/site-config";
import { trackEvent } from "@/lib/meta-pixel";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm({
  formName = "Контакт",
  showMessage = true,
}: {
  formName?: string;
  showMessage?: boolean;
}) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [roofShape, setRoofShape] = useState<string[]>([]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const data = new FormData(e.currentTarget);
    const payload = {
      formName,
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      city: data.get("city"),
      area: data.get("area"),
      service: data.get("service"),
      message: data.get("message"),
      roofShape: roofShape.join(", "),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      trackEvent("Lead", { content_name: formName });
      setStatus("success");
      e.currentTarget.reset();
      setRoofShape([]);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-charcoal-card p-8 text-center">
        <p className="font-display font-semibold text-lg text-cream">Благодарим Ви!</p>
        <p className="mt-2 text-sm text-cream-dim">
          Получихме Вашето запитване и ще се свържем с Вас до един работен ден.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-charcoal px-4 py-3 text-sm text-cream placeholder:text-cream-dim/50 focus:outline-none focus:ring-2 focus:ring-amber/60 focus:border-amber/60 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-charcoal-card p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="block text-xs font-medium text-cream-dim mb-1.5">
            Вашето име
          </label>
          <input id={`${id}-name`} name="name" type="text" placeholder="Име" className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="block text-xs font-medium text-cream-dim mb-1.5">
            Имейл адрес
          </label>
          <input id={`${id}-email`} name="email" type="email" placeholder="Имейл адрес" className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="block text-xs font-medium text-cream-dim mb-1.5">
            Телефон за връзка *
          </label>
          <input id={`${id}-phone`} name="phone" type="tel" required placeholder="Телефон" className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${id}-city`} className="block text-xs font-medium text-cream-dim mb-1.5">
            Населено място
          </label>
          <input id={`${id}-city`} name="city" type="text" placeholder="Град / село" className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${id}-area`} className="block text-xs font-medium text-cream-dim mb-1.5">
            Квадратура на покрива
          </label>
          <input id={`${id}-area`} name="area" type="text" placeholder="Приблизителен размер" className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${id}-service`} className="block text-xs font-medium text-cream-dim mb-1.5">
            Услуга *
          </label>
          <select id={`${id}-service`} name="service" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Избери услуга
            </option>
            {services.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="block text-xs font-medium text-cream-dim mb-2">
          Приблизителна структура на покрива (незадължително)
        </legend>
        <div className="flex flex-wrap gap-2">
          {roofShapes.map((shape) => {
            const checked = roofShape.includes(shape);
            return (
              <button
                type="button"
                key={shape}
                onClick={() =>
                  setRoofShape((prev) =>
                    prev.includes(shape) ? prev.filter((s) => s !== shape) : [...prev, shape],
                  )
                }
                className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                  checked
                    ? "border-amber bg-amber/15 text-amber"
                    : "border-line text-cream-dim hover:border-ember/60"
                }`}
              >
                {shape}
              </button>
            );
          })}
        </div>
      </fieldset>

      {showMessage && (
        <div className="mt-5">
          <label htmlFor={`${id}-message`} className="block text-xs font-medium text-cream-dim mb-1.5">
            Вашето запитване
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={4}
            placeholder="Опишете накратко проблема или желаната дейност..."
            className={inputClass}
          />
        </div>
      )}

      {status === "error" && (
        <p className="mt-4 text-sm text-ember">Възникна грешка. Моля, опитайте отново или ни се обадете директно.</p>
      )}

      <button type="submit" disabled={status === "loading"} className="btn-primary mt-6 w-full sm:w-auto disabled:opacity-60">
        {status === "loading" ? "Изпращане..." : "Изпрати запитване"}
      </button>
    </form>
  );
}
