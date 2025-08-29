
import type { DateRange } from "react-day-picker";
import { useState, useMemo, useEffect } from "react";
import { format, eachDayOfInterval } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import RangeCalendarForm from "../Forms/RangeCalenderForm";

type TimePickerProps = {
  onDaySelect?: (day: Date | null) => void;
  label: string;
};

export default function TimePicker({ onDaySelect, label }: TimePickerProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activeDay, setActiveDay] = useState<Date | null>(null);

  const days = useMemo(() => {
    if (dateRange?.from && dateRange?.to) {
      return eachDayOfInterval({
        start: dateRange.from,
        end: dateRange.to,
      });
    }
    return [];
  }, [dateRange]);

  useEffect(() => {
    if (!dateRange?.from || !dateRange?.to) {
      setActiveDay(null);
      onDaySelect?.(null);
    }
  }, [dateRange, onDaySelect]);

  const handleDayClick = (day: Date) => {
    if (activeDay && format(activeDay, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")) {
      setActiveDay(null);
      onDaySelect?.(null);
    } else {
      setActiveDay(day);
      onDaySelect?.(day);
    }
  };

  const handleDateRangeChange = (val: DateRange | undefined) => {
    setDateRange(val);
    if (!val?.from || !val?.to) {
      setActiveDay(null);
      onDaySelect?.(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-xl font-bold">Your {label}!</h1>
          <p className="font-medium">
            {dateRange?.from && dateRange?.to
              ? `${format(dateRange.from, "dd MMM yyyy")} - ${format(
                  dateRange.to,
                  "dd MMM yyyy"
                )}`
              : "Select a date range"}
          </p>
        </div>
        <div>
          <RangeCalendarForm
            value={dateRange}
            setValue={handleDateRangeChange}
          />
        </div>
      </div>

      <Separator className="bg-primary" />

      <div className="flex items-center justify-center py-3.5">
        {days.length === 0 ? (
          <div className="w-full flex items-center gap-3 py-3 rounded-2xl bg-white">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary text-white">
              <CalendarIcon size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 tracking-wide leading-tight">
                Overview
              </p>
              <h2 className="font-semibold text-xl text-primary leading-tight">
                Your All {label}
              </h2>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-1 md:gap-2.5 overflow-x-hidden px-2 whitespace-nowrap">
            {days.map((day, i) => {
              const isActive =
                activeDay &&
                format(activeDay, "yyyy-MM-dd") === format(day, "yyyy-MM-dd");
              return (
                <div
                  key={i}
                  className="space-y-1 md:space-y-2 flex flex-col items-center cursor-pointer flex-shrink-0"
                  onClick={() => handleDayClick(day)}
                >
                  <h1 className="font-medium text-xs md:text-sm">{format(day, "EEE")}</h1>
                  <p
                    className={`px-2.5 md:px-3 py-2 md:py-2.5 text-xs md:text-sm rounded-full border-2 border-primary font-medium 
                      hover:bg-primary hover:text-accent transition-colors
                      ${isActive ? "bg-primary text-accent" : ""}`}
                  >
                    {format(day, "dd")}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        {activeDay ? (
          <>
            <h1 className="font-bold text-lg">{format(activeDay, "EEEE")}</h1>
            <h1 className="font-medium text-secondary">
              {format(activeDay, "dd MMMM")}
            </h1>
          </>
        ) : (
          <p className="text-primary font-semibold text-lg">All {label}</p>
        )}
      </div>
    </div>
  );
}