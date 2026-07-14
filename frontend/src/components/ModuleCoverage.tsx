type Props = {
    modules: Record<string, number>;
  };
  
  export default function ModuleCoverage({
    modules,
  }: Props) {
  
    const values = Object.values(modules);
  
    const max = values.length
      ? Math.max(...values)
      : 1;
  
    return (
  
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
  
        <h2 className="text-xl font-bold mb-6">
  
          Coverage by Module
  
        </h2>
  
        <div className="space-y-5">
  
          {Object.entries(modules).map(([name, count]) => (
  
            <div key={name}>
  
              <div className="flex justify-between mb-2">
  
                <span>{name}</span>
  
                <span>{count}</span>
  
              </div>
  
              <div className="h-3 bg-slate-200 rounded-full">
  
                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{
                    width: `${(count / max) * 100}%`,
                  }}
                />
  
              </div>
  
            </div>
  
          ))}
  
        </div>
  
      </div>
  
    );
  }