import { Search, Bell, HelpCircle, ChevronDown, Settings } from "lucide-react";
import profile from "../../images/profile.png";
import Notification from "../../images/notification.png";


export const TopBar = () => {
  return (
    <header className="h-auto bg-primary flex items-center justify-between gap-2 px-3 sm:px-4 py-2 text-primary-foreground">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-base sm:text-lg">Securin</span>
      </div>
      <div className="hidden sm:block flex-1 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/60" />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full bg-primary-foreground/10 border border-primary-foreground/20
                       rounded-md py-1.5 pl-10 pr-12 text-sm
                       placeholder:text-primary-foreground/60
                       focus:outline-none focus:ring-1 focus:ring-primary-foreground/40"
          />
          <div
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2
                       h-5 px-2 rounded bg-primary-foreground/10
                       border border-primary-foreground/30
                       text-[10px] font-medium tracking-wide
                       text-primary-foreground/70 flex items-center justify-center"
          >
            ⌘F
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button className="p-1.5 hover:bg-primary-foreground/10 rounded">
          <img
            src={Notification}
            alt="Notifications"
            className="w-7 h-7 object-cover"
          />
        </button>

        <button className="p-1.5 hover:bg-primary-foreground/10 rounded hidden sm:inline-flex">
          <Settings className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 cursor-pointer hover:bg-primary-foreground/10 rounded px-2 py-1">
          <div className="w-7 h-7 bg-primary-foreground rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={profile}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
