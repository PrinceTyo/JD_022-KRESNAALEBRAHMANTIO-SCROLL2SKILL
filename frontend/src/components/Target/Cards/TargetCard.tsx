import { Edit, MoreVertical, Trash } from "lucide-react";
import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import { ProgressBar } from "../Bar/ProgressBar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { TargetData } from "@/api/targetApi";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SourceIconBadge } from "@/components/Target/Badges/SourceIconBadge";

interface TargetCardProps {
  target: TargetData;
  onEdit?: () => void;
  onDelete?: () => void;
  isPinned?: boolean;
  onPinTarget?: () => void;
}

export const TargetCard = ({
  target,
  onEdit,
  onDelete,
  isPinned,
  onPinTarget,
}: TargetCardProps) => {
  return (
    <div className="p-4 border border-gray-100 rounded-2xl shadow-md">
      <div className="hidden sm:flex flex-row items-center justify-between">
        <div className="flex items-center justify-start gap-4">
          <SourceIconBadge
            type={target.sourceType}
            size={40}
            className="p-2 bg-secondary text-accent rounded-full"
          />
          <div className="leading-none">
            <h1 className="font-bold">{target.title}</h1>
            <p className="text-sm font-medium text-secondary">
              Source: {target.sourceType}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          {isPinned ? (
            <TbPinnedFilled size={28} className="icon-btn cursor-pointer" onClick={onPinTarget} />
          ) : (
            <TbPinned size={28} className="icon-btn cursor-pointer" onClick={onPinTarget} />
          )}
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button onClick={onEdit} className="flex items-center gap-2">
                  <Edit /> Edit
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button onClick={onDelete} className="flex items-center gap-2">
                  <Trash /> Delete
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex sm:hidden items-start gap-3">
        <SourceIconBadge
          type={target.sourceType}
          size={30}
          className="p-2 bg-secondary text-accent rounded-full flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h1 className="font-bold text-sm leading-tight">{target.title}</h1>
              <p className="text-xs font-medium text-secondary">
                Source: {target.sourceType}
              </p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {isPinned ? (
                <TbPinnedFilled size={20} className="icon-btn cursor-pointer" onClick={onPinTarget} />
              ) : (
                <TbPinned size={20} className="icon-btn cursor-pointer" onClick={onPinTarget} />
              )}
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer">
                  <MoreVertical size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Menu</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <button onClick={onEdit} className="flex items-center gap-2">
                      <Edit /> Edit
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={onDelete} className="flex items-center gap-2">
                      <Trash /> Delete
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="md:mt-3 my-4">
        <ScrollArea className="h-24 w-full p-2">
          <p className="text-sm leading-relaxed text-primary whitespace-pre-wrap">
            {target.description}
          </p>
        </ScrollArea>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2 gap-4">
        <ProgressBar progress={target.progress || 0} width={160} />
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
              <p className="text-xs text-gray-500">Click to open in a new tab.</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}