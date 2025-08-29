import { Clock } from "lucide-react";
import React from "react";
import { FiActivity } from "react-icons/fi";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface Activity {
  type: string;
  category: string;
  title: string;
  description: string;
  timeSpent: number;
  [key: string]: any;
}

interface QuickStatsCardProps {
  activities: Activity[];
  filterType?: "productive" | "distraction" | string;
  title?: string;
  description: string;
  primaryColor?: string;
  secondaryColor?: string;
  icon?: React.ReactNode;
}

export default function ({
  activities = [],
  filterType = "productive",
  title = "Productive",
  description,
  primaryColor = "#10B981",
  secondaryColor = "#E5E7EB",
}: QuickStatsCardProps) {
  const filteredTime = activities
    .filter(
      (a) => (a.type || "").trim().toLowerCase() === filterType.toLowerCase()
    )
    .reduce((sum, a) => sum + Number(a.timeSpent || 0), 0);

  const totalTime = activities.reduce(
    (sum, a) => sum + Number(a.timeSpent || 0),
    0
  );

  const safeTotalTime = totalTime || 1;
  const percentage = Math.round((filteredTime / safeTotalTime) * 100);

  const pieData = [
    { name: title, value: filteredTime },
    { name: "Others", value: totalTime - filteredTime },
  ];

  const COLORS = [primaryColor, secondaryColor];

  return activities.length === 0 ? (
    <div
      className="col-span-2 row-span-4 h-full rounded-2xl flex flex-col items-center justify-center p-4 gap-3 bg-white text-gray-500 "
    >
      <FiActivity size={40} />
      <p className="text-lg font-semibold">No activities yet</p>
    </div>
  ) : totalTime === 0 ? (
    <div
      className="col-span-2 row-span-4 rounded-2xl flex flex-col items-center justify-center p-4 gap-3 shadow-md bg-white "
    >
      <div className="text-gray-500 text-center">
        <p className="text-sm">No time data recorded</p>
        <p className="text-xs mt-1">Add activities with time spent</p>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24 md:w-28 md:h-28">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              innerRadius="70%"
              outerRadius="100%"
              paddingAngle={2}
            >
              {pieData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold" style={{ color: primaryColor }}>
            {percentage}%
          </span>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-lg font-bold" style={{ color: primaryColor }}>
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2 bg-secondary text-white rounded-full px-4 py-2 mt-2">
        <Clock />
        <span className="text-sm font-medium">
          {Math.floor(filteredTime / 60)}h {filteredTime % 60}min
        </span>
      </div>

      <div className="text-center text-sm text-primary mt-2">{description}</div>
    </div>
  );
}