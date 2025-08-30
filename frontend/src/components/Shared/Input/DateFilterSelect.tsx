import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateFilterSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const DateFilterSelect = ({ value, onValueChange }: DateFilterSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Pick Date" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Time</SelectItem>
        <SelectItem value="today">Today</SelectItem>
        <SelectItem value="week">This Week</SelectItem>
        <SelectItem value="year">This Year</SelectItem>
      </SelectContent>
    </Select>
  );
}