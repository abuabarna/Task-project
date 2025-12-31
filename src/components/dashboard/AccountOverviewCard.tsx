import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { RadialScoreGauge } from "./RadialScoreGauge";
import { ScoreTrendChart } from "./ScoreTrendChart";
import {
  Star,
  MoreVertical,
  Filter,
  Users,
  UserCheck,
  Clock,
  X,
  ChevronDown,
  Share2,
  Pencil,
  Trash2,
  User,
  ShieldAlert,
  Info
} from "lucide-react";

/* -------------------- Data -------------------- */

type ShareItem = {
  name: string;
  email: string;
  role: "Owner" | "Can View";
  kind: "User" | "Team";
};

const SHARE_ITEMS: ShareItem[] = [
  { name: "Candice Wu (You)", email: "candicewu@gmail.com", role: "Owner", kind: "User" },
  { name: "Teresa William", email: "teresawilliam@gmail.com", role: "Owner", kind: "User" },
  { name: "Demi Wilkinson", email: "demiwilkinson@gmail.com", role: "Can View", kind: "User" },
  { name: "Team A", email: "teamA@gmail.com", role: "Can View", kind: "Team" },
  { name: "Skyline rider", email: "skyline.rider@gmail.com", role: "Can View", kind: "User" },
];

/* -------------------- Share modal -------------------- */

type ShareWidgetPanelProps = {
  open: boolean;
  onClose: () => void;
  onShared: () => void;
};

