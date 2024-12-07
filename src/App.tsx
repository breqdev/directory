import { useEffect, useMemo, useState } from "react";
import { ClockTime, Generator, generators } from "./data";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

function timeUntilWallClock(time: ClockTime) {
  const now = new Date();
  // Construct a new date object with the next occurrence of the target time
  const targetDate = new Date(now);

  targetDate.setHours(time.hours);
  targetDate.setMinutes(time.minutes);
  targetDate.setSeconds(59);
  targetDate.setMilliseconds(999);

  if (targetDate < now) {
    targetDate.setDate(targetDate.getDate() + 1);
  }

  return Math.floor((targetDate.getTime() - now.getTime()) / 1000);
}

function timeUntilGenerator(generator: Generator) {
  return generator.clockTimes
    .map((clockTime) => timeUntilWallClock(clockTime))
    .reduce((prev, curr) => Math.min(prev, curr));
}

function GeneratorView({
  generator,
  onFocus,
  open,
  dark,
}: {
  generator: Generator;
  onFocus: () => void;
  open: boolean;
  dark: boolean;
}) {
  const timeUntil = timeUntilGenerator(generator);
  const state: "later" | "soon" | "now" =
    timeUntil < 0 ? "now" : timeUntil < 15 * 60 ? "soon" : "later";

  const hours = Math.floor(timeUntil / 3600);
  const minutes = Math.floor((timeUntil % 3600) / 60);

  return (
    <details
      name="generator"
      className={
        "border-2 rounded-lg px-3 py-2 " +
        (state === "now"
          ? "border-red-500"
          : state === "soon"
          ? "border-amber-500"
          : "border-black")
      }
      onToggle={(e) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((e.target as any).open) {
          onFocus();
        }
      }}
      open={open}
    >
      <summary className="text-2xl">
        <div className="inline-flex flex-col sm:flex-row justify-between w-[calc(100%-22px)]">
          <h2 className="">{generator.name}</h2>
          <span className="ml-auto sm:ml-0">
            {generator.canonicalTime}{" "}
            <span
              className={
                state === "now"
                  ? "text-red-500"
                  : state === "soon"
                  ? "text-amber-500"
                  : "text-gray-400"
              }
            >
              ({String(hours).padStart(2, "0")}h
              {String(minutes).padStart(2, "0")}m)
            </span>
          </span>
        </div>
      </summary>
      <div className="flex flex-col gap-2">
        <p className="text-xs">
          by{" "}
          {generator.authors.map((author, i) => (
            <>
              {author.url ? (
                <a
                  className={
                    "underline " + (dark ? "text-blue-400" : "text-blue-600")
                  }
                  href={author.url}
                >
                  {author.name}
                </a>
              ) : (
                author.name
              )}
              {i < generator.authors.length - 1 ? ", " : ""}
            </>
          ))}
        </p>
        <p>{generator.description}</p>
        <p
          className={
            "lg:hidden text-xs underline " +
            (dark ? "text-blue-400" : "text-blue-600")
          }
        >
          <a href={generator.url}>{generator.url}</a>
        </p>
      </div>
    </details>
  );
}

function useDate() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return date;
}

