import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { IoPieChartOutline } from "react-icons/io5";
import { ScrollArea } from "@/components/ui/scroll-area";

const stableColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 100%, 50%)`;
};

interface TargetProgressCardProps {
  targets: { name: string; value: number }[];
}

export const TargetProgressCard = ({ targets }: TargetProgressCardProps) => {
  const validTargets = targets.filter(
    (target) => target.name && typeof target.value === "number"
  );

  const colors = validTargets.map((t) => stableColor(t.name));

  return (
    <div className="p-4 bg-white rounded-2xl">
      {validTargets.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-2 text-gray-500 h-64">
          <IoPieChartOutline size={60} />
          <p className="font-semibold text-xl">No progress data available</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4">
          <div className="w-full md:w-72 h-72 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={validTargets}
                  cx="50%"
                  cy="50%"
                  outerRadius="100%"
                  innerRadius="75%"
                  dataKey="value"
                >
                  {validTargets.map((_, index) => (
                    <Cell key={index} fill={colors[index]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number | string) =>
                    `${Math.round(typeof value === "number" ? value : parseFloat(value))}%`
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <ScrollArea className="w-full md:w-72 h-72 p-2">
            <div className="flex flex-col gap-3">
              {validTargets.map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full shrink-0"
                    style={{ backgroundColor: colors[i] }}
                  />
                  <span className="text-md font-medium">{t.name}</span>
                  <span className="text-sm text-gray-600 ml-auto">
                    {t.value.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}