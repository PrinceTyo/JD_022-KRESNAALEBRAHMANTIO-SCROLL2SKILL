import { useMemo } from 'react';
import ProDisChartCard, { getNormalizedChartData } from '@/components/Activity/Cards/ProDisChartCard';
import QuickStatsCard from '@/components/Activity/Cards/QuickStatsCard';
import CategoryBadge from '@/components/Shared/Badges/CategoryBadge';
import DateFilterSelect from '@/components/Shared/Input/DateFilterSelect';
import { MoreHorizontal } from 'lucide-react';
import { getTopCategory } from '../../utils/Activity/activityHelpers';
import { formatTime } from '../../utils/helper';
import type { ActivityData } from '@/api/activityApi';

interface Props {
  activities: ActivityData[];
  range: string;
  onRangeChange: (r: string) => void;
}

export const ActivityStats = ({ activities, range, onRangeChange }: Props) => {
  const productiveTop = useMemo(() => getTopCategory('productive', activities), [activities]);
  const distractionTop = useMemo(() => getTopCategory('distraction', activities), [activities]);

  return (
    <>
      <div className="col-span-1 md:col-span-6 md:row-span-4 md:col-start-1 md:row-start-3 bg-white rounded-2xl border border-gray-100 shadow-md py-4 px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-lg font-semibold mb-2">Productive Chart</h2>
          <DateFilterSelect value={range} onValueChange={onRangeChange} />
        </div>
        <div className="w-full h-[260px]">
          <ProDisChartCard data={getNormalizedChartData(activities, 'productive')} donut />
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 md:row-span-4 md:col-start-7 md:row-start-3 rounded-2xl flex flex-col items-center justify-start p-4 gap-3 shadow-md bg-white">
        <QuickStatsCard
          activities={activities.map((a) => ({
            ...a,
            _id: (a as any)._id || crypto.randomUUID(),
            timeSpent: a.timeSpent || 0,
          }))}
          filterType="productive"
          title="Productive Time Well Spent"
          description="Daily percentage of time spent on meaningful and productive activities."
          primaryColor="#10B981"
          secondaryColor="#E5E7EB"
        />
      </div>

      <div className="col-span-1 md:col-span-4 md:col-start-1 md:row-start-7 bg-secondary text-accent rounded-2xl flex flex-col md:flex-row items-center justify-center gap-4 p-4">
        {productiveTop ? (
          <CategoryBadge category={productiveTop.category} iconSize={28} variant="transparent" />
        ) : (
          <MoreHorizontal size={28} />
        )}
        <div className="text-center sm:text-start">
          <h1 className="font-bold">Most Time Spent On Productive:</h1>
          {productiveTop ? (
            <p>
              {productiveTop.category}: {formatTime(productiveTop.time)}
            </p>
          ) : (
            <p>No productive activities yet</p>
          )}
        </div>
      </div>

      <div className="col-span-1 md:col-span-6 md:row-span-4 md:col-start-1 md:row-start-8 bg-white rounded-2xl border border-gray-100 shadow-md py-4 px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-lg font-semibold mb-2">Distraction Chart</h2>
          <DateFilterSelect value={range} onValueChange={onRangeChange} />
        </div>
        <div className="w-full h-[260px]">
          <ProDisChartCard
            data={getNormalizedChartData(activities, 'distraction')}
            donut
            legendPosition="right"
          />
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 md:row-span-4 md:col-start-7 md:row-start-8 rounded-2xl flex flex-col items-center justify-start p-4 gap-3 shadow-md bg-white">
        <QuickStatsCard
          activities={activities.map((a) => ({
            ...a,
            _id: (a as any)._id || crypto.randomUUID(),
            timeSpent: a.timeSpent || 0,
          }))}
          filterType="distraction"
          title="Time Gone to Waste"
          description="Daily percentage of time wasted on unproductive and distracting activities."
          primaryColor="#FF3D3D"
          secondaryColor="#E5E7EB"
        />
      </div>

      <div className="col-span-1 md:col-span-4 md:col-start-5 md:row-start-7 bg-secondary text-accent rounded-2xl flex flex-col md:flex-row items-center justify-center gap-4 p-4">
        {distractionTop ? (
          <CategoryBadge category={distractionTop.category} iconSize={28} variant="transparent" />
        ) : (
          <MoreHorizontal size={28} />
        )}
        <div className="text-center sm:text-start">
          <h1 className="font-bold">Most Time Spent On Distraction:</h1>
          {distractionTop ? (
            <p>
              {distractionTop.category}: {formatTime(distractionTop.time)}
            </p>
          ) : (
            <p>No productive activities yet</p>
          )}
        </div>
      </div>
    </>
  );
};