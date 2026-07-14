type Props = {
    quality: any[];
  };
  
  export default function QualityScore({
    quality,
  }: Props) {
  
    if (!quality.length)
      return null;
  
    const avg = Math.round(
  
      quality.reduce(
        (s, q) => s + q.quality_score,
        0
      ) / quality.length
  
    );
  
    return (
  
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
  
        <h2 className="text-xl font-bold">
  
          Requirement Quality
  
        </h2>
  
        <div className="text-6xl font-bold text-green-600 mt-8">
  
          {avg}
  
        </div>
  
        <p className="text-slate-500 mt-3">
  
          Average AI Quality Score
  
        </p>
  
      </div>
  
    );
  }