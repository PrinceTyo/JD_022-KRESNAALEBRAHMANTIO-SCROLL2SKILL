import { useState, useEffect, useMemo, useCallback } from 'react';
import { targetApi, type TargetData } from '@/api/targetApi';
import { filterByRange, filterByDay } from '@/utils/Target/targetFilters';
import { sortByPinned } from '@/utils/Target/targetHelpers';

export const useTarget = () => {
  const [targets, setTargets] = useState<TargetData[]>([]);
  const [selectedRange, setSelectedRange] = useState('all');
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const fetchTargets = useCallback(async () => {
    const res = await targetApi.getAll().catch(() => null);
    const data = Array.isArray(res) ? res : res?.data?.data || [];
    setTargets(data);
  }, []);

  useEffect(() => {
    fetchTargets();
  }, [fetchTargets]);

  const baseFiltered = useMemo(
    () => sortByPinned(filterByRange(targets, selectedRange)),
    [targets, selectedRange]
  );

  const timelineTargets = useMemo(
    () => sortByPinned(filterByDay(targets, selectedDay)),
    [targets, selectedDay]
  );

  return {
    targets,
    baseFiltered,
    timelineTargets,
    selectedRange,
    setSelectedRange,
    selectedDay,
    setSelectedDay,
    refetch: fetchTargets,
  };
};