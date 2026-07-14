type Props = {
    modules: {
        module: string;
        count: number;
    }[];
};

export default function ModuleChart({

    modules,

}: Props) {

    const max = Math.max(
        ...modules.map(m => m.count),
        1
    );

    return (

        <div className="bg-white rounded-2xl border shadow-sm p-6">

            <h2 className="text-2xl font-bold mb-6">

                🧩 Detected Business Modules

            </h2>

            <div className="space-y-6">

                {modules.map((m) => (

                    <div key={m.module}>

                        <div className="flex justify-between mb-2">

                            <span className="font-medium">

                                {m.module}

                            </span>

                            <span>

                                {m.count}

                            </span>

                        </div>

                        <div className="w-full h-3 bg-slate-200 rounded-full">

                            <div

                                className="h-3 bg-blue-600 rounded-full"

                                style={{

                                    width: `${(m.count / max) * 100}%`

                                }}

                            />

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}