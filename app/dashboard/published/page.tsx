"use client"

import {
  CheckCircle,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  BarChart3,
  Calendar,
  Filter,
  Search,
  ExternalLink,
  MoreVertical,
  TrendingUp,
  Clock,
  Globe,
} from "lucide-react"
import { useState } from "react"

// Mock data - will be replaced with Convex queries
const publishedPosts = [
  {
    id: "1",
    title: "Optimizing Images with Lazy Loading and Responsive Srcsets",
    excerpt: "This week I refactored our asset pipeline to ship the smallest possible images for every device...",
    publishedAt: "2 days ago",
    platform: "dev.to",
    url: "https://dev.to/example",
    views: 1243,
    likes: 87,
    comments: 12,
    shares: 5,
    tags: ["React", "Performance"],
    status: "published",
  },
  {
    id: "2",
    title: "Why I chose Remix over Next.js for my SaaS",
    excerpt: "After building production apps with both frameworks, here's my honest comparison...",
    publishedAt: "3 days ago",
    platform: "Hashnode",
    url: "https://hashnode.com/example",
    views: 3421,
    likes: 234,
    comments: 45,
    shares: 23,
    tags: ["Remix", "Next.js", "SaaS"],
    status: "published",
  },
  {
    id: "3",
    title: "Building a Real-Time Dashboard with WebSockets",
    excerpt: "Learn how to create a production-ready real-time dashboard using WebSockets and React...",
    publishedAt: "5 days ago",
    platform: "Personal Blog",
    url: "https://example.com/blog",
    views: 892,
    likes: 64,
    comments: 8,
    shares: 3,
    tags: ["WebSockets", "Real-time", "Dashboard"],
    status: "published",
  },
  {
    id: "4",
    title: "Debugging Race Conditions in Webhook Handlers",
    excerpt: "Found and fixed a subtle race condition that was causing intermittent webhook failures...",
    publishedAt: "1 week ago",
    platform: "dev.to",
    url: "https://dev.to/example2",
    views: 2156,
    likes: 145,
    comments: 28,
    shares: 12,
    tags: ["Node.js", "Debugging", "Webhooks"],
    status: "published",
  },
  {
    id: "5",
    title: "Migrating to pnpm and Turborepo: A Complete Guide",
    excerpt: "Step-by-step guide to migrating a large monorepo from npm to pnpm with turbo caching...",
    publishedAt: "2 weeks ago",
    platform: "Hashnode",
    url: "https://hashnode.com/example2",
    views: 5234,
    likes: 412,
    comments: 67,
    shares: 45,
    tags: ["DevOps", "Tooling", "Monorepo"],
    status: "published",
  },
  {
    id: "6",
    title: "Testing Strategies for Modern React Apps",
    excerpt: "A comprehensive guide to testing React applications with Jest, Testing Library, and Playwright...",
    publishedAt: "3 weeks ago",
    platform: "dev.to",
    url: "https://dev.to/example3",
    views: 1876,
    likes: 156,
    comments: 34,
    shares: 18,
    tags: ["Testing", "React", "Jest"],
    status: "published",
  },
]

