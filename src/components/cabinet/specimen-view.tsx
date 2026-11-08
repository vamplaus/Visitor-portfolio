import type { SpecimenId } from "@/content/cabinet";
import { tr, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { Astrolabe } from "./astrolabe";
import { Codex } from "./codex";
import { MagicSquare } from "./magic-square";
import { NeuralTracery } from "./neural-tracery";
import { Polyhedron } from "./polyhedron";
import { SpriteScene } from "./sprite-scene";
import { TerminalSpecimen } from "./terminal-specimen";
import { getSpecimen } from "@/content/cabinet";

/** Renders the working object of a specimen, with its localized strings. */
export function SpecimenView({ id, lang, dict }: { id: SpecimenId; lang: Locale; dict: Dictionary }) {
  const t = dict.cabinet;
  const label = `${tr(getSpecimen(id).title, lang)} — ${tr(getSpecimen(id).caption, lang)}`;
  switch (id) {
    case "polyhedron":
      return <Polyhedron label={label} stats={t.stats} />;
    case "neural":
      return <NeuralTracery label={label} />;
    case "terminal":
      return (
        <TerminalSpecimen
          label={label}
          lines={[
            { cmd: "whoami", out: ["vamplaus"] },
            { cmd: "cat role.txt", out: [t.role] },
            { cmd: "ls ~/archive", out: ["identity  laboratory  classroom", "forge  mind  journal  contact"] },
            { cmd: 'python3 -c "print(sum(2**i for i in range(8)))"', out: ["255"] },
            { cmd: "wc -l < interests.txt", out: ["9"] },
          ]}
        />
      );
    case "sprite":
      return <SpriteScene label={label} labels={{ scene: t.scene, controls: t.controls }} />;
    case "magic-square":
      return <MagicSquare label={label} labels={t.square} />;
    case "astrolabe":
      return <Astrolabe label={label} />;
    case "codex":
      return (
        <Codex
          label={label}
          left={`${dict.home.preface.lead}${dict.home.preface.leadTail}`}
          right={dict.home.preface.body1}
          note={t.codexNote}
        />
      );
  }
}
