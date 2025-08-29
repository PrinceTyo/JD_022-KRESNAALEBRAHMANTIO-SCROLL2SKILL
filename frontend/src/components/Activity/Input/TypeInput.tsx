import { Zap, AlertCircle } from "lucide-react";

interface Props {
  type: "productive" | "distraction";
  setType: (v: "productive" | "distraction") => void;
}

export default function TypeInput({ type, setType }: Props) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
        Activity Type
      </label>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setType("productive")}
          className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
            type === "productive" 
              ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-lg" 
              : "border-gray-200 bg-white/80 text-gray-600 hover:border-emerald-300 backdrop-blur-sm"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Zap className={`w-5 h-5 ${type === "productive" ? "text-emerald-600" : "text-gray-400"}`} />
            <span className="font-semibold text-sm">Productive</span>
          </div>
        </button>
        <button
          type="button"
          onClick={() => setType("distraction")}
          className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
            type === "distraction" 
              ? "border-red-500 bg-red-50 text-red-700 shadow-lg" 
              : "border-gray-200 bg-white/80 text-gray-600 hover:border-red-300 backdrop-blur-sm"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <AlertCircle className={`w-5 h-5 ${type === "distraction" ? "text-red-600" : "text-gray-400"}`} />
            <span className="font-semibold text-sm">Distraction</span>
          </div>
        </button>
      </div>
    </div>
  );
}