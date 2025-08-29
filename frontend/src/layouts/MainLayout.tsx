import { Separator } from "@/components/ui/separator";
import { Outlet, useLocation } from "react-router-dom";
import { HomeIcon, Activity, Target } from "lucide-react";

const getPageInfo = (pathname: string) => {
  const routes: Record<string, { title: string; icon: any }> = {
    "/": { title: "Dashboard", icon: HomeIcon },
    "/activity": { title: "Activity", icon: Activity },
    "/target": { title: "Target", icon: Target },
    "/profile": { title: "Profile", icon: HomeIcon },
  };
  return routes[pathname] || { title: "Dashboard", icon: HomeIcon };
};

export default function MainLayout() {
  const location = useLocation();
  const pageInfo = getPageInfo(location.pathname);
  const PageIcon = pageInfo.icon;

  return (
    <div className="flex h-screen">
      <main className="flex flex-col gap-4 px-4 pt-3 flex-1 overflow-hidden">
        <div className="hidden md:flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
            <PageIcon className="h-5 w-5 text-accent" />
          </div>
          <h1 className="text-2xl font-bold">{pageInfo.title}</h1>
        </div>
        
        <div className="flex md:hidden justify-center">
          <h1 className="text-xl font-bold">{pageInfo.title}</h1>
        </div>

        <Separator />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}