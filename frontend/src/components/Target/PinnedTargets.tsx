import { TbPinnedOff } from 'react-icons/tb';
import { PinnedTargetCard } from '@/components/Target/Cards/PinnedTargetCard';
import type { TargetData } from '@/api/targetApi';

interface PinnedTargetsProps {
  targets: TargetData[];
  onEdit: (t: TargetData) => void;
  onDelete: (id: string) => void;
  onPinToggle: (id: string, pinned: boolean) => void;
}

export const PinnedTargets = ({ targets, onEdit, onDelete, onPinToggle }: PinnedTargetsProps) => {
  const pinned = targets.filter((t) => t.isPinned);

  return (
    <div className="col-span-1 md:col-span-8 md:row-span-4 md:col-start-1 md:row-start-3 rounded-2xl shadow-md py-4 px-4 md:px-6 border border-gray-100 bg-white">
      <h1 className="text-xl font-bold text-primary-gradient mb-4">Pinned Target</h1>
      <div className="flex flex-col md:flex-row gap-4 md:overflow-x-auto">
        {pinned.length ? (
          pinned.map((t) => (
            <PinnedTargetCard
              key={t._id}
              target={t}
              onEdit={() => onEdit(t)}
              onDelete={() => onDelete(t._id!)}
              onPinTarget={() => onPinToggle(t._id!, !t.isPinned)}
            />
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-500 mt-20">
            <div className="flex flex-col items-center space-y-2">
              <TbPinnedOff size={50} />
              <p className="font-semibold text-xl">No pinned targets yet</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};