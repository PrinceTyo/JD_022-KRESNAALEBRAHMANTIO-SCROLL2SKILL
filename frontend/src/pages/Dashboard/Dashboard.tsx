import { AwwardCard } from "@/components/Dashboard/Cards/AwwardCard";
import { CompareTarDisCard } from "@/components/Dashboard/Cards/CompareTarDisCard";
import { ComplateRateCard } from "@/components/Dashboard/Cards/ComplateRateCard";
import { InsightsCard } from "@/components/Dashboard/Cards/InsightsCard";
import { ResultCard } from "@/components/Dashboard/Cards/ResultCard";
import { TimePicker } from "@/components/Shared/Cards/TimePicker";
import { useEffect, useMemo, useState } from "react";
import type { ActivityData } from "@/api/activityApi";
import type { TargetData } from "@/api/targetApi";
import { activityApi } from "@/api/activityApi";
import { targetApi } from "@/api/targetApi";
import { isSameDay, parseISO } from "date-fns";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function Dashboard() {
  const auth = useContext(AuthContext);
  const userName = auth?.user?.name || "Guest";
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [targets, setTargets] = useState<TargetData[]>([]);

  useEffect(() => {
    Promise.all([
      activityApi
        .getAll()
        .then((res) => (Array.isArray(res) ? res : res?.data?.data || [])),
      targetApi
        .getAll()
        .then((res) => (Array.isArray(res) ? res : res?.data?.data || [])),
    ]).then(([acts, targs]) => {
      setActivities(acts);
      setTargets(targs);
    });
  }, []);

  const filteredActs = useMemo(
    () =>
      selectedDay
        ? activities.filter((a) =>
            isSameDay(parseISO(a.createdAt || ""), selectedDay)
          )
        : activities,
    [activities, selectedDay]
  );

  const filteredTargs = useMemo(
    () =>
      selectedDay
        ? targets.filter((t) =>
            isSameDay(parseISO(t.createdAt || ""), selectedDay)
          )
        : targets,
    [targets, selectedDay]
  );

  const totalProductive = filteredActs
    .filter((a) => a.type === "productive")
    .reduce((s, a) => s + (a.timeSpent || 0), 0);
  const totalDistraction = filteredActs
    .filter((a) => a.type === "distraction")
    .reduce((s, a) => s + (a.timeSpent || 0), 0);
  const totalTarget = filteredTargs.reduce((s, t) => s + (t.progress || 0), 0);

  const productiveTargets = filteredTargs.filter(
    (t) => t.progress && t.progress > 0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-max gap-4 mb-10 p-4 md:p-0">
      <div className="col-span-1 md:col-span-8 md:row-span-3 flex flex-col md:flex-row items-center justify-between gap-6 bg-secondary shadow-md rounded-2xl text-accent px-6 py-6">
        <div>
          <p className="text-lg md:text-xl font-bold">Hi, {userName}</p>
          <p className="text-lg md:text-xl font-bold">What are your plans for today?</p>
          <p className="font-regular text-sm md:text-md">
            This website helps turn wasted time into productive skill growth.
          </p>
        </div>
        <img src="/assets/Target.png" alt="Activity" className="hidden md:block w-28 md:w-36" />
      </div>

      <div className="col-span-1 md:col-span-4 md:row-span-6 md:col-start-9 rounded-2xl shadow-md border border-gray-100 px-4 py-5">
        <TimePicker onDaySelect={setSelectedDay} label="Result" />
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <ResultCard minutes={totalProductive} label="Productive" type = "productive"/>
          <ResultCard minutes={totalDistraction} label="Distraction" type = "distraction"/>
        </div>
      </div>

      <div className="col-span-1 md:col-span-6 md:row-span-3 md:row-start-4">
        <CompareTarDisCard
          activities={filteredActs}
          targets={filteredTargs}
        />
      </div>

      <div className="col-span-1 md:col-span-2 md:row-span-3 md:col-start-7 md:row-start-4">
        <AwwardCard skill={Math.round((productiveTargets.length / (filteredTargs.length || 1)) * 100)} />
      </div>

      <div className="col-span-1 md:col-span-5 md:row-span-5 md:row-start-7">
        <ComplateRateCard data={[
          { name: "Distraction", value: totalDistraction },
          { name: "Productive", value: totalProductive },
          { name: "Target", value: totalTarget },
        ]} />
      </div>

      <div className="col-span-1 md:col-span-7 md:row-span-5 md:col-start-6 md:row-start-7">
        <InsightsCard activities={filteredActs} targets={filteredTargs} />
      </div>
    </div>
  );
}