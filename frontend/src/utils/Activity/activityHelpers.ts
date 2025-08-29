import type { ActivityData } from '@/api/activityApi';

export const getTopCategory = (
  type: 'productive' | 'distraction',
  data: ActivityData[]
): { category: string; time: number } | null => {
  const grouped: Record<string, number> = {};

  data
    .filter((a) => a.type === type)
    .forEach((a) => {
      const cat = a.category?.toLowerCase() || 'others';
      grouped[cat] = (grouped[cat] || 0) + (a.timeSpent || 0);
    });

  const top = Object.entries(grouped).sort((a, b) => b[1] - a[1])[0];
  return top ? { category: top[0], time: top[1] } : null;
};