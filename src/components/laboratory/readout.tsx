import { labEntries, labSlots } from "@/content/laboratory";
import type { LabDomain } from "@/content/types";
import { getI18n } from "@/i18n/server";
import { ReadoutNumber } from "@/components/ui/readout-number";

const domains: LabDomain[] = ["ai", "python", "linux", "automation", "web"];

/**
 * Instrument panel: counts read from the register itself.
 * Nothing here is typed by hand — it changes when entries are filed.
 */
export async function Readout() {
  const { dict } = await getI18n();
  const t = dict.laboratory;
  const counts = [
    { label: t.readout.entries, value: labEntries.length },
    { label: t.readout.active, value: labEntries.filter((e) => e.status === "active").length },
    { label: t.readout.reserved, value: labSlots.length },
  ];

  return (
    <div
      data-enter="rise"
      style={{ ["--d" as string]: "750ms" } as React.CSSProperties}
      className="mt-8 md:mt-10"
      role="group"
      aria-label={t.readoutLabel}
    >
      <p className="meta text-ash">{t.readoutLabel}</p>
      <dl className="mt-3 grid grid-cols-3 border-t border-l border-line">
        {counts.map((c) => (
          <div key={c.label} className="border-r border-b border-line px-3 py-3 md:px-5 md:py-4">
            <dt className="meta text-ash">{c.label}</dt>
            <dd className="mt-1 font-mono text-2xl text-paper md:text-4xl">
              <ReadoutNumber value={c.value} />
            </dd>
          </div>
        ))}
      </dl>
      <dl className="grid grid-cols-5 border-l border-line" aria-label={t.domainsLabel}>
        {domains.map((d) => {
          const n = labEntries.filter((e) => e.domains.includes(d)).length;
          return (
            <div key={d} className="border-r border-b border-line px-2 py-2.5 md:px-5">
              <dt className="meta truncate text-ash">{t.domains[d]}</dt>
              <dd className={n ? "meta mt-1 text-paper" : "meta mt-1 text-ash"}>
                <ReadoutNumber value={n} />
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
