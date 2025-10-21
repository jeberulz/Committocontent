"use client"

import {
  FileText,
  CheckCircle,
  Eye,
  Clock,
  GitCommit,
  Github,
  Calendar,
  BarChart3,
  Wand2,
  Check,
  MoreVertical
} from "lucide-react"
import { PerformanceChart } from "./components/performance-chart"

export default function DashboardPage() {
  return (
    <>
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                Drafts this month
              </p>
              <p className="text-2xl tracking-tight mt-1" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif', fontWeight: 600 }}>
                24
              </p>
              <p className="text-xs text-emerald-300 mt-1" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                +12% vs last month
              </p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white/80" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                Published
              </p>
              <p className="text-2xl tracking-tight mt-1" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif', fontWeight: 600 }}>
                18
              </p>
              <p className="text-xs text-emerald-300 mt-1" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                +6 this week
              </p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white/80" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                Total views
              </p>
              <p className="text-2xl tracking-tight mt-1" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif', fontWeight: 600 }}>
                12.4k
              </p>
              <p className="text-xs text-emerald-300 mt-1" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                +24% engagement
              </p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Eye className="w-5 h-5 text-white/80" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                Time saved
              </p>
              <p className="text-2xl tracking-tight mt-1" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif', fontWeight: 600 }}>
                94h
              </p>
              <p className="text-xs text-white/60 mt-1" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                This quarter
              </p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white/80" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg tracking-tight" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif', fontWeight: 600 }}>
            Quick Actions
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button className="flex items-center gap-3 rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10 p-4 text-left transition">
            <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <GitCommit className="w-5 h-5 text-emerald-300" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm text-white/90" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                Generate from commits
              </p>
              <p className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                3 new commits
              </p>
            </div>
          </button>

          <a href="/dashboard/repositories" className="flex items-center gap-3 rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10 p-4 text-left transition">
            <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <Github className="w-5 h-5 text-white/80" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm text-white/90" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                Connect new repo
              </p>
              <p className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                Expand coverage
              </p>
            </div>
          </a>

          <button className="flex items-center gap-3 rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10 p-4 text-left transition">
            <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-white/80" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm text-white/90" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                Schedule posts
              </p>
              <p className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                Plan content
              </p>
            </div>
          </button>

          <button className="flex items-center gap-3 rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10 p-4 text-left transition">
            <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-5 h-5 text-white/80" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm text-white/90" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                View analytics
              </p>
              <p className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                Track performance
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent drafts */}
        <div className="lg:col-span-2 rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg tracking-tight" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif', fontWeight: 600 }}>
              Recent Drafts
            </h2>
            <a href="#drafts" className="text-xs text-white/70 hover:text-white" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
              View all →
            </a>
          </div>
          <div className="space-y-3">
            <div className="rounded-lg bg-black ring-1 ring-white/10 p-4 hover:ring-white/20 transition cursor-pointer">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-emerald-300 bg-emerald-500/10 ring-1 ring-emerald-500/20 px-2 py-0.5 rounded-full" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                      Ready
                    </span>
                    <span className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                      2 hours ago
                    </span>
                  </div>
                  <h3 className="text-sm text-white/90 mb-1" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                    Optimizing Images with Lazy Loading and Responsive Srcsets
                  </h3>
                  <p className="text-xs text-white/60 line-clamp-2" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                    This week I refactored our asset pipeline to ship the smallest possible images for every device...
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-[10px] text-white/70 bg-white/5 ring-1 ring-white/10 px-2 py-0.5 rounded-full" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                      React
                    </span>
                    <span className="text-[10px] text-white/70 bg-white/5 ring-1 ring-white/10 px-2 py-0.5 rounded-full" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                      Performance
                    </span>
                  </div>
                </div>
                <button className="rounded-lg p-2 hover:bg-white/10 flex-shrink-0">
                  <MoreVertical className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <div className="rounded-lg bg-black ring-1 ring-white/10 p-4 hover:ring-white/20 transition cursor-pointer">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-amber-300 bg-amber-500/10 ring-1 ring-amber-500/20 px-2 py-0.5 rounded-full" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                      Review
                    </span>
                    <span className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                      5 hours ago
                    </span>
                  </div>
                  <h3 className="text-sm text-white/90 mb-1" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                    Debugging Race Conditions in Webhook Handlers
                  </h3>
                  <p className="text-xs text-white/60 line-clamp-2" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                    Found and fixed a subtle race condition that was causing intermittent webhook failures...
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-[10px] text-white/70 bg-white/5 ring-1 ring-white/10 px-2 py-0.5 rounded-full" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                      Node.js
                    </span>
                    <span className="text-[10px] text-white/70 bg-white/5 ring-1 ring-white/10 px-2 py-0.5 rounded-full" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                      Debugging
                    </span>
                  </div>
                </div>
                <button className="rounded-lg p-2 hover:bg-white/10 flex-shrink-0">
                  <MoreVertical className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <div className="rounded-lg bg-black ring-1 ring-white/10 p-4 hover:ring-white/20 transition cursor-pointer">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-white/60 bg-white/5 ring-1 ring-white/10 px-2 py-0.5 rounded-full" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                      Draft
                    </span>
                    <span className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                      1 day ago
                    </span>
                  </div>
                  <h3 className="text-sm text-white/90 mb-1" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                    Migrating to pnpm and Turborepo: A Complete Guide
                  </h3>
                  <p className="text-xs text-white/60 line-clamp-2" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                    Step-by-step guide to migrating a large monorepo from npm to pnpm with turbo caching...
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-[10px] text-white/70 bg-white/5 ring-1 ring-white/10 px-2 py-0.5 rounded-full" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                      DevOps
                    </span>
                    <span className="text-[10px] text-white/70 bg-white/5 ring-1 ring-white/10 px-2 py-0.5 rounded-full" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                      Tooling
                    </span>
                  </div>
                </div>
                <button className="rounded-lg p-2 hover:bg-white/10 flex-shrink-0">
                  <MoreVertical className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Activity feed */}
        <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg tracking-tight" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif', fontWeight: 600 }}>
              Recent Activity
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-emerald-300" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/90" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                  Published to dev.to
                </p>
                <p className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                  "Optimizing Images..." • 2h ago
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-white/10 ring-1 ring-white/10 flex items-center justify-center flex-shrink-0">
                <GitCommit className="w-4 h-4 text-white/80" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/90" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                  New commits detected
                </p>
                <p className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                  3 commits in my-saas-app • 4h ago
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-white/10 ring-1 ring-white/10 flex items-center justify-center flex-shrink-0">
                <Wand2 className="w-4 h-4 text-white/80" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/90" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                  Draft generated
                </p>
                <p className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                  "Debugging Race Conditions..." • 5h ago
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-white/10 ring-1 ring-white/10 flex items-center justify-center flex-shrink-0">
                <Github className="w-4 h-4 text-white/80" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/90" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                  Repo connected
                </p>
                <p className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                  personal-blog • 1d ago
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-emerald-300" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/90" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                  Published to Hashnode
                </p>
                <p className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                  "Why I chose Remix..." • 2d ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics chart */}
      <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg tracking-tight" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif', fontWeight: 600 }}>
              Content Performance
            </h2>
            <p className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
              Views and engagement over the last 30 days
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-xs rounded-lg px-3 py-1.5 ring-1 ring-white/10 hover:bg-white/10 text-white/90" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
              7D
            </button>
            <button className="text-xs rounded-lg px-3 py-1.5 ring-1 ring-white/10 bg-white/10 text-white" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
              30D
            </button>
            <button className="text-xs rounded-lg px-3 py-1.5 ring-1 ring-white/10 hover:bg-white/10 text-white/90" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
              90D
            </button>
          </div>
        </div>
        <div className="h-64 rounded-lg bg-black ring-1 ring-white/10 p-4">
          <div className="h-full">
            <PerformanceChart />
          </div>
        </div>
      </div>

      {/* Connected repos */}
      <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg tracking-tight" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif', fontWeight: 600 }}>
            Connected Repositories
          </h2>
          <button className="text-xs text-white/70 hover:text-white flex items-center gap-1" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
            <span className="text-base">+</span>
            Add repo
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="rounded-lg bg-black ring-1 ring-white/10 p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-white/80" strokeWidth={1.5} />
                <p className="text-sm text-white/90" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                  my-saas-app
                </p>
              </div>
              <span className="h-2 w-2 bg-emerald-500 rounded-full"></span>
            </div>
            <p className="text-xs text-white/60 mb-3" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
              3 new commits • 2 hours ago
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                12 drafts
              </span>
              <button className="text-xs text-white/70 hover:text-white" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                Generate →
              </button>
            </div>
          </div>

          <div className="rounded-lg bg-black ring-1 ring-white/10 p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-white/80" strokeWidth={1.5} />
                <p className="text-sm text-white/90" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                  personal-blog
                </p>
              </div>
              <span className="h-2 w-2 bg-emerald-500 rounded-full"></span>
            </div>
            <p className="text-xs text-white/60 mb-3" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
              1 new commit • 1 day ago
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                8 drafts
              </span>
              <button className="text-xs text-white/70 hover:text-white" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                Generate →
              </button>
            </div>
          </div>

          <div className="rounded-lg bg-black ring-1 ring-white/10 p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-white/80" strokeWidth={1.5} />
                <p className="text-sm text-white/90" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                  react-components
                </p>
              </div>
              <span className="h-2 w-2 bg-white/40 rounded-full"></span>
            </div>
            <p className="text-xs text-white/60 mb-3" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
              No new commits • 5 days ago
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                5 drafts
              </span>
              <button className="text-xs text-white/70 hover:text-white" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                View →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scheduled posts */}
      <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg tracking-tight" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif', fontWeight: 600 }}>
            Upcoming Posts
          </h2>
          <a href="#scheduler" className="text-xs text-white/70 hover:text-white" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
            View calendar →
          </a>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-4 rounded-lg bg-black ring-1 ring-white/10 p-4">
            <div className="text-center flex-shrink-0">
              <p className="text-lg tracking-tight" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif', fontWeight: 600 }}>
                24
              </p>
              <p className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                Dec
              </p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white/90 mb-1" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                Building a Real-Time Dashboard with WebSockets
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                  dev.to
                </span>
                <span className="text-xs text-white/40">•</span>
                <span className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                  10:00 AM
                </span>
              </div>
            </div>
            <button className="rounded-lg p-2 hover:bg-white/10 flex-shrink-0">
              <MoreVertical className="w-4 h-4 text-white/60" strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex items-center gap-4 rounded-lg bg-black ring-1 ring-white/10 p-4">
            <div className="text-center flex-shrink-0">
              <p className="text-lg tracking-tight" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif', fontWeight: 600 }}>
                26
              </p>
              <p className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                Dec
              </p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white/90 mb-1" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                Testing Strategies for Modern React Apps
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                  Hashnode
                </span>
                <span className="text-xs text-white/40">•</span>
                <span className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                  2:00 PM
                </span>
              </div>
            </div>
            <button className="rounded-lg p-2 hover:bg-white/10 flex-shrink-0">
              <MoreVertical className="w-4 h-4 text-white/60" strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex items-center gap-4 rounded-lg bg-black ring-1 ring-white/10 p-4">
            <div className="text-center flex-shrink-0">
              <p className="text-lg tracking-tight" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif', fontWeight: 600 }}>
                28
              </p>
              <p className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                Dec
              </p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white/90 mb-1" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                Database Indexing Best Practices
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                  Personal blog
                </span>
                <span className="text-xs text-white/40">•</span>
                <span className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
                  9:00 AM
                </span>
              </div>
            </div>
            <button className="rounded-lg p-2 hover:bg-white/10 flex-shrink-0">
              <MoreVertical className="w-4 h-4 text-white/60" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
