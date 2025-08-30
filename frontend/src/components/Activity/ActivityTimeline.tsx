import { ScrollArea } from '@/components/ui/scroll-area';
import { ActivityCard } from '@/components/Activity/Cards/ActivityCard';
import { TimePicker } from '@/components/Shared/Cards/TimePicker';
import { FiActivity } from 'react-icons/fi';
import type { ActivityData } from '@/api/activityApi';

interface ActivityTimelineProps {
  activities: ActivityData[];
  onDaySelect: (d: Date | null) => void;
  onEdit: (a: ActivityData) => void;
  onDelete: (id: string) => void;
}

export const ActivityTimeline = ({ activities, onDaySelect, onEdit, onDelete }: ActivityTimelineProps) => (
  <div className="col-span-1 md:col-span-4 md:row-span-12 md:col-start-9 md:row-start-1 rounded-2xl shadow-md border border-gray-100 px-4 py-5 max-h-fit">
    <TimePicker onDaySelect={onDaySelect} label="Activity" />
    <ScrollArea className="h-[50vh] md:h-[123vh] mt-4 pr-4">
      <div className="relative pl-8 space-y-4">
        <div className="absolute left-[8px] top-0 bottom-0 w-0.5 bg-gray-300"></div>
        {activities.length ? (
          activities.map((a) => (
            <ActivityCard
              key={a._id}
              activity={a}
              onEdit={() => onEdit(a)}
              onDelete={() => onDelete(a._id!)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500 space-y-2">
            <FiActivity size={40} />
            <p className="text-lg font-semibold">No activities yet</p>
          </div>
        )}
      </div>
    </ScrollArea>
  </div>
);