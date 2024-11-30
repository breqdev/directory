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

  return (targetDate.getTime() - now.getTime()) / 1000;
}

function timeUntilGenerator(generator: Generator) {
  return generator.clockTimes
    .map((clockTime) => timeUntilWallClock(clockTime))
    .reduce((prev, curr) => Math.min(prev, curr));
}

function GeneratorView({
  generator,
  onFocus,
}: {
  generator: Generator;
  onFocus: () => void;
}) {
  const timeUntil = timeUntilGenerator(generator);
  const state: "later" | "soon" | "now" =
    timeUntil < 0 ? "now" : timeUntil < 15 * 60 ? "soon" : "later";

  const hours = Math.floor(timeUntil / 3600);
  const minutes = Math.floor((timeUntil % 3600) / 60);

  return (
    <details
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
        <p>{generator.description}</p>
        <p className="sm:hidden text-xs text-blue-600 underline">
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

  const [focusedGenerator, setFocusedGenerator] = useState<Generator | null>(
    null
  );

  return (
    <div className="flex flex-col p-4 gap-4 font-mono h-full">
      <div>
        <h1 className="text-4xl">7:55 make a directory</h1>
      </div>

      <div className="flex flex-row gap-4 flex-grow w-full">
        <div className="flex flex-col w-full gap-2 max-w-2xl">
          <div className="flex flex-col sm:flex-row text-2xl justify-between pl-4 pr-[calc(0.75rem+2px)]">
            <span>the time is...</span>
            <span className="ml-auto sm:ml-0 mr-[9ch]">
              {String(now.getHours()).padStart(2, "0")}:
              {String(now.getMinutes()).padStart(2, "0")}
            </span>
          </div>
          {[...generators]
            .sort((a, b) => timeUntilGenerator(a) - timeUntilGenerator(b))
            .map((generator) => (
              <GeneratorView
                generator={generator}
                key={generator.name}
                onFocus={() => setFocusedGenerator(generator)}
              />
            ))}
        </div>
        {focusedGenerator && (
          <div className="hidden sm:flex flex-grow rounded-lg border-2 border-black flex-col gap-2 pt-2">
            <h1 className="text-center text-4xl">{focusedGenerator.name}</h1>
            <iframe
              src={focusedGenerator.url}
              className="w-full flex-grow"
              title={focusedGenerator.name}
            />
          </div>
        )}
      </div>
    </div>
  );
}
