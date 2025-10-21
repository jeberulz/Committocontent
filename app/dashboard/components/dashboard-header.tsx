"use client"

import { Menu, Search, Bell, Plus } from "lucide-react"

interface DashboardHeaderProps {
  onMenuClick: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="md:hidden rounded-lg p-2 hover:bg-white/10"
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <div>
              <h1
                className="text-xl tracking-tight"
                style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif', fontWeight: 600 }}
              >
                Dashboard
              </h1>
              <p
                className="text-xs text-white/60"
                style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}
              >
                Welcome back! Here's your content overview.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ring-1 ring-white/10 hover:bg-white/10 text-white/90"
              style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}
            >
              <Search className="w-4 h-4" strokeWidth={1.5} />
              Search
              <kbd className="ml-2 text-xs text-white/50 bg-white/10 px-1.5 py-0.5 rounded">⌘K</kbd>
            </button>
            <button className="relative rounded-full p-2 hover:bg-white/10">
              <Bell className="w-5 h-5 text-white/80" strokeWidth={1.5} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-emerald-500 rounded-full ring-2 ring-black"></span>
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-white text-black hover:bg-white/90 ring-1 ring-white/20"
              style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}
            >
              <Plus className="w-4 h-4" strokeWidth={2} />
              New Draft
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
