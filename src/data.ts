export type Generator = {
  url: string;
  name: string;
  description: string;
  protocol: string;
  localHours: number;
  localMinutes: number;
  clock: "1" | "12" | "24";
};

export const generators: Generator[] = [
  {
    url: "http://makea.fish/",
    name: "make a fish",
    description:
      "a random fish generator that only works at 11:11 each morning and evening, in your local timezone.",
    protocol: "http",
    localHours: 11,
    localMinutes: 11,
    clock: "12",
  },
  {
    url: "https://fish.lftq.in/",
    name: "fish.lftq.in",
    description: "minecraft-inspired 3D fish",
    protocol: "http",
    localHours: 11,
    localMinutes: 11,
    clock: "12",
  },
  {
    url: "https://tris.fyi/dish",
    name: "bake a dish",
    description: "a random allrecipies generator that only works as 22:22",
    protocol: "http",
    localHours: 22,
    localMinutes: 22,
    clock: "24",
  },
  {
    url: "https://fissh.breq.dev/",
    name: "ssh a fissh",
    description: "a random ASCII fish generator that works over SSH",
    protocol: "ssh",
    localHours: 11,
    localMinutes: 11,
    clock: "12",
  },
  {
    url: "https://miakizz.quest/xfish",
    name: "X11:11 make a fish",
    description:
      "a random fish generator that connects to your X11 server to draw a fish",
    protocol: "x11",
    localHours: 11,
    localMinutes: 11,
    clock: "12",
  },
  {
    url: "https://makeabyte.lftq.in/",
    name: "2:55 make a byte",
    description: "random byte generator that shows the ASCII, bin, and hex",
    protocol: "http",
    localHours: 2,
    localMinutes: 55,
    clock: "12",
  },
];
