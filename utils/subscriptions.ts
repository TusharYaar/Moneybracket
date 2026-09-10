import type { Subscription, SubscriptionInterval } from "types";

export const MAX_OCCURRENCES_PER_RUN = 5000;

type Schedule = Pick<Subscription, "startDate" | "intervalUnit" | "intervalCount">;

export type DueOccurrencePlan = {
  occurrences: Date[];
  nextOccurrenceIndex: number;
  nextRunAt: Date | null;
  isComplete: boolean;
};

const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

/**
 * Calculates from the original anchor on every call. This avoids month-end drift
 * such as Jan 31 -> Feb 28 -> Mar 28.
 */
export const occurrenceAt = (schedule: Schedule, occurrenceIndex: number): Date => {
  const index = Math.max(0, Math.trunc(occurrenceIndex));
  const interval = Math.max(1, Math.trunc(schedule.intervalCount));
  const start = schedule.startDate;

  if (schedule.intervalUnit === "day" || schedule.intervalUnit === "week") {
    const daysToAdd = index * interval * (schedule.intervalUnit === "week" ? 7 : 1);
    return new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate() + daysToAdd,
      start.getHours(),
      start.getMinutes(),
      start.getSeconds(),
      start.getMilliseconds()
    );
  }

  if (schedule.intervalUnit === "month") {
    const absoluteMonth = start.getMonth() + index * interval;
    const year = start.getFullYear() + Math.floor(absoluteMonth / 12);
    const month = ((absoluteMonth % 12) + 12) % 12;
    const day = Math.min(start.getDate(), daysInMonth(year, month));
    return new Date(
      year,
      month,
      day,
      start.getHours(),
      start.getMinutes(),
      start.getSeconds(),
      start.getMilliseconds()
    );
  }

  const year = start.getFullYear() + index * interval;
  const day = Math.min(start.getDate(), daysInMonth(year, start.getMonth()));
  return new Date(
    year,
    start.getMonth(),
    day,
    start.getHours(),
    start.getMinutes(),
    start.getSeconds(),
    start.getMilliseconds()
  );
};

export const planDueOccurrences = (
  subscription: Pick<
    Subscription,
    "startDate" | "intervalUnit" | "intervalCount" | "occurrenceIndex" | "endDate"
  >,
  now: Date,
  limit = MAX_OCCURRENCES_PER_RUN
): DueOccurrencePlan => {
  const occurrences: Date[] = [];
  let nextOccurrenceIndex = Math.max(0, subscription.occurrenceIndex);
  const maximum = Math.max(1, limit);

  while (occurrences.length < maximum) {
    const nextRunAt = occurrenceAt(subscription, nextOccurrenceIndex);

    if (subscription.endDate && nextRunAt.getTime() > subscription.endDate.getTime()) {
      return { occurrences, nextOccurrenceIndex, nextRunAt: null, isComplete: true };
    }

    if (nextRunAt.getTime() > now.getTime()) {
      return { occurrences, nextOccurrenceIndex, nextRunAt, isComplete: false };
    }

    occurrences.push(nextRunAt);
    nextOccurrenceIndex += 1;
  }

  const nextRunAt = occurrenceAt(subscription, nextOccurrenceIndex);
  const isComplete = Boolean(subscription.endDate && nextRunAt.getTime() > subscription.endDate.getTime());

  return {
    occurrences,
    nextOccurrenceIndex,
    nextRunAt: isComplete ? null : nextRunAt,
    isComplete,
  };
};

export const intervalLabel = (unit: SubscriptionInterval, count: number): string => {
  const value = Math.max(1, Math.trunc(count));
  return value === 1 ? `Every ${unit}` : `Every ${value} ${unit}s`;
};
