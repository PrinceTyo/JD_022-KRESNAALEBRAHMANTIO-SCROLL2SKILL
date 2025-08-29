import React, { memo, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ActivityData } from "@/api/activityApi";
import { IoPieChartOutline } from "react-icons/io5";

export interface PieDatum {
  name: string;
  value: number;
  category?: string;
  type?: "productive" | "distraction" | string;
  color?: string;
}

export interface ProDisChartCardProps {
  data: PieDatum[];
  height?: number;
  innerRadius?: number | string;
  outerRadius?: number | string;
  donut?: boolean;
  showLegend?: boolean;
  legendPosition?: "left" | "right";
  showTooltip?: boolean;
  colors?: string[];
  valueFormatter?: (v: number) => string;
  onSliceClick?: (d: PieDatum, index: number) => void;
  centerTotalLabel?: boolean | ((total: number) => React.ReactNode);
  filterCategory?: string;
  filterType?: string;
}

const DEFAULT_COLORS = [
  "#4F46E5",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
];

const PRODUCTIVE_CATEGORIES = [
  "exercise",
  "learning",
  "work",
  "reading",
  "others",
];
const DISTRACTION_CATEGORIES = [
  "tiktok",
  "instagram",
  "facebook",
  "youtube",
  "game",
  "others",
];

const DefaultTooltip = ({ active, payload }: any) =>
  active && payload?.length ? (
    <div className="rounded-md border bg-white p-2 shadow-sm text-xs">
      <div className="font-semibold" style={{ color: payload[0].fill }}>
        {payload[0].name}
      </div>
      <div>Value: {payload[0].value}</div>
    </div>
  ) : null;

export function getNormalizedChartData(
  activities: ActivityData[],
  type: "productive" | "distraction"
): PieDatum[] {
  const grouped: Record<string, number> = {};
  activities
    .filter((a) => a.type === type)
    .forEach((a) => {
      const cat = a.category?.toLowerCase() || "others";
      grouped[cat] = (grouped[cat] || 0) + (a.timeSpent || 0);
    });

  const categories =
    type === "productive" ? PRODUCTIVE_CATEGORIES : DISTRACTION_CATEGORIES;

  return categories.map((cat) => ({
    name: cat,
    value: grouped[cat] || 0,
    type,
  }));
}

function ProDisChartCard({
  data,
  height = 260,
  innerRadius,
  outerRadius = "80%",
  donut = true,
  showLegend = true,
  showTooltip = true,
  colors = DEFAULT_COLORS,
  legendPosition = "left",
  filterCategory,
  filterType,
}: ProDisChartCardProps) {
  const filteredData = useMemo(() => {
    let d = data;
    if (filterCategory)
      d = d.filter(
        (d) => d.category?.toLowerCase() === filterCategory.toLowerCase()
      );
    if (filterType)
      d = d.filter((d) => d.type?.toLowerCase() === filterType.toLowerCase());
    return d;
  }, [data, filterCategory, filterType]);

  const computedInnerRadius =
    donut && innerRadius === undefined ? "55%" : innerRadius;

  const totalValue = useMemo(
    () => filteredData.reduce((sum, d) => sum + (d.value || 0), 0),
    [filteredData]
  );

  return totalValue === 0 ? (
    <div
      className="flex flex-col w-full items-center justify-center bg-white text-gray-500 space-y-2"
      style={{ height }}
    >
      <IoPieChartOutline size={50} />
      <p className="text-xl font-semibold">No data</p>
    </div>
  ) : (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="120%">
        <PieChart>
          {showTooltip && <Tooltip content={<DefaultTooltip />} />}
          {showLegend && (
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align={legendPosition === "right" ? "right" : "left"}
              iconType="circle"
              content={() => (
                <ul className="space-y-4 text-sm hidden lg:block">
                  {filteredData.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: colors[idx % colors.length] }}
                      />
                      <span className="text-lg font-medium text-primary">
                        {item.name}: {item.value} min
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            />
          )}

          <Pie
            data={filteredData}
            dataKey="value"
            nameKey="name"
            cx={window.innerWidth >= 1024 && legendPosition === "left" ? "65%" : window.innerWidth >= 1024 && legendPosition === "right" ? "35%" : "50%"}
            innerRadius={computedInnerRadius}
            outerRadius={outerRadius}
            paddingAngle={1}
            labelLine={false}
            label={false}
          >
            {filteredData.map((entry, i) => (
              <Cell
                key={`slice-${entry.name}-${i}`}
                fill={entry.color || colors[i % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(ProDisChartCard);