export default function PublishedPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  // Calculate stats
  const totalViews = publishedPosts.reduce((sum, post) => sum + post.views, 0)
  const totalLikes = publishedPosts.reduce((sum, post) => sum + post.likes, 0)
  const totalComments = publishedPosts.reduce((sum, post) => sum + post.comments, 0)
  const avgEngagement = ((totalLikes + totalComments) / publishedPosts.length).toFixed(0)

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h1
          className="text-2xl tracking-tight text-white"
          style={{
            fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
            fontWeight: 600,
          }}
        >
          Published Content
        </h1>
        <p
          className="text-sm text-white/60 mt-1"
          style={{
            fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
          }}
        >
          Track and manage your published posts across all platforms
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-xs text-white/60"
                style={{
                  fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                }}
              >
                Total published
              </p>
              <p
                className="text-2xl tracking-tight mt-1"
                style={{
                  fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                  fontWeight: 600,
                }}
              >
                {publishedPosts.length}
              </p>
              <p
                className="text-xs text-emerald-300 mt-1"
                style={{
                  fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                }}
              >
                +6 this month
              </p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-300" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-xs text-white/60"
                style={{
                  fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                }}
              >
                Total views
              </p>
              <p
                className="text-2xl tracking-tight mt-1"
                style={{
                  fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                  fontWeight: 600,
                }}
              >
                {totalViews.toLocaleString()}
              </p>
              <p
                className="text-xs text-emerald-300 mt-1"
                style={{
                  fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                }}
              >
                +24% vs last month
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
              <p
                className="text-xs text-white/60"
                style={{
                  fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                }}
              >
                Total engagement
              </p>
              <p
                className="text-2xl tracking-tight mt-1"
                style={{
                  fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                  fontWeight: 600,
                }}
              >
                {(totalLikes + totalComments).toLocaleString()}
              </p>
              <p
                className="text-xs text-white/60 mt-1"
                style={{
                  fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                }}
              >
                Likes + Comments
              </p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white/80" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-xs text-white/60"
                style={{
                  fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                }}
              >
                Avg. engagement
              </p>
              <p
                className="text-2xl tracking-tight mt-1"
                style={{
                  fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                  fontWeight: 600,
                }}
              >
                {avgEngagement}
              </p>
              <p
                className="text-xs text-emerald-300 mt-1"
                style={{
                  fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                }}
              >
                Per post
              </p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white/80" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and search */}
      <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search published posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-black ring-1 ring-white/10 pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-white/20"
              style={{
                fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
              }}
            />
          </div>

          {/* Platform filter */}
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="rounded-lg bg-black ring-1 ring-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:ring-white/20 cursor-pointer"
            style={{
              fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
            }}
          >
            <option value="all">All platforms</option>
            <option value="dev.to">dev.to</option>
            <option value="hashnode">Hashnode</option>
            <option value="personal">Personal Blog</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg bg-black ring-1 ring-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:ring-white/20 cursor-pointer"
            style={{
              fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
            }}
          >
            <option value="recent">Most recent</option>
            <option value="views">Most viewed</option>
            <option value="engagement">Most engaged</option>
          </select>
        </div>
      </div>

      {/* Published posts list */}
      <div className="space-y-4">
        {publishedPosts.map((post) => (
          <div
            key={post.id}
            className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5 hover:ring-white/20 transition cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs text-emerald-300 bg-emerald-500/10 ring-1 ring-emerald-500/20 px-2 py-0.5 rounded-full"
                    style={{
                      fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                    }}
                  >
                    Published
                  </span>
                  <span
                    className="text-xs text-white/60"
                    style={{
                      fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                    }}
                  >
                    {post.platform}
                  </span>
                  <span className="text-xs text-white/40">•</span>
                  <span
                    className="text-xs text-white/60"
                    style={{
                      fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                    }}
                  >
                    {post.publishedAt}
                  </span>
                </div>

                <h3
                  className="text-lg text-white/90 mb-2"
                  style={{
                    fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {post.title}
                </h3>

                <p
                  className="text-sm text-white/60 mb-3 line-clamp-2"
                  style={{
                    fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                  }}
                >
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-white/70 bg-white/5 ring-1 ring-white/10 px-2 py-0.5 rounded-full"
                      style={{
                        fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                    <span
                      className="text-xs text-white/70"
                      style={{
                        fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                      }}
                    >
                      {post.views.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                    <span
                      className="text-xs text-white/70"
                      style={{
                        fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                      }}
                    >
                      {post.likes}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                    <span
                      className="text-xs text-white/70"
                      style={{
                        fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                      }}
                    >
                      {post.comments}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Share2 className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                    <span
                      className="text-xs text-white/70"
                      style={{
                        fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                      }}
                    >
                      {post.shares}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10 p-2 transition"
                >
                  <ExternalLink className="w-4 h-4 text-white/80" strokeWidth={1.5} />
                </a>
                <button className="rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10 p-2 transition">
                  <BarChart3 className="w-4 h-4 text-white/80" strokeWidth={1.5} />
                </button>
                <button className="rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10 p-2 transition">
                  <MoreVertical className="w-4 h-4 text-white/80" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance insights */}
      <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-lg tracking-tight"
            style={{
              fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
              fontWeight: 600,
            }}
          >
            Top Performing Posts
          </h2>
          <a
            href="#analytics"
            className="text-xs text-white/70 hover:text-white"
            style={{
              fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
            }}
          >
            View all analytics →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {publishedPosts
            .sort((a, b) => b.views - a.views)
            .slice(0, 3)
            .map((post, index) => (
              <div key={post.id} className="rounded-lg bg-black ring-1 ring-white/10 p-4">
                <div className="flex items-start justify-between mb-2">
                  <span
                    className="text-xs text-white/60"
                    style={{
                      fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                    }}
                  >
                    #{index + 1} Most viewed
                  </span>
                  <Globe className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                </div>
                <p
                  className="text-sm text-white/90 mb-3 line-clamp-2"
                  style={{
                    fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                  }}
                >
                  {post.title}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs text-white/60"
                    style={{
                      fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                    }}
                  >
                    {post.views.toLocaleString()} views
                  </span>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/70 hover:text-white"
                    style={{
                      fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                    }}
                  >
                    View →
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
