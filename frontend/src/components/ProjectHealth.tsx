type Props = {
    analytics: any;
    quality: any[];
};

export default function ProjectHealth({
    analytics,
    quality,
}: Props) {

    const summary = analytics.summary || {};

    const avgQuality =
        quality.length > 0
            ? Math.round(
                  quality.reduce(
                      (a: number, b: any) => a + b.quality_score,
                      0
                  ) / quality.length
              )
            : 0;

    let health = "Excellent";

    if (avgQuality < 90) health = "Good";
    if (avgQuality < 80) health = "Average";
    if (avgQuality < 70) health = "Poor";

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">
                ❤️ Project Health
            </h2>

            <div className="space-y-5">
                <Metric
                    label="Coverage"
                    value={`${summary.coverage || 0}%`}
                />

                <Metric
                    label="Average Quality"
                    value={`${avgQuality}/100`}
                />

                <Metric
                    label="Overall Health"
                    value={health}
                />
            </div>
        </div>
    );
}

function Metric({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex justify-between">
            <span>{label}</span>
            <span className="font-semibold">{value}</span>
        </div>
    );
}