import { Plus } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

interface Props {
  onAdd: () => void;
}

export const ActivityHeader = ({ onAdd }: Props) => {
  const auth = useContext(AuthContext);
  const userName = auth?.user?.name || 'Guest';

  return (
    <div className="col-span-1 md:col-span-8 md:row-span-2 bg-secondary rounded-2xl h-fit">
      <div className="flex flex-col md:flex-row items-center justify-between h-full px-4 md:px-8 py-4 gap-4">
        <div className="space-y-4 w-full md:w-auto">
          <div>
            <h1 className="font-bold text-xl md:text-2xl text-accent">Hi, {userName}</h1>
            <p className="text-accent">Let's log your activity today.</p>
          </div>
          <div
            className="flex items-center p-2 bg-accent hover:bg-accent/10 hover:text-accent rounded-full gap-6 cursor-pointer transition-colors w-full md:w-auto"
            onClick={onAdd}
          >
            <span className="p-0.5 rounded-full bg-secondary">
              <Plus className="text-accent" />
            </span>
            <button className="text-md font-bold">Add Activity</button>
          </div>
        </div>
        <img src="/assets/Activity.png" alt="Activity" className="hidden md:block w-28 md:w-36" />
      </div>
    </div>
  );
};