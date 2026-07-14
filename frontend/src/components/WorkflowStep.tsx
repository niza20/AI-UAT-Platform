type Props = {
    title: string;
    active?: boolean;
  };
  
  export default function WorkflowStep({
    title,
    active = true,
  }: Props) {
    return (
      <div className="flex items-center gap-4">
  
        <div
          className={`h-4 w-4 rounded-full ${
            active
              ? "bg-green-500"
              : "bg-slate-300"
          }`}
        />
  
        <span className="text-slate-700">
  
          {title}
  
        </span>
  
      </div>
    );
  }