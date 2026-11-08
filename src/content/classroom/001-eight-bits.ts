import type { ClassroomEntry } from "../types";

/**
 * VMP-CLS-001 — a format specimen: a working interactive material that shows
 * how lessons are filed in the notebook. Prepared together with the archive.
 */
export const eightBits: ClassroomEntry = {
  slug: "eight-bits",
  code: "VMP-CLS-001",
  section: "materials",
  specimen: true,
  title: { en: "Eight bits", ru: "Восемь бит" },
  summary: {
    en: "An interactive board for counting in binary: switch bits on and off and watch the same number in decimal, hexadecimal and binary.",
    ru: "Интерактивная доска для счёта в двоичной системе: включайте и выключайте биты и следите за тем же числом в десятичной, шестнадцатеричной и двоичной записи.",
  },
  topic: { en: "Number systems", ru: "Системы счисления" },
  level: { en: "Introductory", ru: "Начальный" },
  format: { en: "Interactive exercise", ru: "Интерактивное упражнение" },
  goal: {
    en: "Understand positional notation: why each bit is worth twice its neighbour on the right, and why one byte holds the numbers from 0 to 255.",
    ru: "Понять позиционную запись: почему каждый бит весит вдвое больше соседа справа и почему в одном байте помещаются числа от 0 до 255.",
  },
  steps: {
    en: [
      "Look at the weights above the bits: 128, 64, 32, 16, 8, 4, 2, 1. Each one is a power of two.",
      "Switch a bit on and its weight is added to the number. Switch it off and the weight is removed.",
      "Build each number from the practice list. Try to find the bits before you press them.",
      "Compare the three notations: one quantity, written in three alphabets.",
    ],
    ru: [
      "Посмотрите на веса над битами: 128, 64, 32, 16, 8, 4, 2, 1. Каждый — степень двойки.",
      "Включите бит — его вес прибавится к числу. Выключите — вес вычтется.",
      "Соберите каждое число из списка практики. Постарайтесь найти нужные биты до того, как нажмёте.",
      "Сравните три записи: одно и то же количество, записанное тремя алфавитами.",
    ],
  },
  questions: {
    en: [
      "Why is the largest number in one byte 255 and not 256?",
      "What happens to the number when every bit moves one place to the left?",
      "Why do programmers like hexadecimal? How many bits does one hex digit hold?",
    ],
    ru: [
      "Почему наибольшее число в байте — 255, а не 256?",
      "Что происходит с числом, если все биты сдвинуть на одну позицию влево?",
      "Почему программисты любят шестнадцатеричную систему? Сколько бит в одной её цифре?",
    ],
  },
  interactive: "bit-board",
};
