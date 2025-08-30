import { Youtube, BookOpen, HelpCircle } from "lucide-react";
import type { TargetData } from "@/api/targetApi";

const sourceOptions = [
    { value: "youtube", label: "Youtube", icon: Youtube, color: "rose" },
    { value: "course", label: "Course", icon: BookOpen, color: "sky" },
    { value: "others", label: "Others", icon: HelpCircle, color: "gray" },
] as const;

const colorMap = {
    rose: { border: "border-rose-500", bg: "bg-rose-50", text: "text-rose-700", hover: "hover:border-rose-300" },
    sky: { border: "border-sky-500", bg: "bg-sky-50", text: "text-sky-700", hover: "hover:border-sky-300" },
    gray: { border: "border-gray-500", bg: "bg-gray-50", text: "text-gray-700", hover: "hover:border-gray-300" },
};

interface SourceTypeInputProps {
  sourceType: TargetData["sourceType"];
  setSourceType: (v: TargetData["sourceType"]) => void;
}

export const SourceTypeInput = ({ sourceType, setSourceType }: SourceTypeInputProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
        Source Type
      </label>

      <div className="grid grid-cols-2 gap-3">
        {sourceOptions.map((opt) => {
          const isSelected = sourceType === opt.value;
          const c = colorMap[opt.color];

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => setSourceType(opt.value)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                isSelected
                  ? `${c.border} ${c.bg} ${c.text} shadow-lg`
                  : `border-gray-200 bg-white/80 text-gray-600 ${c.hover} backdrop-blur-sm`
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <opt.icon
                  className={`w-5 h-5 ${isSelected ? c.text : "text-gray-400"}`}
                />
                <span className="font-semibold text-sm">{opt.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}