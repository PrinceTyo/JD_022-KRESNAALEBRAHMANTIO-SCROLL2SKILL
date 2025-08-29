import { startOfDay, startOfWeek, startOfYear, isSameDay, isAfter, parseISO } from 'date-fns';
import type { ActivityData } from '@/api/activityApi';

export const filterByRange = (data: ActivityData[], range: string): ActivityData[] => {
  const now = new Date();
  const startMap: Record<string, Date> = {
    today: startOfDay(now),
    week: startOfWeek(now, { weekStartsOn: 1 }),
    year: startOfYear(now),
  };

  const start = startMap[range];
  if (!start) return data;

  return data.filter((a) => {
    const date = parseISO(a.createdAt || '');
    return isAfter(date, start) || isSameDay(date, start);
  });
};

export const filterByDay = (data: ActivityData[], day: Date | null): ActivityData[] =>
  !day
    ? data
    : data.filter((a) => isSameDay(parseISO(a.createdAt || ''), day));