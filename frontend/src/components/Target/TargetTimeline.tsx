import { ScrollArea } from '@/components/ui/scroll-area';
import { TimePicker } from '@/components/Shared/Cards/TimePicker';
import { TargetCard } from '@/components/Target/Cards/TargetCard';
import { TbTargetOff } from 'react-icons/tb';
import type { TargetData } from '@/api/targetApi';

interface TargetTimelineProps {
  targets: TargetData[];
  onDaySelect: (d: Date | null) => void;
  onEdit: (t: TargetData) => void;
  onDelete: (id: string) => void;
  onPinToggle: (id: string, pinned: boolean) => void;
}

export const TargetTimeline = ({
  targets,
  onDaySelect,
  onEdit,
  onDelete,
  onPinToggle,
}: TargetTimelineProps) => (
  <div className="col-span-1 md:col-span-4 md:row-span-11 md:col-start-9 md:row-start-1 rounded-2xl shadow-md border border-gray-100 px-4 py-5 bg-white flex flex-col">
    <div className="flex-shrink-0">
      <TimePicker onDaySelect={onDaySelect} label="Target" />
    </div>
    <ScrollArea className="h-[50vh] md:h-[120vh] mt-4 pr-4">
      <div className="relative flex-1 mt-3 overflow-auto">
        {targets.length ? (
          <div className="space-y-3">
            {targets.map((t) => (
              <TargetCard
                key={t._id}
                target={t}
                onEdit={() => onEdit(t)}
                onDelete={() => onDelete(t._id!)}
                isPinned={t.isPinned}
                onPinTarget={() => onPinToggle(t._id!, !t.isPinned)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500">
            <TbTargetOff size={40} />
            <p className="font-semibold text-lg">Not targets yet</p>
          </div>
        )}
      </div>
    </ScrollArea>
  </div>
);