function Confetti() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const now = useDate();

  const used =
    init &&
    (now.getHours() === 7 || now.getHours() === 19) &&
    now.getMinutes() === 55;

  const options = useMemo(
    () => ({
      fullScreen: {
        zIndex: 1,
      },
      particles: {
        color: {
          value: ["#FFFFFF", "#FFd700"],
        },
        move: {
          direction: "bottom" as const,
          enable: true,
          outModes: {
            default: "out" as const,
          },
          size: true,
          speed: {
            min: 1,
            max: 3,
          },
        },
        number: {
          value: 250,
          density: {
            enable: true,
            area: 800,
          },
        },
        opacity: {
          value: 1,
          animation: {
            enable: false,
            startValue: "max" as const,
            destroy: "min" as const,
            speed: 0.3,
            sync: true,
          },
        },
        rotate: {
          value: {
            min: 0,
            max: 360,
          },
          direction: "random" as const,
          move: true,
          animation: {
            enable: true,
            speed: 60,
          },
        },
        tilt: {
          direction: "random" as const,
          enable: true,
          move: true,
          value: {
            min: 0,
            max: 360,
          },
          animation: {
            enable: true,
            speed: 60,
          },
        },
        shape: {
          type: ["image" as const],
          options: {
            image: [
              {
                src: "https://win98icons.alexmeub.com/icons/png/directory_closed-4.png",
                width: 48,
                height: 48,
                particles: {
                  size: {
                    value: 16,
                  },
                },
              },
              {
                src: "https://win98icons.alexmeub.com/icons/png/directory_explorer-5.png",
                width: 48,
                height: 48,
                particles: {
                  size: {
                    value: 16,
                  },
                },
              },
              {
                src: "https://win98icons.alexmeub.com/icons/png/directory_open_cool-3.png",
                width: 48,
                height: 48,
                particles: {
                  size: {
                    value: 16,
                  },
                },
              },
              {
                src: "https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs_2k-4.png",
                width: 48,
                height: 48,
                particles: {
                  size: {
                    value: 16,
                  },
                },
              },
              {
                src: "https://win98icons.alexmeub.com/icons/png/directory_network_conn-5.png",
                width: 48,
                height: 48,
                particles: {
                  size: {
                    value: 16,
                  },
                },
              },
              {
                src: "https://win98icons.alexmeub.com/icons/png/directory_net_web-4.png",
                width: 48,
                height: 48,
                particles: {
                  size: {
                    value: 16,
                  },
                },
              },
              {
                src: "https://win98icons.alexmeub.com/icons/png/directory_e-5.png",
                width: 48,
                height: 48,
                particles: {
                  size: {
                    value: 16,
                  },
                },
              },
              {
                src: "https://win98icons.alexmeub.com/icons/png/notepad-5.png",
                width: 48,
                height: 48,
                particles: {
                  size: {
                    value: 16,
                  },
                },
              },
              {
                src: "https://win98icons.alexmeub.com/icons/png/recycle_bin_full-4.png",
                width: 48,
                height: 48,
                particles: {
                  size: {
                    value: 16,
                  },
                },
              },
              {
                src: "https://win98icons.alexmeub.com/icons/png/network_internet_pcs_installer-4.png",
                width: 48,
                height: 48,
                particles: {
                  size: {
                    value: 16,
                  },
                },
              },
              {
                src: "https://win98icons.alexmeub.com/icons/png/directory_network_conn_shortcut-4.png",
                width: 48,
                height: 48,
                particles: {
                  size: {
                    value: 16,
                  },
                },
              },
              {
                src: "https://win98icons.alexmeub.com/icons/png/directory_channels-2.png",
                width: 48,
                height: 48,
                particles: {
                  size: {
                    value: 16,
                  },
                },
              },
              {
                src: "https://win98icons.alexmeub.com/icons/png/directory_business_calendar-4.png",
                width: 48,
                height: 48,
                particles: {
                  size: {
                    value: 16,
                  },
                },
              },
              {
                src: "https://win98icons.alexmeub.com/icons/png/directory_admin_tools-5.png",
                width: 48,
                height: 48,
                particles: {
                  size: {
                    value: 16,
                  },
                },
              },
              {
                src: "https://win98icons.alexmeub.com/icons/png/directory_control_panel_cool-3.png",
                width: 48,
                height: 48,
                particles: {
                  size: {
                    value: 16,
                  },
                },
              },
              {
                src: "https://win98icons.alexmeub.com/icons/png/directory_fonts-0.png",
                width: 48,
                height: 48,
                particles: {
                  size: {
                    value: 16,
                  },
                },
              },
            ],
          },
        },
        size: {
          value: {
            min: 2,
            max: 4,
          },
        },
        roll: {
          darken: {
            enable: true,
            value: 30,
          },
          enlighten: {
            enable: true,
            value: 30,
          },
          enable: true,
          speed: {
            min: 15,
            max: 25,
          },
        },
        wobble: {
          distance: 30,
          enable: true,
          move: true,
          speed: {
            min: -15,
            max: 15,
          },
        },
      },
    }),
    []
  );

  const MemoParticles = useMemo(
    () => <Particles id="tsparticles" options={options} />,
    [options]
  );

  if (!used) return null;
  return MemoParticles;
}

