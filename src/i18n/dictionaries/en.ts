/**
 * Interface strings, English. `ru.ts` must provide the same shape —
 * the compiler enforces it through the `Dictionary` type.
 * Content (fonds, entries, subjects) is localized in src/content/*, not here.
 */
export const en = {
  meta: {
    title: "VAMPLAUS — The Digital Archive",
    description:
      "A personal digital archive of code, teaching, games and ideas, kept by a teacher of informatics and programming.",
  },
  tagline: {
    before: "Between",
    logic: "Logic",
    joint: "and",
    imagination: "Imagination",
    text: "Between Logic and Imagination",
  },
  stage: "Stage 2 — Content",

  common: {
    skip: "Skip to content",
    placeholder: "Placeholder",
    noEntries: "No entries yet",
    status: "Status",
    fondStatus: { "in-preparation": "In preparation", open: "Open" },
    holdings: "Holdings",
    character: "Character",
    fond: "Fond",
    openFond: "Open fond",
    previousFond: "Previous fond",
    nextFond: "Next fond",
    neighbours: "Neighbouring fonds",
    section: "Section",
  },

  bar: {
    home: "VAMPLAUS — The Digital Archive, home",
    subtitle: "Digital Archive",
    location: "Current location:",
    index: "Index",
    localTime: "LOC",
    language: "Language",
    motion: "Motion",
    motionOn: "on",
    motionOff: "off",
  },

  /** Short labels shown by the reticle next to the pointer. */
  cursor: {
    enter: "Enter",
    open: "Open",
    read: "Read",
    toggle: "Switch",
  },

  index: {
    title: "Index of the archive",
    nav: "Archive index",
    fonds: "fonds",
    close: "Close",
    keys: "Keys",
    keyTab: "Next entry",
    keyEnter: "Open fond",
    keyEsc: "Close index",
    archive: "Archive",
    vestibule: "Vestibule",
    vestibuleKicker: "Entrance and catalogue",
  },

  home: {
    fond0: "Fond 0",
    vestibule: "Vestibule",
    indexOf: "Index of",
    fondsWord: "fonds",
    archivum: "Archivum",
    enter: "Enter the archive",
    preface: {
      label: "Preface",
      lead: "A working archive. Code, lessons, games and ideas are catalogued side by side",
      leadTail: " — the way a library shelves a treatise on logic next to a book of poems.",
      body1:
        "Kept by a teacher of informatics and programming. Its holdings span artificial intelligence, Python and Linux; game development and 3D modelling; history, philosophy, literature and visual art.",
      body2:
        "Seven fonds, one system. Each fond keeps its own character — a laboratory, a classroom, a forge, a library — while sharing the same grid, the same type and the same single colour.",
    },
    catalogue: {
      label: "Catalogue",
      title: "fonds",
      intro:
        "Each fond is a section of the archive with a character of its own. Choose a volume to open it — or open the index from the bar above at any time.",
    },
    subjects: {
      label: "Index",
      title: "Index of subjects",
      intro: "Set like the index at the back of a book. Numerals point to the fonds where a subject is kept.",
      digits: "0–9",
    },
  },

  cabinet: {
    label: "Cabinet",
    title: "Cabinet of curiosities",
    intro:
      "One specimen for each field of the archivist's work, drawn in the engraved line of the archive — and every one of them works. Visual art has no drawer of its own: it is the engraving everything here is drawn in.",
    specimen: "No.",
    keptIn: "Kept in",
    bandLabel: "Specimens",
    stats: { v: "Verts", e: "Edges", f: "Faces" },
    scene: "Scene · archive.tscn",
    controls: "← →  ·  Space",
    square: {
      kinds: { rows: "Rows", cols: "Columns", diags: "Diagonals", quarters: "Quarters", centre: "Centre" },
      year: "15 14 — the year, 1514",
    },
    role: "teacher of informatics and programming",
    codexNote: "cf. fonds II–V",
  },

  footer: {
    fonds: "Fonds",
    colophon: "Colophon",
    colophonText:
      "Set in Cormorant Garamond, IBM Plex Sans and IBM Plex Mono. Built with Next.js, Tailwind CSS and Motion. No trackers, no paid services.",
    backToTop: "Back to top",
  },

  notFound: {
    mark: "ERR 404",
    label: "Unlisted",
    title: "Not in the catalogue",
    body: "The record you asked for was never filed here, or has been moved. The catalogue lists everything the archive holds.",
    home: "Return to the vestibule",
    catalogue: "Open the catalogue",
  },

  pendingFond: {
    label: "Planned holdings",
    opensLater: "This fond opens in a later stage.",
    note: "Its entries will be read from structured content files. Nothing is invented in the meantime.",
  },

  identity: {
    dossier: "Dossier",
    plate: {
      label: "Plate I.1",
      switchLabel: "Image on the plate",
      photo: "Portrait",
      avatar: "Avatar",
      photoEmpty: "Awaiting photograph",
      avatarEmpty: "Awaiting avatar",
      note: "A real portrait or the author's avatar will be mounted here. Until then the plate stays empty.",
    },
    fields: {
      handle: "Handle",
      role: "Role",
      name: "Name",
      location: "Location",
      fields: "Fields",
    },
    hemispheres: {
      label: "Two hemispheres",
      title: "Logic and imagination",
      intro:
        "The archivist's fields of work, sorted by the two halves of the archive's motto. Each one points to the fond that keeps it.",
      logic: "Logic",
      imagination: "Imagination",
    },
    biography: {
      label: "Biography",
      empty: "Biography — to be written by the archivist.",
      note: "Nothing here is inferred or invented. The text appears when the author provides it.",
    },
    principles: {
      label: "Principles",
      empty: "Principles of teaching and work — awaiting the author's text.",
    },
    timeline: {
      label: "Timeline",
      empty: "Education, teaching and project milestones — awaiting dates from the author.",
    },
  },

  laboratory: {
    readoutLabel: "Instrument panel",
    readout: { entries: "Entries", active: "Active", reserved: "Reserved slots" },
    domainsLabel: "Domains",
    registerLabel: "Register",
    registerTitle: "Register of entries",
    registerIntro:
      "Every project, experiment and tool is filed here as a specification sheet. Reserved slots mark the directions the laboratory is set up for.",
    columns: { code: "Code", title: "Title", domains: "Domains", status: "Status", since: "Since" },
    reserved: "Slot reserved",
    awaiting: "Awaiting entry",
    domains: { ai: "AI", python: "Python", linux: "Linux", automation: "Automation", web: "Web" },
    statuses: { active: "Active", complete: "Complete", paused: "Paused", archived: "Archived" },
    sheet: {
      label: "Specification sheet",
      objective: "Objective",
      protocol: "Protocol",
      schema: "Schema",
      specimen: "Specimen",
      observations: "Observations",
      links: "Links",
      stack: "Stack",
      since: "Since",
      back: "Back to the register",
      lines: "lines",
    },
  },

  classroom: {
    notebookLabel: "Working notebook",
    contentsLabel: "Contents",
    sections: {
      courses: "Courses",
      methods: "Methods",
      materials: "Interactive materials",
      exercises: "Exercises",
    },
    emptyPage: "Empty page",
    emptyNote: "awaiting the author's material",
    specimen: "Format specimen",
    specimenNote:
      "A working example of how interactive materials are filed in this notebook. Prepared together with the archive; the author may keep, rework or replace it.",
    open: "Open material",
    bits: {
      board: "Bit board",
      weight: "Weight",
      bit: "Bit",
      on: "on",
      off: "off",
      decimal: "Decimal",
      hex: "Hexadecimal",
      binary: "Binary",
      decimalShort: "Dec",
      hexShort: "Hex",
      binaryShort: "Bin",
      reset: "Reset",
      practice: "Practice",
      build: "Build",
      solved: "Solved",
      value: "Value",
      allDone: "All practice numbers are built.",
    },
    lesson: {
      goal: "Goal",
      level: "Level",
      format: "Format",
      topic: "Topic",
      steps: "Steps",
      practice: "Practice",
      back: "Back to the notebook",
      questions: "Questions for discussion",
    },
  },
};

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : { readonly [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof en>;
