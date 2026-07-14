
import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type LayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function Layout({
  title,
  subtitle,
  children,
}: LayoutProps) {

    return (
        <div className="flex h-screen bg-slate-100">
      
          <Sidebar />
      
          <div className="flex flex-1 flex-col overflow-hidden">
      
            <Topbar />
      
            <main className="flex-1 overflow-y-auto">
      
              <div className="px-10 py-8">
      
                <div className="mb-8">
      
                  <h1 className="text-4xl font-bold text-slate-900">
                    {title}
                  </h1>
      
                  {subtitle && (
                    <p className="mt-2 text-slate-500">
                      {subtitle}
                    </p>
                  )}
      
                </div>
      
                {children}
      
              </div>
      
            </main>
      
          </div>
      
        </div>
      );
    }