import { Clock, Zap, AlertCircle } from "lucide-react";

interface ResultCardProps {
  minutes: number;
  label: string;
  type?: "productive" | "distraction";
}

export const ResultCard = ({
  minutes,
  label,
  type = "productive",
}: ResultCardProps) => {
  
  const Icon = type === "distraction" ? AlertCircle : Zap;

  return (
    <div className="w-full border shadow-md p-4 rounded-2xl space-y-4">
      <Icon size={30} />
      <h1 className="text-lg font-bold">{label}</h1>
      <p>Total time spent on {label.toLowerCase()}</p>
      <div className="flex items-end justify-end">
        <div className="flex items-center gap-2 py-2 px-4 bg-secondary text-accent rounded-full">
          <Clock size={18} />
          <p className="text-sm font-medium">{minutes} Min</p>
        </div>
      </div>
    </div>
  );
}