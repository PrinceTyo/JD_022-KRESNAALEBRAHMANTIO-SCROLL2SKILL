import { TargetProgressCard } from '@/components/Target/Cards/TargetProgressCard';
import { DateFilterSelect } from '@/components/Shared/Input/DateFilterSelect';
import type { TargetData } from '@/api/targetApi';

interface TargetProgressProps {
  targets: TargetData[];
  range: string;
  onRangeChange: (r: string) => void;
}

export const TargetProgress = ({ targets, range, onRangeChange }: TargetProgressProps) => (
  <div className="col-span-1 md:col-span-8 md:row-span-5 md:col-start-1 md:row-start-7 shadow-md rounded-xl py-4 bg-white border border-gray-100">
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between me-4 md:me-10 ms-4">
      <p className="font-bold text-xl mb-4 mx-2 md:mx-10">Target Progress</p>
      <DateFilterSelect value={range} onValueChange={onRangeChange} />
    </div>
    <TargetProgressCard
      targets={targets.map((t) => ({
        name: t.title,
        value: t.progress ?? 0,
      }))}
    />
  </div>
);