import { getInitials } from "@/utils/helper";
import { ChevronsUpDown, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

interface ProfileInfoProps {
  isOpen: boolean;
}

export const ProfileInfo = ({ isOpen }: ProfileInfoProps) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const user = auth?.user;

  const handleLogout = () => {
    auth?.logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isOpen ? (
          <div className="flex items-center px-2 py-4 rounded-lg gap-3 hover:bg-accent/20 cursor-pointer">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg font-medium text-slate-950 bg-slate-100">
              {getInitials(user.name ?? "")}
            </div>
            <div className="flex items-center space-x-7">
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs font-reguler">{user.email}</p>
              </div>
              <ChevronsUpDown />
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg font-medium text-primary bg-accent cursor-pointer hover:bg-accent/90 transition-colors">
              {getInitials(user.name ?? "")}
            </div>
          </div>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side={isOpen ? "right" : "top"}
        align={isOpen ? "start" : "center"}
        className="w-56"
      >
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-500 focus:text-red-500"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}