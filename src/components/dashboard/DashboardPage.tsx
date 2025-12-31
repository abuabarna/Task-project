import DetectIcon from "../../images/detector.png";
import { useState } from "react";
import { AccountOverviewCard } from "./AccountOverviewCard";
import { MttrOverviewCard } from "./MttrOverviewCard";
import { ChevronDown, Filter, Settings, Printer } from "lucide-react";

export const DashboardPage = () => {
  const [showPrintTooltip, setShowPrintTooltip] = useState(false);

  const handlePrint = () => {
    setShowPrintTooltip(true);
    window.print();
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f5f6fb]">
      <div
        className="flex flex-wrap items-center gap-1.5 px-3 sm:px-6 py-2 border-b border-slate-200 bg-white text-xs text-slate-500"
        style={{ fontSize: "14px" }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#e5eeff]">
            <img
              src={DetectIcon}
              alt="Account"
              className="w-4 h-4 object-contain"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span>Account</span>
            <span>/</span>
            <span>Dashboards</span>
            <span>/</span>

            <button
              className="flex items-center gap-1 text-slate-900 font-bold"
              style={{ fontSize: "16px" }}
            >
              <span className="truncate max-w-[140px] sm:max-w-none">
                CISO Dashboard
              </span>
              <ChevronDown className="w-3.5 h-3.5" />
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="w-full sm:w-auto sm:ml-auto flex items-center justify-between sm:justify-end gap-1.5 text-[11px] text-slate-400 mt-1 sm:mt-0">
          <span>Updated 2 seconds ago</span>
          <div className="relative">
            <button
              className="p-1 rounded hover:bg-slate-100"
              onClick={handlePrint}
            >
              <Printer className="w-3 h-3" />
            </button>
            {showPrintTooltip && (
              <div className="absolute right-0 top-6 z-50 w-64 p-2 text-xs bg-white border border-slate-300 rounded shadow-md">
                <p className="text-slate-700">
                  Click "Print" to download this dashboard as a PDF. You can
                  adjust print settings in your browser.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <main className="flex-1 overflow-auto">
        <div className="w-full mx-auto px-3 sm:px-6 pt-3 sm:pt-4 pb-6 sm:pb-8">
          <button
            className="w-full flex items-center gap-1 px-3 py-1.5 mb-4
                       text-xs font-medium bg-white border border-[#f0f2f6]
                       hover:bg-[#f9fafc] transition-colors shadow-sm"
            style={{ color: "#EF7B22", fontWeight: "bold", fontSize: "14px" }}
          >
            <Filter className="w-3 h-3" />
            <span>Add Filter</span>
          </button>

          <div className="space-y-4">
            <AccountOverviewCard />
            <MttrOverviewCard />
          </div>
        </div>
      </main>
    </div>
  );
};
