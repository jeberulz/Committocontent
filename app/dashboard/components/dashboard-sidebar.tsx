"use client"

import Link from "next/link"
import {
  LayoutDashboard,
  FileText,
  CheckCircle,
  Github,
  BarChart3,
  LayoutTemplate,
  Megaphone,
  Calendar,
  Settings,
  HelpCircle,
  ChevronRight,
  X
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: any
  badge?: string | number
  badgeVariant?: "default" | "success"
}

const mainNavItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Drafts", href: "/dashboard/drafts", icon: FileText, badge: 12 },
  { title: "Published", href: "/dashboard/published", icon: CheckCircle },
  { title: "Repositories", href: "/dashboard/repositories", icon: Github },
  { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
]

const contentNavItems: NavItem[] = [
  { title: "Templates", href: "/dashboard/templates", icon: LayoutTemplate },
  { title: "Social Snippets", href: "/dashboard/social", icon: Megaphone },
  { title: "Scheduler", href: "/dashboard/scheduler", icon: Calendar, badge: 3, badgeVariant: "success" },
]

const bottomNavItems: NavItem[] = [
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
  { title: "Help & Docs", href: "/dashboard/help", icon: HelpCircle },
]

interface DashboardSidebarProps {
  className?: string
  onClose?: () => void
  isMobile?: boolean
}

export function DashboardSidebar({ className = "", onClose, isMobile }: DashboardSidebarProps) {
  return (
    <aside className={`w-64 border-r border-white/10 bg-black flex flex-col ${className}`}>
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
            CodeToContent
          </span>
        </Link>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon
            const isActive = item.href === "/dashboard" // You can make this dynamic with usePathname

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
                style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                {item.title}
                {item.badge && (
                  <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                    item.badgeVariant === "success"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-white/10"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 space-y-1">
          <p className="px-3 text-xs uppercase tracking-wider text-white/50 mb-2" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
            Content
          </p>
          {contentNavItems.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 text-sm transition"
                style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                {item.title}
                {item.badge && (
                  <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                    item.badgeVariant === "success"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-white/10"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 space-y-1">
          {bottomNavItems.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 text-sm transition"
                style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                {item.title}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* User profile */}
      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
            alt="Avatar"
            className="h-8 w-8 rounded-full object-cover ring-2 ring-black"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white/90 truncate" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
              Maya Patel
            </p>
            <p className="text-xs text-white/60 truncate" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
              Pro Plan
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-white/60" strokeWidth={1.5} />
        </div>
      </div>
    </aside>
  )
}
