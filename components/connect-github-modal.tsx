"use client"

import { useState } from "react"
import { Github, Lock, X, Check } from "lucide-react"
import { useRouter } from "next/navigation"

interface ConnectGitHubModalProps {
  isOpen: boolean
  onClose: () => void
  currentRepoCount?: number
  maxRepos?: number
}

export function ConnectGitHubModal({
  isOpen,
  onClose,
  currentRepoCount = 0,
  maxRepos = 2,
}: ConnectGitHubModalProps) {
  const router = useRouter()
  const [isConnecting, setIsConnecting] = useState(false)

  if (!isOpen) return null

  const handleConnect = async () => {
    setIsConnecting(true)
    // Redirect to OAuth flow
    window.location.href = "/api/auth/github"
  }

  const remainingSlots = maxRepos - currentRepoCount

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-lg rounded-2xl bg-black ring-1 ring-white/10 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-lg p-2 hover:bg-white/10 transition"
          >
            <X className="w-4 h-4 text-white/60" strokeWidth={1.5} />
          </button>

          {/* Header */}
          <div className="p-8 border-b border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Github className="w-6 h-6 text-white/90" strokeWidth={1.5} />
              </div>
              <div>
                <h2
                  className="text-xl tracking-tight text-white"
                  style={{
                    fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Connect GitHub
                </h2>
                <p
                  className="text-sm text-white/60"
                  style={{
                    fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                  }}
                >
                  Import your repositories and commits
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Plan info */}
            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <p
                  className="text-sm text-white/90"
                  style={{
                    fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                  }}
                >
                  Your plan allows
                </p>
                <span
                  className="text-lg text-white tracking-tight"
                  style={{
                    fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {maxRepos === Infinity ? "∞" : maxRepos} repos
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all"
                    style={{
                      width: `${Math.min((currentRepoCount / maxRepos) * 100, 100)}%`,
                    }}
                  />
                </div>
                <p
                  className="text-xs text-white/60"
                  style={{
                    fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                  }}
                >
                  {currentRepoCount} of {maxRepos === Infinity ? "∞" : maxRepos}
                </p>
              </div>
              {remainingSlots > 0 && remainingSlots !== Infinity && (
                <p
                  className="text-xs text-emerald-300 mt-2"
                  style={{
                    fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                  }}
                >
                  {remainingSlots} slot{remainingSlots !== 1 ? "s" : ""} remaining
                </p>
              )}
              {remainingSlots <= 0 && (
                <p
                  className="text-xs text-amber-300 mt-2"
                  style={{
                    fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                  }}
                >
                  No slots remaining. Disconnect a repo or upgrade your plan.
                </p>
              )}
            </div>

            {/* Permissions */}
            <div className="space-y-3 mb-6">
              <p
                className="text-sm text-white/90"
                style={{
                  fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                  fontWeight: 600,
                }}
              >
                We'll request access to:
              </p>

              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Check className="w-4 h-4 text-emerald-300" strokeWidth={2} />
                  </div>
                  <div>
                    <p
                      className="text-sm text-white/90"
                      style={{
                        fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                      }}
                    >
                      Read your repositories
                    </p>
                    <p
                      className="text-xs text-white/60"
                      style={{
                        fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                      }}
                    >
                      View public and private repos you have access to
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Check className="w-4 h-4 text-emerald-300" strokeWidth={2} />
                  </div>
                  <div>
                    <p
                      className="text-sm text-white/90"
                      style={{
                        fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                      }}
                    >
                      Access commit history
                    </p>
                    <p
                      className="text-xs text-white/60"
                      style={{
                        fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                      }}
                    >
                      Read commit messages, authors, and diff statistics
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Lock className="w-4 h-4 text-emerald-300" strokeWidth={2} />
                  </div>
                  <div>
                    <p
                      className="text-sm text-white/90"
                      style={{
                        fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                      }}
                    >
                      Read-only access
                    </p>
                    <p
                      className="text-xs text-white/60"
                      style={{
                        fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                      }}
                    >
                      We never write to your repositories or modify code
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy note */}
            <div className="rounded-lg bg-white/5 ring-1 ring-white/10 p-3 mb-6">
              <p
                className="text-xs text-white/70"
                style={{
                  fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                }}
              >
                <Lock className="w-3 h-3 inline mr-1" strokeWidth={1.5} />
                Your code stays private. We only read commit metadata to generate
                content. You can revoke access anytime.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10 px-4 py-3 text-sm text-white/90 transition"
                style={{
                  fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConnect}
                disabled={isConnecting || remainingSlots <= 0}
                className="flex-1 rounded-lg bg-white text-black hover:bg-white/90 px-4 py-3 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{
                  fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                }}
              >
                <Github className="w-4 h-4" strokeWidth={1.5} />
                {isConnecting ? "Connecting..." : "Continue with GitHub"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
