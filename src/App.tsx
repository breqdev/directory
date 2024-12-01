import { useEffect, useState } from "react";
import { ClockTime, Generator, generators } from "./data";

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
              <a
                className={
                  "underline " + (dark ? "text-blue-400" : "text-blue-600")
                }
                href={author.url}
              >
                {author.name}
              </a>
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
              font:{" "}
              {dark ? (
                <a
                  href="https://fontstruct.com/fontstructions/show/2145556/daktronics-9x15"
                  className="text-blue-400 underline"
                >
                  daktronics 9x15 by bentheminer
                </a>
              ) : (
                <a
                  href="https://www.jetbrains.com/lp/mono/"
                  className="text-blue-600 underline"
                >
                  jetbrains mono
                </a>
              )}
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
    </div>
  );
}
