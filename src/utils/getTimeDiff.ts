type TimeUnit = "year" | "month" | "day" | "hour" | "minute" | "second";

const units: Record<TimeUnit, number> = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const parseDate = (input: Date | number | string): number => {
  if (input instanceof Date) {
    return input.getTime();
  }
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    return new Date(input).getTime();
  }
  throw new Error("Invalid date input");
};

const getRelativeTime = (
  d1: Date | number | string,
  d2: Date | number | string = new Date(),
): string => {
  const elapsed = parseDate(d1) - parseDate(d2);

  for (const unit of Object.keys(units) as TimeUnit[]) {
    if (Math.abs(elapsed) > units[unit] || unit === "second") {
      return rtf.format(Math.round(elapsed / units[unit]), unit);
    }
  }

  return rtf.format(0, "second"); 
};

export default getRelativeTime;
