type Props = {
    file: File | null;
    loading: boolean;
    stage: string;
    onSelect: (file: File) => void;
    onUpload: () => void;
  };
  
  export default function UploadCard({
    file,
    loading,
    stage,
    onSelect,
    onUpload,
  }: Props) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm">
  
        <div className="border-2 border-dashed border-blue-300 rounded-3xl bg-slate-50 p-14 text-center">
  
          <div className="text-7xl mb-4">
            📄
          </div>
  
          <h2 className="text-3xl font-bold">
  
            Upload Business Requirement Document
  
          </h2>
  
          <p className="text-slate-500 mt-3">
  
            PDF • DOC • DOCX
  
          </p>
  
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="mt-8 w-full rounded-xl border bg-white p-4"
            onChange={(e) => {
              if (e.target.files?.length) {
                onSelect(e.target.files[0]);
              }
            }}
          />
  
          {file && (
            <div className="mt-6 rounded-xl bg-green-50 border border-green-200 p-4">
  
              <div className="font-semibold text-green-700">
  
                ✅ {file.name}
  
              </div>
  
              <div className="text-sm text-slate-500">
  
                Ready for AI processing
  
              </div>
  
            </div>
          )}
  
          {loading && (
            <div className="mt-8">
  
              <div className="flex justify-between text-sm">
  
                <span>{stage}</span>
  
                <span>AI Working...</span>
  
              </div>
  
              <div className="h-3 bg-slate-200 rounded-full mt-3 overflow-hidden">
  
                <div className="h-3 bg-blue-600 animate-pulse w-full" />
  
              </div>
  
            </div>
          )}
  
          <button
            onClick={onUpload}
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-4 font-semibold transition"
          >
            {loading ? "Generating..." : "🚀 Generate AI Test Cases"}
          </button>
  
        </div>
  
      </div>
    );
  }