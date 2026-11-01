import { formatSpan, type DayBar } from "@/lib/study-stats";
import { cn } from "@/lib/utils";

const BAR_AREA = 88; // px
const FULL_BAR_MS = 60 * 60 * 1000; // a bar is full at an hour

// Seven small bars, oldest first. A bar is amber once the day reached the streak threshold.
export function WeekBars({ bars }: { bars: DayBar[] }) {
  return (
    <ol className="grid grid-cols-7 gap-2" aria-label="Study time over the last seven days">
      {bars.map((bar) => {
        const height = bar.ms === 0 ? 4 : Math.max(8, Math.min(1, bar.ms / FULL_BAR_MS) * BAR_AREA);
        return (
          <li key={bar.key} className="flex flex-col items-center gap-2">
            <div className="flex w-full items-end justify-center" style={{ height: BAR_AREA }}>
              <span
                title={`${bar.weekday}: ${formatSpan(bar.ms)}`}
                className={cn("w-full max-w-9 rounded-md", bar.counted ? "bg-accent" : bar.ms ? "bg-accent/35" : "bg-ink/10")}
                style={{ height }}
              />
            </div>
            <span className={cn("text-xs", bar.today ? "font-semibold text-ink" : "text-ink-muted")}>
              {bar.today ? "Today" : bar.weekday}
            </span>
            <span className="sr-only">{bar.ms === 0 ? "No study" : formatSpan(bar.ms)}</span>
          </li>
        );
      })}
    </ol>
  );
}
