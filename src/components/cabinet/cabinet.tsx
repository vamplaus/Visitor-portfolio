import { getI18n } from "@/i18n/server";
import { SectionLabel } from "@/components/ui/section-label";
import { Words } from "@/components/ui/words";
import { Drawer } from "./drawer";

/**
 * Home — the cabinet of curiosities. Seven drawers, set as an asymmetric
 * cabinet: large mounts for the modelling viewport and the network, a row of
 * instruments, a long drawer for the game scene.
 */
export async function Cabinet() {
  const { dict } = await getI18n();
  const t = dict.cabinet;

  return (
    <section id="cabinet" aria-labelledby="cabinet-title" className="border-t border-line py-20 md:py-32">
      <div className="frame grid-archive items-end gap-y-6">
        <div className="col-span-full lg:col-span-7">
          <SectionLabel mark="§ 02">{t.label}</SectionLabel>
          <h2 id="cabinet-title" data-reveal="words" className="mt-6 font-display text-display-l font-light text-paper md:mt-8">
            <Words text={t.title} />
          </h2>
        </div>
        <p
          data-reveal="rise"
          style={{ ["--d" as string]: "300ms" } as React.CSSProperties}
          className="col-span-full max-w-md text-ash md:col-span-6 lg:col-span-4 lg:col-start-9"
        >
          {t.intro}
        </p>
      </div>

      <div className="frame mt-10 md:mt-16">
        <div className="grid gap-3 md:grid-cols-6 lg:grid-cols-12 lg:gap-4">
          <Drawer id="polyhedron" number={1} shape="tall" className="md:col-span-6 lg:col-span-7" />
          <Drawer id="neural" number={2} shape="tall" className="md:col-span-6 lg:col-span-5" delay={120} />
          <Drawer id="terminal" number={3} shape="mid" className="md:col-span-6 lg:col-span-5" />
          <Drawer id="magic-square" number={4} shape="mid" className="md:col-span-3 lg:col-span-3" delay={120} />
          <Drawer id="astrolabe" number={5} shape="mid" className="md:col-span-3 lg:col-span-4" delay={240} />
          <Drawer id="sprite" number={6} shape="wide" className="md:col-span-6 lg:col-span-7" />
          <Drawer id="codex" number={7} shape="wide" className="md:col-span-6 lg:col-span-5" delay={120} />
        </div>
      </div>
    </section>
  );
}

/** A fond's own specimens, right under its title page. */
export async function FondSpecimens({ ids, numbers }: { ids: Parameters<typeof Drawer>[0]["id"][]; numbers: number[] }) {
  const { dict } = await getI18n();
  return (
    <section aria-label={dict.cabinet.bandLabel} className="border-t border-line">
      <div className="frame py-8 md:py-14">
        <div className={ids.length > 1 ? "grid items-start gap-3 md:grid-cols-12 lg:gap-4" : "grid"}>
          {ids.map((id, i) => (
            <Drawer
              key={id}
              id={id}
              number={numbers[i]}
              shape={id === "sprite" || id === "codex" ? "wide" : ids.length > 1 ? "tall" : "mid"}
              delay={i * 120}
              className={ids.length > 1 ? (i === 0 ? "md:col-span-7" : "md:col-span-5") : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
