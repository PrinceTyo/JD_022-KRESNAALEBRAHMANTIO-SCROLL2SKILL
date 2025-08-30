import type { TargetData } from '@/api/targetApi';

export const sortByPinned = (list: TargetData[]): TargetData[] =>
  [...list].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

const MAX_PINNED = 3;

export const canPinMore = (targets: TargetData[]): boolean =>
  targets.filter((t) => t.isPinned).length < MAX_PINNED;