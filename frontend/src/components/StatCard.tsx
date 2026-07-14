type Props = {
  title: string;
  value: string | number;
  color?: string;
  subtitle?: string;
};

export default function StatCard({
  title,
  value,
  color = "text-blue-600",
  subtitle,
}: Props) {
  return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">

          <p className="text-slate-500 text-sm">
              {title}
          </p>

          <h2 className={`text-4xl font-bold mt-3 ${color}`}>
              {value}
          </h2>

          {subtitle && (
              <p className="text-slate-400 text-sm mt-2">
                  {subtitle}
              </p>
          )}

      </div>
  );
}