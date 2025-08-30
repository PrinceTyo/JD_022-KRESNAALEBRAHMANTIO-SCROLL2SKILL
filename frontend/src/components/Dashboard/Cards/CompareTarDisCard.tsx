import { useState, useMemo } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import type { ActivityData } from "@/api/activityApi";
import type { TargetData } from "@/api/targetApi";
import { TbTargetOff } from "react-icons/tb";

function calculateTargetMinutes(dateString: string) {
  const now = new Date();
  const targetDate = new Date(dateString);
  const diffMs = targetDate.getTime() - now.getTime();
  return Math.max(Math.floor(diffMs / (1000 * 60)), 1);
}

interface CompareTarDisCardProps {
  activities: ActivityData[];
  targets: TargetData[];
}

export const CompareTarDisCard = ({
  activities,
  targets,
}: CompareTarDisCardProps) => {
  const availableTargets = useMemo(
    () => targets.filter((t) => (t.progress || 0) < 100),
    [targets]
  );

  const distractionSummary = useMemo(() => {
    return activities
      .filter((a) => a.type === "distraction")
      .reduce((acc, a) => {
        const key = a.category || "others";
        acc[key] = (acc[key] || 0) + (a.timeSpent || 0);
        return acc;
      }, {} as Record<string, number>);
  }, [activities]);

  const distractionOptions = Object.entries(distractionSummary).map(
    ([cat, min]) => ({
      id: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
      minutes: min,
    })
  );

  const [selectedTarget, setSelectedTarget] = useState(
    availableTargets[0] || null
  );
  const [selectedDistraction, setSelectedDistraction] = useState(
    distractionOptions[0] || null
  );

  const { pieData, percent, skill } = useMemo(() => {
    if (!selectedTarget || !selectedDistraction)
      return { pieData: [], percent: 0, skill: 0 };

    const total = calculateTargetMinutes(selectedTarget.targetDone);
    const distraction = selectedDistraction.minutes;

    const percent = Math.min(
      parseFloat(((distraction / total) * 100).toFixed(1)),
      100
    );
    const pieData = [
      { name: "Focused", value: distraction },
      { name: "Remaining Target", value: total - distraction },
    ];
    return { pieData, percent, skill: Math.round(percent * 0.5) };
  }, [selectedTarget, selectedDistraction]);

  return availableTargets.length === 0 ? (
    <div className="flex flex-col items-center justify-center border p-4 px-6 rounded-2xl shadow-md text-center text-gray-500 h-full">
      <TbTargetOff size={50} />
      <p className="text-xl font-semibold">No active target</p>
      <p className="text-sm">Add a new target to start comparing.</p>
    </div>
  ) : (
    <div className="border p-4 px-6 rounded-2xl shadow-md space-y-4 min-h-[290px]">
      <div className="block md:hidden space-y-4">
        <div className="flex justify-end">
          <Select
            value={selectedDistraction?.id || ""}
            onValueChange={(id) =>
              setSelectedDistraction(
                distractionOptions.find((d) => d.id === id) ||
                  distractionOptions[0]
              )
            }
          >
            <SelectTrigger className="bg-secondary text-white rounded-full">
              <span className="text-white">
                {selectedDistraction?.label || "Select"}
              </span>
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Distraction</SelectLabel>
                {distractionOptions.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-28 h-28 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius="70%"
                  outerRadius="100%"
                  paddingAngle={2}
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#3B82F6" : "#E5E7EB"}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-green-500">
              {percent}%
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <Select
              value={selectedTarget?._id || ""}
              onValueChange={(id) =>
                setSelectedTarget(
                  availableTargets.find((t) => t._id === id) ||
                    availableTargets[0]
                )
              }
            >
              <SelectTrigger className="border-none shadow-none text-base font-bold m-0 p-0">
                {selectedTarget?.title || "—"}
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Active Target</SelectLabel>
                  {availableTargets.map((t) => (
                    <SelectItem key={t._id} value={t._id!}>
                      {t.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <p className="leading-tight text-sm">
              Target done:{" "}
              {selectedTarget?.targetDone
                ? new Date(selectedTarget.targetDone).toLocaleDateString()
                : "—"}
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-28 h-28">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    innerRadius="70%"
                    outerRadius="100%"
                    paddingAngle={2}
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? "#3B82F6" : "#E5E7EB"}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-green-500">
                {percent}%
              </span>
            </div>

            <div>
              <Select
                value={selectedTarget?._id || ""}
                onValueChange={(id) =>
                  setSelectedTarget(
                    availableTargets.find((t) => t._id === id) ||
                      availableTargets[0]
                  )
                }
              >
                <SelectTrigger className="border-none shadow-none text-lg font-bold m-0 p-0">
                  {selectedTarget?.title || "—"}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Active Target</SelectLabel>
                    {availableTargets.map((t) => (
                      <SelectItem key={t._id} value={t._id!}>
                        {t.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <p className="leading-tight text-sm">
                Target done:{" "}
                {selectedTarget?.targetDone
                  ? new Date(selectedTarget.targetDone).toLocaleDateString()
                  : "—"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Select
              value={selectedDistraction?.id || ""}
              onValueChange={(id) =>
                setSelectedDistraction(
                  distractionOptions.find((d) => d.id === id) ||
                    distractionOptions[0]
                )
              }
            >
              <SelectTrigger className="bg-secondary text-white rounded-full">
                <span className="text-white">
                  {selectedDistraction?.label || "Select"}
                </span>
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Distraction</SelectLabel>
                  {distractionOptions.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <p>
        If you cut <b>{selectedDistraction?.minutes ?? 0} minutes</b> from{" "}
        <b>{selectedDistraction?.label ?? "—"}</b>, you'll finish{" "}
        <b>{selectedTarget?.title ?? "—"}</b>{" "}
        <b>{selectedDistraction?.minutes ?? 0} minutes sooner</b> and boost your
        skill by <b>{skill}%</b>.
      </p>

      <div className="flex justify-end">
        <div className="flex items-center px-4 py-2 text-white bg-secondary rounded-full gap-2">
          <FaArrowTrendUp />
          <p>Skill: {skill}%</p>
        </div>
      </div>
    </div>
  );
}