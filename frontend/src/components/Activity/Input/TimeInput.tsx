import { Calendar } from "lucide-react";

interface TimeInputProps {
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
  setStartHour: (v: string) => void;
  setStartMinute: (v: string) => void;
  setEndHour: (v: string) => void;
  setEndMinute: (v: string) => void;
}

const hourOptions = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
const minuteOptions = ["00", "15", "30", "45"];

export const TimeInput = ({
  startHour, startMinute, endHour, endMinute,
  setStartHour, setStartMinute, setEndHour, setEndMinute
}: TimeInputProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <Calendar className="w-4 h-4 text-secondary" />
        Time Range
      </label>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="text-center">
            <div className="text-lg font-bold text-slate-700 bg-gray-50 rounded-lg p-2 backdrop-blur-sm">
              {startHour}:{startMinute}
            </div>
            <div className="text-xs text-slate-500 mt-1">Start Time</div>
          </div>
          <div className="flex gap-2">
            <select
              value={startHour}
              onChange={(e) => setStartHour(e.target.value)}
              className="flex-1 h-12 p-2 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              {hourOptions.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
            <select
              value={startMinute}
              onChange={(e) => setStartMinute(e.target.value)}
              className="flex-1 h-12 p-2 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              {minuteOptions.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-center">
            <div className="text-lg font-bold text-slate-700 bg-gray-50 rounded-lg p-2 backdrop-blur-sm">
              {endHour}:{endMinute}
            </div>
            <div className="text-xs text-slate-500 mt-1">End Time</div>
          </div>
          <div className="flex gap-2">
            <select
              value={endHour}
              onChange={(e) => setEndHour(e.target.value)}
              className="flex-1 p-2 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              {hourOptions.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
            <select
              value={endMinute}
              onChange={(e) => setEndMinute(e.target.value)}
              className="flex-1 p-2 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              {minuteOptions.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}