const ShareWidgetPanel = ({ open, onClose, onShared }: ShareWidgetPanelProps) => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | "OWNER" | "VIEW">("ALL");
  const [tab, setTab] = useState<"ALL" | "USERS" | "TEAMS">("ALL");
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);


  const dropdownRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) {
        setRoleDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);


  useEffect(() => {
    if (!open) {
      setSearch("");
      setRoleFilter("ALL");
      setTab("ALL");
      setSelectedEmail(null);
      setRoleDropdownOpen(false);
    }
  }, [open]);

  if (!open) return null;

  const filteredItems = SHARE_ITEMS.filter((item) => {
    if (tab === "USERS" && item.kind !== "User") return false;
    if (tab === "TEAMS" && item.kind !== "Team") return false;

    if (roleFilter === "OWNER" && item.role !== "Owner") return false;
    if (roleFilter === "VIEW" && item.role !== "Can View") return false;

    if (!search.trim()) return true;

    const q = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q)
    );
  });

  const handleShare = () => {
    onShared();
    onClose();
  };

  const handleAdd = () => {
    if (!selectedEmail) return;
    console.log("Add shared access to:", selectedEmail);
    onShared();
    onClose();
  };

  const roleLabel =
    roleFilter === "ALL" ? "Can view" : roleFilter === "OWNER" ? "Owner" : "Can view";

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-md bg-white shadow-xl border border-slate-200 rounded-md flex flex-col max-h-[90vh]">
        <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Share Widget
            </h2>
            <p className="text-xs text-slate-500">
              Share this widget with others to collaborate or view insights
              together.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-slate-100 text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* search + list */}
        <div className="px-4 py-3 flex-1 overflow-auto">
          <div className="flex items-center gap-2 mb-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 h-8 px-2 text-xs border border-slate-300 rounded outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="Search Users and Teams"
            />

            {/* role dropdown */}
            <div className="relative text-xs" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setRoleDropdownOpen((v) => !v)}
                className="flex items-center gap-1 h-8 px-2 border border-slate-300 rounded bg-white"
              >
                <span>{roleLabel}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white border border-slate-200 rounded shadow-md z-50 text-[11px]">
                  <button
                    className="block w-full text-left px-3 py-1.5 hover:bg-slate-100"
                    onClick={() => {
                      setRoleFilter("ALL");
                      setRoleDropdownOpen(false);
                    }}
                  >
                    All
                  </button>
                  <button
                    className="block w-full text-left px-3 py-1.5 hover:bg-slate-100"
                    onClick={() => {
                      setRoleFilter("OWNER");
                      setRoleDropdownOpen(false);
                    }}
                  >
                    Owner
                  </button>
                  <button
                    className="block w-full text-left px-3 py-1.5 hover:bg-slate-100"
                    onClick={() => {
                      setRoleFilter("VIEW");
                      setRoleDropdownOpen(false);
                    }}
                  >
                    Can view
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleAdd}
              className="h-8 px-3 text-xs font-semibold rounded bg-sky-600 text-white disabled:bg-sky-300"
              disabled={!selectedEmail}
            >
              Add
            </button>
          </div>

          {/* tabs */}
          <div className="flex items-center gap-4 text-[11px] mb-2 border-b border-slate-200">
            <button
              className={`py-1 ${
                tab === "ALL"
                  ? "border-b-2 border-sky-600 text-sky-600 font-medium"
                  : "text-slate-500"
              }`}
              onClick={() => setTab("ALL")}
            >
              All
            </button>
            <button
              className={`py-1 ${
                tab === "USERS"
                  ? "border-b-2 border-sky-600 text-sky-600 font-medium"
                  : "text-slate-500"
              }`}
              onClick={() => setTab("USERS")}
            >
              Users
            </button>
            <button
              className={`py-1 ${
                tab === "TEAMS"
                  ? "border-b-2 border-sky-600 text-sky-600 font-medium"
                  : "text-slate-500"
              }`}
              onClick={() => setTab("TEAMS")}
            >
              Teams
            </button>
          </div>

  
          <div className="space-y-2 text-xs">
            {filteredItems.map((u) => {
              const isSelected = selectedEmail === u.email;
              return (
                <button
                  key={u.email}
                  type="button"
                  onClick={() =>
                    setSelectedEmail((prev) => (prev === u.email ? null : u.email))
                  }
                  className={`w-full flex items-center justify-between py-1.5 border-b border-slate-100 ${
                    isSelected ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-semibold text-slate-600">
                      {u.name[0]}
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-slate-900">{u.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {u.email}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500">{u.role}</span>
                </button>
              );
            })}
            {filteredItems.length === 0 && (
              <div className="py-3 text-[11px] text-slate-500 text-center">
                No matching users or teams
              </div>
            )}
          </div>
        </div>

     
        <div className="border-t border-slate-200 px-4 py-3 space-y-3">
          <div>
            <div className="text-xs font-medium text-slate-800 mb-1">
              General Access
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-600">
              <button className="flex items-center gap-1 px-2 py-1 border border-slate-300 rounded text-xs">
                Restricted
                <ChevronDown className="w-3 h-3" />
              </button>
              <span>Only selected users have access to view or edit</span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleShare}
              className="px-4 py-1.5 text-xs font-semibold rounded bg-[#e1601b] text-white"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const ShareSuccessToast = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  if (!visible) return null;

  return (

<div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 w-full max-w-3xl px-4">
  <div className="pointer-events-auto flex items-center justify-between
                  bg-emerald-50 border border-emerald-200
                  shadow-sm">

    <div className="flex items-center gap-3 w-full px-4 py-2">
 
      <div className="w-1 h-6 bg-emerald-700" />

      {/* Check icon + text in one line */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-4 h-4 rounded-full
                        bg-emerald-600">
          <span className="text-[14px] text-emerald-50">✓</span>
        </div>
        <span className="text-[14px] text-emerald-800 font-bold">
          Widget has been successfully shared!
        </span>
      </div>
    </div>


    <button
      className="pr-4 text-sm text-emerald-700 font-semibold leading-none"
      onClick={onClose}
    >
      ×
    </button>
  </div>
</div>

  
  );
};



type ConfirmDeleteDialogProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmDeleteDialog = ({ open, onCancel, onConfirm }: ConfirmDeleteDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-md shadow-lg">
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">Delete widget?</h3>
          <button
            className="p-1 rounded hover:bg-slate-100 text-slate-500"
            onClick={onCancel}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-4 py-3 text-xs text-slate-600">
          This action cannot be undone. Are you sure you want to delete this widget?
        </div>
        <div className="px-4 py-3 border-t border-slate-200 flex justify-end gap-2">
          <button
            className="px-3 py-1.5 text-xs rounded border border-slate-300 text-slate-700 hover:bg-slate-50"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1.5 text-xs rounded bg-red-600 text-white hover:bg-red-700 flex items-center gap-1"
            onClick={onConfirm}
          >
            <Trash2 className="w-3 h-3" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------- Options menu -------------------- */

type OptionsMenuProps = {
  onShare: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const OptionsMenu = ({ onShare, onEdit, onDelete }: OptionsMenuProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        className="p-1.5 hover:bg-slate-100 rounded border border-slate-200"
        onClick={() => setOpen((v) => !v)}
      >
        <MoreVertical className="w-4 h-4 text-slate-500" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-md border border-slate-200 bg-white shadow-md py-1 z-30 text-xs">
          <button
            className="flex w-full items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-100"
            onClick={() => {
              setOpen(false);
              onShare();
            }}
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button
            className="flex w-full items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-100"
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
          >
            <Pencil className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            className="flex w-full items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50"
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};

/* -------------------- Main card -------------------- */

export const AccountOverviewCard = () => {
  const [openShare, setOpenShare] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);

  const handleDeleteConfirm = () => {
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="w-full bg-[#f7f8fb] py-3 px-2">
        <Card className="mt-2 w-full bg-white shadow-sm border border-slate-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-3 pb-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                Account Overview
              </h2>
              <div className="relative">
                <Info
                  className="w-4 h-4 text-slate-400 cursor-pointer"
                  onClick={() => setShowInfoTooltip((prev) => !prev)}
                />
                {showInfoTooltip && (
                  <div className="absolute left-0 top-6 z-50 w-64 p-2 text-xs bg-white border border-slate-300 rounded shadow-md">
                    <p className="text-slate-700">
                      This card provides an overview of your account's current status, including score, assets, exposure, and remediation metrics.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setOpenShare(true)}
                className="p-1.5 hover:bg-slate-100 rounded border border-slate-200"
              >
                <Filter className="w-4 h-4 text-slate-500" />
              </button>

              <OptionsMenu
                onShare={() => setOpenShare(true)}
                onEdit={() => {
                }}
                onDelete={() => setShowDeleteDialog(true)}
              />
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 px-4 pb-1 text-[10px]">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-slate-500">A</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-lime-400" />
              <span className="text-slate-500">B</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              <span className="text-slate-500">C</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-slate-500">D</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span className="text-slate-500">F</span>
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 px-3 pb-3">
            <div className="xl:col-span-5 flex justify-center items-center bg-white">
              <RadialScoreGauge score={550} maxScore={1000} />
            </div>

            <div className="xl:col-span-3 flex flex-col gap-3 w-full max-w-sm sm:max-w-md md:max-w-lg">
  {/* Top Assets Card */}
  <div className="rounded-md border border-slate-200 bg-white p-4 flex items-center justify-between shadow-sm">
    <span className="text-slate-600" style={{ fontSize: "14px" }}>
      Assets
    </span>
    <span className="text-xl font-bold text-[#1e56a0]">2134</span>
  </div>

  {/* Main Exposure Card */}
  <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
    {/* Header with dashed border */}
    <div className="flex items-center justify-between pb-3 border-b border-dashed border-slate-300">
      <span className="text-slate-600" style={{ fontSize: "14px" }}>
        Exposure
      </span>
      <span className="text-xl font-bold text-[#1e56a0]">11325</span>
    </div>

    <div className="mt-4 flex flex-col gap-3">
      {/* Assigned & Unassigned Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-[#f8fafc] p-3 rounded-lg border border-slate-100">
          <div className="text-[14px] text-slate-500 mb-1">Assigned</div>
          <div className="text-lg font-bold text-[#1e56a0]">138</div>
        </div>
        <div className="bg-[#f8fafc] p-3 rounded-lg border border-slate-100">
          <div className="text-[14px] text-slate-500 mb-1">Unassigned</div>
          <div className="text-lg font-bold text-[#1e56a0]">54</div>
        </div>
      </div>

      {/* Routed To Section */}
      <div className="bg-[#f8fafc] p-3 rounded-lg border border-slate-100">
        <div className="text-[14px] text-slate-500 mb-2">Routed to</div>
        <div className="flex flex-wrap items-center">
          <div className="flex items-center gap-1.5 pr-4 pb-2">
            <User className="w-4 h-4 text-slate-400" />
            <span className="text-lg font-bold text-[#1e56a0]">421</span>
          </div>
          <div className="flex items-center gap-1.5 px-4 pb-2 border-l border-slate-200">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-lg font-bold text-[#1e56a0]">34</span>
          </div>
          <div className="flex items-center gap-1.5 pl-4 pb-2 border-l border-slate-200">
            <ShieldAlert className="w-4 h-4 text-slate-400" />
            <span className="text-lg font-bold text-[#1e56a0]">24</span>
          </div>
        </div>
      </div>

      {/* Overdue Section */}
      <div className="bg-[#f8fafc] p-3 rounded-lg border border-slate-100">
        <div className="text-[14px] text-slate-500 mb-1">
          Overdue for Remediation
        </div>
        <div className="text-lg font-bold text-[#1e56a0]">54</div>
      </div>
    </div>
  </div>
</div>


            <div className="xl:col-span-4">
              <div className="h-full rounded border border-slate-200 bg-[#fbfcff] px-4 py-3 flex flex-col">
                <div className="text-[16px] font-bold text-slate-900 mb-2">
                  Score increased by 25 points
                </div>
                <ul className="space-y-1.5 text-[11px] mb-3" style={{fontSize:"14px"}}>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    <span className="text-slate-600">
                      <span className="text-blue-600 font-semibold" >30%</span>{" "}
                      of assets missed scan due dates. Boost score by rescanning
                      now.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    <span className="text-slate-600">
                      <span className="text-blue-600 font-semibold">40%</span>{" "}
                      of exposures unassigned past due dates. Raise score by
                      assigning fast.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    <span className="text-slate-600">
                      <span className="text-blue-600 font-semibold">80%</span>{" "}
                      of exposures past due dates. Improve score by resolving
                      quickly.
                    </span>
                  </li>
                </ul>
                <div className="flex-1">
                  <div className="text-[16px] text-slate-700 mb-1 font-bold">
                    Score Trend
                  </div>
                  <ScoreTrendChart />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* share modal */}
      <ShareWidgetPanel
        open={openShare}
        onClose={() => setOpenShare(false)}
        onShared={() => setShareSuccess(true)}
      />

      {/* success toast bottom center */}
      <ShareSuccessToast
        visible={shareSuccess}
        onClose={() => setShareSuccess(false)}
      />

      {/* delete confirm dialog */}
      <ConfirmDeleteDialog
        open={showDeleteDialog}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};
