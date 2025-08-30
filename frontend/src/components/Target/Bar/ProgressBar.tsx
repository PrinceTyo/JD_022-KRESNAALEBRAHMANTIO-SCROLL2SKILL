interface ProgressBarProps {
  progress: number;
  width?: number;
}

export const ProgressBar = ({ progress, width }: ProgressBarProps) => {
  return (
      <div>
        <div>
          <p className="text-sm font-semibold">Progress</p>
        </div>
        <div className="bg-primary rounded-full h-2 overflow-hidden" style={{ width: `${width}px` }}>
          <div
            className="bg-white h-1 rounded-full transition-all duration-500 mt-0.5 ml-0.5"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex items-end justify-end">
          <p className="text-sm font-semibold">{progress}%</p>
        </div>
      </div>
  );
}