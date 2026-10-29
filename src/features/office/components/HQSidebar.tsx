"use client";

import type { ReactNode } from "react";

export type HQSidebarTab =
  | "inbox"
  | "history"
  | "kanban"
  | "playbooks"
  | "analytics";

type HQSidebarProps = {
  open: boolean;
  activeTab: HQSidebarTab;
  inboxCount: number;
  onToggle: () => void;
  onTabChange: (tab: HQSidebarTab) => void;
  onOpenMarketplace: () => void;
  onAddAgent?: () => void;
  onOpenCompanyBuilder?: () => void;
  inboxPanel: ReactNode;
  historyPanel: ReactNode;
  kanbanPanel: ReactNode;
  playbooksPanel: ReactNode;
  analyticsPanel: ReactNode;
};

const TAB_LABELS: Record<HQSidebarTab, string> = {
  inbox: "Kotak Masuk",
  history: "Riwayat",
  kanban: "Papan Tugas",
  playbooks: "Panduan",
  analytics: "Analitik",
};

const PRIMARY_TABS: HQSidebarTab[] = ["inbox", "history", "kanban", "playbooks"];

export function HQSidebar({
  open,
  activeTab,
  inboxCount,
  onToggle,
  onTabChange,
  onOpenMarketplace,
  onAddAgent,
  onOpenCompanyBuilder,
  inboxPanel,
  historyPanel,
  kanbanPanel,
  playbooksPanel,
  analyticsPanel,
}: HQSidebarProps) {
  const analyticsOnly = activeTab === "analytics";
  const railOnly = analyticsOnly;
  const activePanel =
    activeTab === "inbox"
      ? inboxPanel
      : activeTab === "history"
        ? historyPanel
        : activeTab === "kanban"
          ? kanbanPanel
        : activeTab === "playbooks"
          ? playbooksPanel
          : analyticsPanel;
  const boardLikeWidth = activeTab === "kanban";

  return (
    <aside className="pointer-events-none fixed inset-y-0 right-0 z-40 flex justify-end">
      <div className="pointer-events-auto mt-16 flex shrink-0 flex-col items-end gap-2 pr-0">
        <button
          type="button"
          onClick={onToggle}
          className="rounded-l-lg border-2 border-r-0 border-black bg-[#00f5ff] px-2 py-3 font-mono text-[10px] font-black tracking-[0.12em] text-black shadow-[-4px_4px_0_#000] transition-transform hover:-translate-x-1"
          aria-expanded={open}
          aria-label={open ? "Tutup panel kantor pusat" : "Buka panel kantor pusat"}
        >
          <span className="block leading-none [writing-mode:vertical-rl]">
            {open ? "TUTUP KANTOR" : "BUKA KANTOR"}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            onOpenMarketplace();
          }}
          className="rounded-l-lg border-2 border-r-0 border-black bg-[#ff4fd8] px-2 py-3 font-mono text-[10px] font-black tracking-[0.12em] text-black shadow-[-4px_4px_0_#000] transition-transform hover:-translate-x-1"
          aria-label="Buka pasar keterampilan"
        >
          <span className="block leading-none [writing-mode:vertical-rl]">
            KETERAMPILAN
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            onTabChange("analytics");
            if (!open) {
              onToggle();
            }
          }}
          className={`rounded-l-lg border-2 border-r-0 px-2 py-3 font-mono text-[10px] font-black tracking-[0.12em] shadow-[-4px_4px_0_#000] transition-transform ${
            analyticsOnly
              ? "border-black bg-[#ffe600] text-black shadow-[-4px_4px_0_#000]"
              : "border-black bg-[#ffe600] text-black shadow-[-4px_4px_0_#000] hover:-translate-x-1"
          }`}
          aria-pressed={analyticsOnly}
          aria-label="Buka panel analitik"
        >
          <span className="block leading-none [writing-mode:vertical-rl]">
            ANALITIK
          </span>
        </button>
      </div>

      {open ? (
        <div
          className={`pointer-events-auto flex max-h-[calc(100dvh-4.5rem)] min-h-0 flex-col border-2 border-black bg-[#fff8e7] text-black shadow-[-8px_8px_0_#000] ${
            boardLikeWidth ? "w-[min(96vw,1180px)]" : "w-[min(88vw,22rem)]"
          }`}
        >
          <div className="border-b-2 border-black bg-[#ffe600] px-3 py-3">
            <div className="font-mono text-[10px] font-black tracking-[0.2em] text-black">
              {analyticsOnly ? "ANALITIK" : "KANTOR PUSAT"}
            </div>
            <div className="mt-1 font-mono text-[11px] font-semibold text-black/70">
              {analyticsOnly
                ? "Biaya, anggaran, dan kinerja sistem."
                : "Pantau hasil, proses, dan jadwal."}
            </div>
            {!railOnly && onAddAgent ? (
              <button
                type="button"
                onClick={onAddAgent}
                className="mt-3 rounded border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-200 transition-colors hover:border-cyan-400/40 hover:text-cyan-100"
              >
                Tambah Agen
              </button>
            ) : null}
            {!railOnly && onOpenCompanyBuilder ? (
              <button
                type="button"
                onClick={onOpenCompanyBuilder}
                className="mt-2 rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-200 transition-colors hover:border-emerald-400/40 hover:text-emerald-100"
              >
                Bangun Perusahaan
              </button>
            ) : null}
            {railOnly ? (
              <button
                type="button"
                onClick={() => onTabChange("inbox")}
                className="mt-3 rounded border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-200 transition-colors hover:border-cyan-400/40 hover:text-cyan-100"
              >
                Kembali ke Kantor
              </button>
            ) : null}
          </div>

          {!railOnly ? (
            <div
              role="tablist"
              aria-label="Panel kantor pusat"
              className="grid grid-cols-2 border-b-2 border-black sm:grid-cols-4"
            >
              {PRIMARY_TABS.map((tab) => {
                const isActive = tab === activeTab;
                const showBadge = tab === "inbox" && inboxCount > 0;
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`hq-panel-${tab}`}
                    id={`hq-tab-${tab}`}
                    onClick={() => onTabChange(tab)}
                    className={`flex min-h-11 items-center justify-center gap-1 border-b border-r border-black/20 px-2 py-2.5 font-mono text-[10px] font-black uppercase tracking-[0.08em] transition-colors sm:border-b-0 sm:text-[11px] sm:tracking-[0.12em] last:border-r-0 ${
                      isActive
                        ? "bg-[#00f5ff] text-black"
                        : "bg-white text-black/65 hover:bg-[#ff4fd8] hover:text-black"
                    }`}
                  >
                    <span>{TAB_LABELS[tab]}</span>
                    {showBadge ? (
                      <span className="rounded bg-cyan-500/15 px-1.5 py-0.5 text-[10px] text-cyan-300" aria-label={`${inboxCount} unread`}>
                        {inboxCount}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ) : null}

          <div
            role="tabpanel"
            id={`hq-panel-${activeTab}`}
            aria-labelledby={`hq-tab-${activeTab}`}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
          >
            {activePanel}
          </div>
        </div>
      ) : null}
    </aside>
  );
}
