import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DateRange } from "react-day-picker";
import { differenceInDays } from "date-fns";
import toast from "react-hot-toast";

type RangeCalendarFormProps = {
  value: DateRange | undefined;
  setValue: (value: DateRange | undefined) => void;
};

export default function RangeCalendarForm({
  value,
  setValue,
}: RangeCalendarFormProps) {
  const handleSelect = (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) {
      setValue(undefined);
      return;
    }

    const diff = differenceInDays(range.to, range.from);
    if (diff > 6) {
      toast.error("Maximum limit of 7 days");
      return;
    }

    setValue(range);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl p-2 w-10 h-10"
        >
          <CalendarIcon className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="range"
          selected={value}
          captionLayout="dropdown"
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
}