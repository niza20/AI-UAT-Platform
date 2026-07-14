type Props = {

    quality:any;
    
    testcases:any[];
    
    scenarios:any[];
    
    };
    
    export default function RequirementMetrics({
    
    quality,
    
    testcases,
    
    scenarios,
    
    }:Props){
    
    return(
    
    <div className="grid grid-cols-3 gap-4">
    
    <Card
    
    title="Quality"
    
    value={quality?.quality_score||0}
    
    />
    
    <Card
    
    title="Scenarios"
    
    value={scenarios.length}
    
    />
    
    <Card
    
    title="Test Cases"
    
    value={testcases.length}
    
    />
    
    </div>
    
    )
    
    }
    
    function Card({
    
    title,
    
    value,
    
    }:{
    
    title:string;
    
    value:any;
    
    }){
    
    return(
    
    <div className="bg-white rounded-xl border p-5">
    
    <div className="text-slate-500">
    
    {title}
    
    </div>
    
    <div className="text-3xl font-bold mt-3">
    
    {value}
    
    </div>
    
    </div>
    
    )
    
    }