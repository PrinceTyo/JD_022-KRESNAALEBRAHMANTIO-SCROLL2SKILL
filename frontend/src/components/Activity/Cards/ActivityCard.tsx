import { Pencil, Trash, Clock } from "lucide-react";
import { CATEGORY_ICONS } from "@/components/Activity/Badges/CategoryBadge";
import React from "react";
import type { ActivityData } from "@/api/activityApi";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ActivityCardProps {
  activity: ActivityData;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ActivityCard = ({
  activity,
  onEdit,
  onDelete,
}: ActivityCardProps) => {
  const icon =
    CATEGORY_ICONS[activity.category as keyof typeof CATEGORY_ICONS] ??
    CATEGORY_ICONS.others;

  return (
    <div className="relative mb-6">
      <div className="absolute left-[-30px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-white shadow-md"></div>

      <div className="border border-gray-100 shadow-md p-4 rounded-2xl bg-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {icon && React.createElement(icon, { size: 32 })}
            <div className="leading-none">
              <h1 className="text-md font-bold">{activity.title}</h1>
              <p
                className="text-sm font-semibold"
                style={{
                  color: activity.type === "productive" ? "#10B981" : "#FF3D3D",
                }}
              >
                #{activity.type}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <button
              onClick={onEdit}
              className="p-1.5 rounded-full bg-secondary text-accent"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 rounded-full bg-[#FF3D3D] text-accent"
            >
              <Trash size={15} />
            </button>
          </div>
        </div>

        <div>
          <ScrollArea className="h-20 w-full p-2">
            <p className="text-xs whitespace-pre-wrap">{activity.description}</p>
          </ScrollArea>
          {activity.tags && (
            <div className="flex flex-wrap gap-1 mt-1">
              {activity.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end mt-4">
          <div className="flex items-center gap-1 rounded-full px-4 py-2 bg-secondary text-accent">
            <Clock size={16} />
            <p className="text-xs">{activity.timeSpent} Min</p>
          </div>
        </div>
      </div>
    </div>
  );
}