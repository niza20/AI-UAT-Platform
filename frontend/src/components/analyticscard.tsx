type Props = {
    title: string;
    value: string | number;
    subtitle?: string;
    color?: string;
  };
  
  export default function AnalyticsCard({
    title,
    value,
    subtitle,
    color = "text-blue-600",
  }: Props) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition">
  
        <p className="text-sm text-slate-500">
          {title}
        </p>
  
        <h2 className={`text-5xl font-bold mt-4 ${color}`}>
          {value}
        </h2>
  
        {subtitle && (
          <p className="mt-3 text-sm text-slate-500">
            {subtitle}
          </p>
        )}
  
      </div>
    );
  }