export default function App() {
  const now = useDate();
  const sortedGenerators = [...generators].sort(
    (a, b) => timeUntilGenerator(a) - timeUntilGenerator(b)
  );

  const [focusedGenerator, setFocusedGenerator] = useState<Generator>(
    sortedGenerators[0]
  );

  const [dark, setDark] = useState(false);

  document.body.className = dark ? "bg-black" : "bg-white";

  return (
    <div
      className={
        "flex flex-row p-4 gap-4 flex-grow h-full w-full transition-colors " +
        (dark
          ? "font-display bg-black text-amber-200"
          : "font-mono bg-white text-black")
      }
    >
      <div className="flex flex-col w-full gap-2 max-w-2xl">
        <h1 className="text-4xl text-center mb-2">7:55 make a directory</h1>

        <div className="flex flex-col sm:flex-row text-2xl justify-between pl-4 pr-[calc(0.75rem+2px)]">
          <span>the time is...</span>
          <span className="ml-auto sm:ml-0 mr-[9ch]">
            {String(now.getHours()).padStart(2, "0")}:
            {String(now.getMinutes()).padStart(2, "0")}
          </span>
        </div>
        <div className="flex flex-col gap-2 sm:min-h-0 sm:overflow-y-auto">
          {sortedGenerators.map((generator) => (
            <GeneratorView
              generator={generator}
              key={generator.name}
              open={generator === focusedGenerator}
              onFocus={() => setFocusedGenerator(generator)}
              dark={dark}
            />
          ))}
        </div>

        <div className="flex flex-grow" />

        <details className="border-2 rounded-lg px-3 py-2 border-gray-400 text-gray-400">
          <summary>settings / about / credits</summary>
          <div className={"text-sm " + (dark ? "text-white" : "text-gray-600")}>
            <p className="my-1">
              toggle theme:{" "}
              <button
                className={
                  "underline " +
                  (dark ? "font-bold text-blue-400" : "text-blue-600")
                }
                onClick={() => setDark(true)}
              >
                dark
              </button>{" "}
              /{" "}
              <button
                className={
                  "underline " +
                  (dark ? "text-blue-400" : "font-bold text-blue-600")
                }
                onClick={() => setDark(false)}
              >
                light
              </button>
              .
            </p>
            <p>
              this site collects "11:11 make a fish"-inspired websites with
              their corresponding wall clock time. it was made with {"<3"} by{" "}
              <a
                href="https://breq.dev/"
                className={
                  "underline " + (dark ? "text-blue-400" : "text-blue-600")
                }
              >
                brooke
              </a>
              .
            </p>
            <p>
              font used is{" "}
              {dark ? (
                <a
                  href="https://fontstruct.com/fontstructions/show/2145556/daktronics-9x15"
                  className="text-blue-400 underline"
                >
                  daktronics 9x15
                </a>
              ) : (
                <a
                  href="https://www.jetbrains.com/lp/mono/"
                  className="text-blue-600 underline"
                >
                  jetbrains mono
                </a>
              )}
              . win98 icons provided by{" "}
              <a
                href="https://win98icons.alexmeub.com/"
                className={
                  "underline " + (dark ? "text-blue-400" : "text-blue-600")
                }
              >
                alexmeub
              </a>
              .
            </p>
            <p>
              also check out{" "}
              <a
                href="https://approaching.lftq.in/"
                className={
                  "underline " + (dark ? "text-blue-400" : "text-blue-600")
                }
              >
                approaching.lftq.in
              </a>{" "}
              for a more minimalist concept.
            </p>
            <p>
              want to add something? this site is on{" "}
              <a
                href="https://github.com/breqdev/directory"
                className={
                  "underline " + (dark ? "text-blue-400" : "text-blue-600")
                }
              >
                github
              </a>
              , submit an{" "}
              <a
                href="https://github.com/breqdev/directory/issues/new"
                className={
                  "underline " + (dark ? "text-blue-400" : "text-blue-600")
                }
              >
                issue
              </a>{" "}
              or{" "}
              <a
                href="https://github.com/breqdev/directory/pulls/new"
                className={
                  "underline " + (dark ? "text-blue-400" : "text-blue-600")
                }
              >
                pull
              </a>
              .
            </p>
          </div>
        </details>
      </div>
      <div
        className={
          "hidden lg:flex flex-grow rounded-lg border-2 flex-col gap-2 pt-2 overflow-clip " +
          (dark ? "border-amber-200" : "border-black")
        }
      >
        <h1 className="text-center text-4xl">{focusedGenerator.name}</h1>
        <iframe
          src={focusedGenerator.url}
          className="w-full flex-grow bg-white"
          title={focusedGenerator.name}
        />
      </div>
      <Confetti />
    </div>
  );
}
