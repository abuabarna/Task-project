import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Info, Filter, Clock } from "lucide-react";
import { ScoreTrendChart } from "./ScoreTrendChart";

interface MetricProps {
  title: string;
  ringValue: number;
  ringColor: string;
  value: string;
  unit: string;
  trendValue: string;
  subtitle: string;
}

const MetricRing = ({ ringValue, ringColor }: { ringValue: number; ringColor: string }) => {
  const size = 36;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (ringValue / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={ringColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-slate-700">{ringValue}</span>
    </div>
  );
};

const MetricRow = ({ title, ringValue, ringColor, value, unit, trendValue, subtitle }: MetricProps) => {
  const isNegativeTrend = trendValue.includes("-");

  return (
    <div className="flex flex-col w-full">
      <div className="text-base font-bold text-slate-800 mb-3">
        {title}
      </div>

      <div className="flex items-center gap-3">
        <MetricRing ringValue={ringValue} ringColor={ringColor} />
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-slate-900">{value}</span>
            <span className="text-lg font-bold text-slate-900">{unit}</span>
            <span className={`text-[10px] px-1 rounded-sm ml-1 ${isNegativeTrend ? 'text-blue-600 bg-blue-50' : 'text-blue-500 bg-blue-50'}`}>
              {trendValue}
            </span>
          </div>
          <div className="text-[10px] text-slate-500 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span style={{ fontSize: "12px" }}>{subtitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MttrOverviewCard = () => {
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  const metrics = [
    {
      title: "Discover",
      ringValue: 90,
      ringColor: "#065f46",
      value: "2.4",
      unit: "Days",
      trendValue: "+5%",
      subtitle: "Mean time to scan",
    },
    {
      title: "Route",
      ringValue: 52,
      ringColor: "#d97706",
      value: "1.2",
      unit: "Hours",
      trendValue: "-8%",
      subtitle: "Mean time to assign",
    },
    {
      title: "Remediate",
      ringValue: 80,
      ringColor: "#065f46",
      value: "3.1",
      unit: "Days",
      trendValue: "+6%",
      subtitle: "Mean time to remediate",
    }
  ];

  return (
    <Card className="bg-white border border-slate-200 shadow-sm overflow-hidden">

      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-1.5">
          <h2 className=" font-bold text-slate-800" style={{ fontSize: "18px" }}>MTTD to MTTR Overview</h2>
          <div className="relative">
            <Info
              className="w-4 h-4 text-slate-400 cursor-pointer"
              onClick={() => setShowInfoTooltip((prev) => !prev)}
            />
            {showInfoTooltip && (
              <div className="absolute left-0 top-6 z-50 w-64 p-2 text-xs bg-white border border-slate-300 rounded shadow-md">
                <p className="text-slate-700">
                  This card displays key metrics for Mean Time to Detect (MTTD) and Mean Time to Remediate (MTTR), helping you track the efficiency of your security processes.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="p-1.5 border border-slate-200 rounded-md cursor-pointer hover:bg-slate-50">
          <Filter className="w-4 h-4 text-slate-500" />
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-slate-100">
        {metrics.map((m, idx) => (
          <div
            key={m.title}
            className={`p-4 flex flex-col gap-4 ${idx !== metrics.length - 1 ? 'md:border-r border-slate-100' : ''}`}
          >
            <MetricRow {...m} />
            <div className="mt-2">
              <ScoreTrendChart />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};