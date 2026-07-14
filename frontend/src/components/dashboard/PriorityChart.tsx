import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

type Props = {
    priorities: Record<string, number>;
};

export default function PriorityChart({
    priorities,
}: Props) {

    const data = Object.entries(priorities || {}).map(
        ([priority, count]) => ({
            priority,
            count,
        })
    );

    if (data.length === 0) {

        return (

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

                <h2 className="text-xl font-bold mb-6">

                    🔥 Test Case Priority

                </h2>

                <p className="text-slate-500">

                    No priority analytics available.

                </p>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

            <h2 className="text-xl font-bold mb-6">

                🔥 Test Case Priority

            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <BarChart data={data}>

                    <XAxis dataKey="priority" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="count"
                        radius={[8, 8, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}