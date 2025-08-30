import { Youtube, BookOpen, HelpCircle } from "lucide-react";
import type { JSX } from "react";

interface SourceIconBadgeProps {
  type?: string;
  size?: number;
  className?: string;
}

export const SourceIconBadge = ({
  type,
  size = 40,
  className,
}: SourceIconBadgeProps) => {
  const iconMap: Record<string, JSX.Element> = {
    youtube: <Youtube size={size} className={className} />,
    course:  <BookOpen size={size} className={className} />,
    others:  <HelpCircle size={size} className={className} />,
  };
  return iconMap[type?.toLowerCase() || "others"];
}