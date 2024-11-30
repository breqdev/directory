export type ClockTime = {
  hours: number;
  minutes: number;
};

export type Generator = {
  url: string;
  name: string;
  description: string;
  protocol: string;
  clockTimes: ClockTime[];
  canonicalTime: string;
};

export const generators: Generator[] = [
  {
    url: "http://makea.fish/",
    name: "make a fish",
    description:
      "a random fish generator that only works at 11:11 each morning and evening, in your local timezone.",
    protocol: "http",
    clockTimes: [
      { hours: 11, minutes: 11 },
      { hours: 23, minutes: 11 },
    ],
    canonicalTime: "11:11",
  },
  {
    url: "https://fish.lftq.in/",
    name: "fish.lftq.in",
    description: "minecraft-inspired 3D fish",
    protocol: "http",
    clockTimes: [
      { hours: 11, minutes: 11 },
      { hours: 23, minutes: 11 },
    ],
    canonicalTime: "11:11",
  },
  {
    url: "https://tris.fyi/dish",
    name: "bake a dish",
    description: "a random allrecipies generator that only works as 22:22",
    protocol: "http",
    clockTimes: [{ hours: 22, minutes: 22 }],
    canonicalTime: "22:22",
  },
  {
    url: "https://fissh.breq.dev/",
    name: "ssh a fissh",
    description: "a random ASCII fish generator that works over SSH",
    protocol: "ssh",
    clockTimes: [
      { hours: 11, minutes: 11 },
      { hours: 23, minutes: 11 },
    ],
    canonicalTime: "11:11",
  },
  {
    url: "https://miakizz.quest/xfish",
    name: "X11:11 make a fish",
    description:
      "a random fish generator that connects to your X11 server to draw a fish",
    protocol: "x11",
    clockTimes: [
      { hours: 11, minutes: 11 },
      { hours: 23, minutes: 11 },
    ],
    canonicalTime: "11:11",
  },
  {
    url: "https://makeabyte.lftq.in/",
    name: "2:55 make a byte",
    description: "random byte generator that shows the ASCII, bin, and hex",
    protocol: "http",
    clockTimes: [
      { hours: 2, minutes: 55 },
      { hours: 14, minutes: 55 },
    ],
    canonicalTime: "02:55",
  },
  {
    url: "https://queercomputerclub.ca/projects/quecey-voip/",
    name: "dial-a-fish",
    description: "SSTV-encoded fish delivered over a telephone call",
    protocol: "tel",
    clockTimes: Array.from({ length: 23 }, (_, i) => ({
      hours: i,
      minutes: 11,
    })),
    canonicalTime: "**:11",
  },
];
