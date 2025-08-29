import { useEffect, useState, useMemo, useCallback } from 'react';
import { activityApi, type ActivityData } from '@/api/activityApi';
import { filterByRange, filterByDay } from '@/utils/Activity/activityFilters';

export const useActivity = () => {
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [selectedRange, setSelectedRange] = useState('all');
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const fetchActivities = useCallback(async () => {
    const res = await activityApi.getAll().catch(() => null);
    const data = Array.isArray(res) ? res : res?.data?.data || [];
    setActivities(data);
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const baseFiltered = useMemo(
    () => filterByRange(activities, selectedRange),
    [activities, selectedRange]
  );

  const timelineActivities = useMemo(
    () => filterByDay(activities, selectedDay),
    [activities, selectedDay]
  );

  return {
    activities,
    baseFiltered,
    timelineActivities,
    selectedRange,
    setSelectedRange,
    selectedDay,
    setSelectedDay,
    refetch: fetchActivities,
  };
};