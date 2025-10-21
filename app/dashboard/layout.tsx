"use client"

import { DashboardSidebar } from "./components/dashboard-sidebar"
import { DashboardHeader } from "./components/dashboard-header"
import { useState } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-black text-white" style={{ fontFamily: 'var(--font-inter), ui-sans-serif, system-ui' }}>
      {/* Desktop Sidebar */}
      <DashboardSidebar className="hidden md:flex" />

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <DashboardSidebar
            className="fixed inset-y-0 left-0 z-50 md:hidden transform transition-transform duration-300"
            onClose={() => setIsMobileSidebarOpen(false)}
            isMobile
          />
        </>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 lg:px-8 py-6 space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
