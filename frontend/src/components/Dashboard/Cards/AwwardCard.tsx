import { FaArrowTrendUp } from "react-icons/fa6";
import { RiAwardFill } from "react-icons/ri";

interface AwwardCardProps { skill: number }

export const AwwardCard = ({ skill }: AwwardCardProps) => {
  return (
    <div className="bg-secondary px-4 py-8 rounded-2xl text-accent flex justify-center shadow-md w-full">
      <div className="flex flex-col items-center justify-center gap-6">
        <RiAwardFill size={80} />
        <h1 className="text-lg font-semibold text-center">Total potantial skill progress</h1>
        <div className="flex items-center justify-center px-4 py-2 bg-accent text-primary rounded-full gap-4 w-fit">
            <FaArrowTrendUp size={24} />
            <h1 className="font-bold">{skill}%</h1>
        </div>
      </div>
    </div>
  );
}