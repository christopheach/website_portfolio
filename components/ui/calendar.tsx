"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/* ---------------------------------- dates --------------------------------- */

const pad = (value: number) => String(value).padStart(2, "0");
const toDateKey = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
const addDays = (date: Date, days: number) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
const addMonths = (date: Date, months: number) => new Date(date.getFullYear(), date.getMonth() + months, 1);
const isSameDay = (a?: Date | null, b?: Date | null) => !!a && !!b && toDateKey(a) === toDateKey(b);
const isSameMonth = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

/* -------------------------------- variants -------------------------------- */

const calendarDayVariants = cva(
  "relative grid aspect-square w-full place-items-center rounded-md text-xs tabular-nums outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring sm:text-sm motion-reduce:transition-none",
  {
    variants: {
      state: {
        available: "bg-secondary/80 text-foreground hover:bg-accent",
        selected: "bg-primary font-medium text-primary-foreground shadow-[0_6px_20px_-8px_var(--color-primary)]",
        unavailable: "cursor-not-allowed text-muted-foreground/40",
      },
      today: {
        true: "after:absolute after:bottom-1 after:size-1 after:rounded-full after:bg-current",
        false: "",
      },
    },
    defaultVariants: { state: "available", today: false },
  },
);

/* -------------------------------- component ------------------------------- */

type CalendarProps = Omit<React.ComponentProps<"div">, "onSelect"> & {
  /** Any date inside the month to display. */
  month: Date;
  onMonthChange: (month: Date) => void;
  selected?: Date | null;
  onSelect?: (date: Date) => void;
  isDateDisabled?: (date: Date) => boolean;
  /** Earliest month the user can navigate to. */
  minMonth?: Date;
  today?: Date;
  locale?: string;
  weekStartsOn?: 0 | 1;
  labels: { previousMonth: string; nextMonth: string };
};

/**
 * Single-date calendar with a roving tab stop and arrow-key navigation,
 * following the WAI-ARIA date grid pattern.
 */
function Calendar({
  month,
  onMonthChange,
  selected,
  onSelect,
  isDateDisabled,
  minMonth,
  today,
  locale = "en",
  weekStartsOn = 1,
  labels,
  className,
  ...props
}: CalendarProps) {
  const gridRef = React.useRef<HTMLTableSectionElement>(null);
  const [focusKey, setFocusKey] = React.useState<string | null>(null);
  const monthStart = startOfMonth(month);
  const canGoBack = !minMonth || monthStart > startOfMonth(minMonth);

  const formatters = React.useMemo(
    () => ({
      title: new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }),
      weekdayShort: new Intl.DateTimeFormat(locale, { weekday: "short" }),
      weekdayLong: new Intl.DateTimeFormat(locale, { weekday: "long" }),
      day: new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
    }),
    [locale],
  );

  // 4 January 2026 is a Sunday, a fixed reference for weekday names.
  const weekdays = Array.from({ length: 7 }, (_, i) => new Date(2026, 0, 4 + ((i + weekStartsOn) % 7)));

  const weeks = (() => {
    const leading = (monthStart.getDay() - weekStartsOn + 7) % 7;
    const daysInMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate();
    const cells: (Date | null)[] = [
      ...Array.from({ length: leading }, () => null),
      ...Array.from({ length: daysInMonth }, (_, i) => addDays(monthStart, i)),
    ];
    while (cells.length % 7 !== 0) cells.push(null);
    return Array.from({ length: cells.length / 7 }, (_, row) => cells.slice(row * 7, row * 7 + 7));
  })();

  const days = weeks.flat().filter((d): d is Date => d !== null);
  const isDisabled = (date: Date) => isDateDisabled?.(date) ?? false;
  const tabStop =
    (focusKey && days.find((d) => toDateKey(d) === focusKey)) ||
    (selected && isSameMonth(selected, monthStart) ? selected : null) ||
    days.find((d) => !isDisabled(d)) ||
    days[0];

  React.useEffect(() => {
    if (!focusKey) return;
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${focusKey}"]`)?.focus();
  }, [focusKey, month]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLTableSectionElement>) {
    const key = (event.target as HTMLElement).dataset.date;
    if (!key) return;
    const steps: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    const step = steps[event.key];
    if (step === undefined) return;
    event.preventDefault();

    const [y, m, d] = key.split("-").map(Number);
    const next = addDays(new Date(y, m - 1, d), step);
    if (minMonth && startOfMonth(next) < startOfMonth(minMonth)) return;
    if (!isSameMonth(next, monthStart)) onMonthChange(startOfMonth(next));
    setFocusKey(toDateKey(next));
  }

  return (
    <div data-slot="calendar" className={cn("w-full", className)} {...props}>
      <div data-slot="calendar-header" className="mb-4 flex items-center justify-between gap-2">
        <p aria-live="polite" className="text-sm font-medium capitalize">
          {formatters.title.format(monthStart)}
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={labels.previousMonth}
            disabled={!canGoBack}
            onClick={() => onMonthChange(addMonths(monthStart, -1))}
          >
            <ChevronLeftIcon aria-hidden />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label={labels.nextMonth} onClick={() => onMonthChange(addMonths(monthStart, 1))}>
            <ChevronRightIcon aria-hidden />
          </Button>
        </div>
      </div>

      <table data-slot="calendar-grid" role="grid" className="w-full table-fixed border-separate border-spacing-1">
        <thead>
          <tr>
            {weekdays.map((weekday) => (
              <th
                key={weekday.getDay()}
                scope="col"
                abbr={formatters.weekdayLong.format(weekday)}
                className="pb-1 text-[0.625rem] font-medium text-muted-foreground sm:text-[0.6875rem]"
              >
                {formatters.weekdayShort.format(weekday).slice(0, 3)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody ref={gridRef} onKeyDown={handleKeyDown}>
          {weeks.map((week, row) => (
            <tr key={row}>
              {week.map((date, col) => {
                if (!date) return <td key={col} aria-hidden />;
                const disabled = isDisabled(date);
                const isSelected = isSameDay(date, selected);
                return (
                  <td key={col} role="gridcell" aria-selected={isSelected}>
                    <button
                      type="button"
                      data-slot="calendar-day"
                      data-date={toDateKey(date)}
                      tabIndex={isSameDay(date, tabStop) ? 0 : -1}
                      aria-disabled={disabled || undefined}
                      aria-pressed={isSelected}
                      aria-label={formatters.day.format(date)}
                      aria-current={isSameDay(date, today) ? "date" : undefined}
                      onClick={() => !disabled && onSelect?.(date)}
                      className={calendarDayVariants({
                        state: isSelected ? "selected" : disabled ? "unavailable" : "available",
                        today: isSameDay(date, today),
                      })}
                    >
                      {date.getDate()}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Calendar, calendarDayVariants, toDateKey };
