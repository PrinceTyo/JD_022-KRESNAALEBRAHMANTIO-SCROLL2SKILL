import {
  startOfDay,
  startOfWeek,
  startOfYear,
  isSameDay,
  isAfter,
  parseISO,
} from 'date-fns';
import type { TargetData } from '@/api/targetApi';

export const filterByRange = (data: TargetData[], range: string): TargetData[] => {
  const now = new Date();
  const startMap: Record<string, Date> = {
    today: startOfDay(now),
    week: startOfWeek(now, { weekStartsOn: 1 }),
    year: startOfYear(now),
  };

  const start = startMap[range];
  if (!start) return data;

  return data.filter((t) => {
    const date = parseISO(t.createdAt || '');
    return isAfter(date, start) || isSameDay(date, start);
  });
};

export const filterByDay = (data: TargetData[], day: Date | null): TargetData[] => {
  if (!day) return data;
  return data.filter((t) => isSameDay(parseISO(t.createdAt || ''), day));
};