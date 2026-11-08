import { placeholder, type ImageRef, type L, type Maybe } from "./types";

/**
 * Fond I — Identity. Everything the author has not provided is a placeholder.
 *
 * Plate: a slot for a real portrait and one for an avatar. The visitor can
 * switch between them; `initial` decides which is shown first. To mount an
 * image, put the file in /public and replace the placeholder, e.g.
 *   photo: { src: "/identity/portrait.jpg", width: 1200, height: 1600,
 *            alt: { en: "…", ru: "…" } },
 */
export const identity = {
  plate: {
    initial: "photo" as "photo" | "avatar",
    photo: {
      src: "/identity/portrait.jpg",
      width: 1200,
      height: 1600,
      alt: {
        en: "Khamzat (VAMPLAUS) in black, seated in a lattice pavilion painted all over with VAMPLAUS lettering",
        ru: "Хамзат (VAMPLAUS) в чёрном сидит в решётчатой беседке, расписанной надписями VAMPLAUS",
      },
    } as Maybe<ImageRef>,
    avatar: {
      src: "/identity/avatar.jpg",
      width: 640,
      height: 640,
      alt: { en: "Khamzat (VAMPLAUS), portrait", ru: "Хамзат (VAMPLAUS), портрет" },
    } as Maybe<ImageRef>,
  },
  /** Paragraphs of the biography, written by the author. */
  biography: placeholder({ en: "Biography", ru: "Биография" }) as Maybe<L<readonly string[]>>,
  principles: placeholder({ en: "Principles", ru: "Принципы" }) as Maybe<L<readonly string[]>>,
  timeline: placeholder({ en: "Timeline", ru: "Хронология" }) as Maybe<
    readonly { readonly year: number; readonly event: L }[]
  >,
};
