import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HomeIcon, Activity, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { ProfileInfo } from "@/components/Auth/Cards/ProfileInfo";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: HomeIcon, path: "/" },
    { name: "Activity", icon: Activity, path: "/activity" },
    { name: "Target", icon: Target, path: "/target" },
  ];

  const SidebarBody = () => (
    <div className="flex flex-col h-full bg-primary text-accent">
      <div className="flex items-center justify-center py-3.5">
        <Tooltip>
          <TooltipTrigger asChild>
            <img
              className="w-10 h-10 object-cover rounded-lg cursor-pointer bg-white p-2"
              src="/assets/scroll2skill.png"
              alt="Logo"
            />
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Scroll2Skill</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <Separator />

      <div className="flex-1 px-2">
        {menuItems.map(({ name, icon: Icon, path }) => (
          <div key={name} className="my-2 ms-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => navigate(path)}
                  className={`w-10 h-10 p-0 flex items-center justify-center rounded-lg transition-colors ${
                    location.pathname === path
                      ? "bg-accent/20"
                      : "hover:bg-accent/10"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </div>

      <Separator />

      <div className="py-4 flex justify-center">
        <ProfileInfo isOpen={false} />
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden md:block">
        <div className="flex flex-col h-screen w-16 bg-primary text-accent">
          <SidebarBody />
        </div>
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-2.5 left-4 z-50 bg-primary text-white"
            >
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 w-16 border-none shadow-none [&>button]:hidden"
          >
            <SidebarBody />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}