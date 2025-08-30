import { Edit, Trash } from "lucide-react";
import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import { ProgressBar } from "../Bar/ProgressBar";
import { Separator } from "../../ui/separator";
import type { TargetData } from "@/api/targetApi";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { SourceIconBadge } from "@/components/Target/Badges/SourceIconBadge";

interface PinnedTargetCardProps {
  target: TargetData;
  onEdit?: () => void;
  onDelete?: () => void;
  onPinTarget?: () => void;
}

export const PinnedTargetCard = ({
  target,
  onEdit,
  onDelete,
  onPinTarget,
}: PinnedTargetCardProps) => {
  return (
    <div className="rounded-2xl shadow-md border border-gray-100 mb-2">
      <div className="py-4 px-6">
        <div className="flex items-center justify-between gap-15">
          <h1 className="text-sm font-medium">
            {new Date(target.createdAt || "").toDateString()}
          </h1>
          {target.isPinned ? (
            <TbPinnedFilled
              size={28}
              className="icon-btn cursor-pointer"
              onClick={onPinTarget}
            />
          ) : (
            <TbPinned
              size={28}
              className="icon-btn cursor-pointer"
              onClick={onPinTarget}
            />
          )}
        </div>

        <div className="flex items-center gap-3 my-4">
          <SourceIconBadge type={target.sourceType} size={40} />
          <div className="leading-none">
            <h1 className="font-bold text-md">{target.title}</h1>
            <p className="text-sm font-medium text-secondary">
              Source: {target.sourceType || "Unknown"}
            </p>
          </div>
        </div>

        <div className="mb-2">
          <ProgressBar progress={target.progress || 0} />
        </div>
      </div>

      <Separator />

      <div className="flex items-center justify-between py-4 px-6">
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <a
              href={target.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-secondary text-sm text-accent rounded-full font-semibold inline-block"
            >
              Source Link
            </a>
          </HoverCardTrigger>
          <HoverCardContent sideOffset={4} className="w-80">
            <div className="space-y-2">
              <p className="text-sm font-semibold">Link Preview</p>
              <a
                href={target.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm break-all"
              >
                {target.sourceLink}
              </a>
              <p className="text-xs text-gray-500">
                Click to open in a new tab.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onEdit}
            className="p-1.5 rounded-full bg-secondary text-accent"
          >
            <Edit size={15} />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 rounded-full bg-[#FF3D3D] text-accent"
          >
            <Trash size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}