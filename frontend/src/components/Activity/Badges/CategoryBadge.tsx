import {
  Dumbbell,
  Brain,
  Briefcase,
  BookOpen,
  MoreHorizontal,
  Instagram,
  Facebook,
  Youtube,
  Gamepad2,
} from "lucide-react";
import { TbBrandTiktok } from "react-icons/tb";

export const CATEGORY_ICONS = {
  exercise: Dumbbell,
  learning: Brain,
  work: Briefcase,
  reading: BookOpen,
  others: MoreHorizontal,

  tiktok: TbBrandTiktok,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  game: Gamepad2,
};

interface CategoryBadgeProps {
  category: keyof typeof CATEGORY_ICONS | string;
  iconSize?: number;
  variant?: "default" | "transparent";
}

export const CategoryBadge = ({
  category,
  iconSize = 18,
  variant = "default",
}: CategoryBadgeProps) => {
  const baseStyle =
    variant === "transparent"
      ? "flex items-center"
      : "px-2 py-1 text-sm rounded-full bg-gray-100 flex items-center";

  const Icon =
    CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] ?? MoreHorizontal;

  return (
    <span className={baseStyle}>
      <Icon size={iconSize} className="inline mr-1" />
    </span>
  );
};