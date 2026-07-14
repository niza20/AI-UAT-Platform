export default function Topbar() {
    return (
      <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
  
        {/* Left */}
  
        <div className="flex items-center gap-6">
  
          <input
            type="text"
            placeholder="Search projects..."
            className="w-80 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 outline-none focus:border-blue-500"
          />
  
          <div className="hidden lg:block">
  
            <div className="text-xs text-slate-400 uppercase">
  
              Current Project
  
            </div>
  
            <div className="font-semibold">
  
              AI UAT Platform
  
            </div>
  
          </div>
  
        </div>
  
        {/* Right */}
  
        <div className="flex items-center gap-4">
  
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm text-green-700">
  
            Backend Connected
  
          </span>
  
          <button className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
  
            Export Excel
  
          </button>
  
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
  
            N
  
          </div>
  
        </div>
  
      </header>
    );
  }