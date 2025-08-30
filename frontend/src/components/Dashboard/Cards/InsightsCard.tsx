import { useState, useMemo } from "react";
import { RiFocus3Fill } from "react-icons/ri";
import { BsFillBarChartFill } from "react-icons/bs";
import type { TargetData } from "@/api/targetApi";
import type { ActivityData } from "@/api/activityApi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { Clock } from "lucide-react";

interface InsightsCardProps {
  activities: ActivityData[];
  targets: TargetData[];
}

export const InsightsCard = ({
  activities,
  targets,
}: InsightsCardProps) => {
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

  const [selectedTarget, setSelectedTarget] = useState(targets[0] || null);
  const [selectedDistraction, setSelectedDistraction] = useState(
    distractionOptions[0] || null
  );

  const distractionMinutes = selectedDistraction?.minutes ?? 0;
  const topDistraction = selectedDistraction?.label ?? "—";
  const mostProductiveTarget = selectedTarget?.title ?? "—";

  const targetMinutes = selectedTarget
    ? Math.max(
        Math.floor(
          (new Date(selectedTarget.targetDone).getTime() -
            new Date().getTime()) /
            (1000 * 60)
        ),
        1
      )
    : 0;

  const hoursToComplete = Math.ceil(targetMinutes / 60);
  const percentBoost = Math.round((distractionMinutes / 60) * 100);

  return (
    <div className="p-4 border border-gray-100 rounded-2xl shadow-md space-y-4 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-xl font-bold">Productivity Insights</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select
            value={selectedTarget?._id || ""}
            onValueChange={(id) =>
              setSelectedTarget(targets.find((t) => t._id === id) || targets[0])
            }
          >
            <SelectTrigger>
              <span>{selectedTarget?.title || "Select Target"}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Target</SelectLabel>
                {targets.map((t) => (
                  <SelectItem key={t._id} value={t._id!}>
                    {t.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={selectedDistraction?.id || ""}
            onValueChange={(id) =>
              setSelectedDistraction(
                distractionOptions.find((d) => d.id === id) ||
                  distractionOptions[0]
              )
            }
          >
            <SelectTrigger>
              <span>{selectedDistraction?.label || "Select Distraction"}</span>
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

      <div className="p-4 border border-gray-100 rounded-2xl shadow-md space-y-2">
        <div className="flex items-center gap-2">
          <Clock size={28} />
          <h1 className="text-xl font-bold">Time Conversion</h1>
        </div>
        <p>
          By reducing your distraction time by just{" "}
          <b>{distractionMinutes} minutes</b>, you could boost your learning
          efficiency by <b>{percentBoost}%</b>.
        </p>
      </div>

      <div className="p-4 border border-gray-100 rounded-2xl shadow-md space-y-2">
        <div className="flex items-center gap-2">
          <RiFocus3Fill size={28} />
          <h1 className="text-xl font-bold">Focus Recommendation</h1>
        </div>
        <p>
          Your most time-consuming distraction is <b>{topDistraction}</b>,
          taking up a big part of your day. Try setting a daily limit to keep it
          under control.
        </p>
      </div>

      <div className="p-4 border border-gray-100 rounded-2xl shadow-md space-y-2">
        <div className="flex items-center gap-2">
          <BsFillBarChartFill size={28} />
          <h1 className="text-xl font-bold">Next Step</h1>
        </div>
        <p>
          {mostProductiveTarget ? (
            <>
              Focus on <b>{mostProductiveTarget}</b> first, which requires about{" "}
              <b>{hoursToComplete} hours</b> of dedicated effort to achieve your mastery and long-term success.
            </>
          ) : (
            "Set a clear learning target to focus your efforts and maintain consistent progress."
          )}
        </p>
      </div>
    </div>
  );
}