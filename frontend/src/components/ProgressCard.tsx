type Props = {
    loading: boolean;
    stage: string;
  };
  
  const stages = [
    "Uploading BRD",
    "Parsing Document",
    "Extracting Requirements",
    "Generating Questions",
    "Generating Test Cases",
    "Preparing Dashboard",
  ];
  
  export default function ProgressCard({
    loading,
    stage,
  }: Props) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
  
        <div className="flex justify-between items-center">
  
          <h2 className="text-xl font-bold">
  
            AI Processing
  
          </h2>
  
          <span className="text-blue-600 font-semibold">
  
            {loading ? "Running" : "Idle"}
  
          </span>
  
        </div>
  
        <div className="mt-8 space-y-5">
  
          {stages.map((item) => {
  
            const active = stage === item;
  
            return (
  
              <div
                key={item}
                className="flex items-center gap-4"
              >
  
                <div
                  className={`h-4 w-4 rounded-full ${
                    active
                      ? "bg-blue-600"
                      : "bg-slate-300"
                  }`}
                />
  
                <div className="flex-1">
  
                  <div className="font-medium">
  
                    {item}
  
                  </div>
  
                  {active && (
  
                    <div className="h-2 mt-2 rounded-full bg-slate-200 overflow-hidden">
  
                      <div className="h-2 w-full bg-blue-600 animate-pulse" />
  
                    </div>
  
                  )}
  
                </div>
  
              </div>
  
            );
  
          })}
  
        </div>
  
      </div>
    );
  }