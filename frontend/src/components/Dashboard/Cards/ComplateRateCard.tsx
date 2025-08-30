import { IoPieChartOutline } from "react-icons/io5";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ComplateRateCardProps {
  data: { name: string; value: number }[];
}

export const ComplateRateCard = ({ data }: ComplateRateCardProps) => {
  const COLORS = ["#ef4444", "#22c55e", "#3b82f6"];

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="flex flex-wrap gap-6 justify-center mt-5">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-md font-medium">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  const totalValue = data.reduce((sum, d) => sum + (d.value || 0), 0);

  return (
    <div className="p-4 border border-gray-100 rounded-2xl shadow-md w-full">
      <h1 className="text-xl font-bold mb-6 mt-0.5">Completion Rate</h1>

      <div className="h-96 mt-4 flex items-center justify-center">
        {data.length === 0 || totalValue === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500">
            <IoPieChartOutline size={50} />
            <p className="text-xl font-semibold">No data</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="80%"
                outerRadius="100%"
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number | string) =>
                  `${Math.round(
                    typeof value === "number" ? value : parseFloat(value)
                  )} Minutes`
                }
              />
              <Legend content={renderLegend} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}