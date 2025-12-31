import React from "react";
import Search from "../../images/search.png"
import ActivityIcon from "../../images/activity.png";
import AutomationIcon from "../../images/automation.png";
import DashboardIcon from "../../images/dashboard.png";
import DetectIcon from "../../images/detect.png";
import LogsIcon from "../../images/logs.png";
import PipelineIcon from "../../images/pipeline.png";
import ReportIcon from "../../images/report.png";
import SettingsGearIcon from "../../images/settings-gear.png";
import StarIcon from "../../images/star.png";
import TerminalIcon from "../../images/terminal.png";
import MailIcon from "../../images/mail.png";
import ActiveIcon from "../../images/active.png"

type SidebarItem = {
  src: string;
  alt: string;
  active?: boolean;
  hasChild?: boolean;
};
const sidebarItems: SidebarItem[] = [
  { src: Search, alt: "Search" },
  { src: StarIcon, alt: "Starred" },
  { src: ActivityIcon, alt: "Activity" },
  { src: MailIcon, alt: "Mail" },
  { src: ActiveIcon, alt: "Active", active: true },
  { src: PipelineIcon, alt: "Pipeline", hasChild: true },
  { src: ReportIcon, alt: "Reports", hasChild: true },
  { src: DetectIcon, alt: "Detect", hasChild: true },
  { src: LogsIcon, alt: "Logs", hasChild: true },
  { src: DashboardIcon, alt: "Dashboard", },
  { src: SettingsGearIcon, alt: "Settings", hasChild: true },
  { src: AutomationIcon, alt: "Automation", hasChild: true },
  { src: TerminalIcon, alt: "Terminal", hasChild: true },
];

const ITEM_PX = 24;

export const Sidebar: React.FC = () => {
  return (
    <aside className="min-h-screen w-14 bg-white border-r border-slate-200 flex flex-col items-center py-3">
      <div className="flex-1 flex flex-col items-center gap-2">
        {sidebarItems.map((item, index) => (
          <button
            key={index}
            className={`relative w-10 h-10 flex items-center justify-center rounded-md ${item.active ? "text-violet-600" : "text-slate-400"
              }`}
          >
            {item.active && (
              <span className="absolute left-0 top-1 bottom-1 w-0.5 rounded bg-violet-600" />
            )}
            <div
              className="flex items-center justify-center"
              style={{ width: ITEM_PX, height: ITEM_PX }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-contain"
              />
            </div>

            {item.hasChild && (
              <span className="absolute right-0.5 text-[9px] text-slate-300">
                ▸
              </span>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
};
