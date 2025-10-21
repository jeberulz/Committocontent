"use client"

import { Github, GitCommit, Clock, Loader2, AlertCircle } from "lucide-react"
import { Doc } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useState } from "react"
import { toast } from "sonner"

interface RepositoryCardProps {
  repository: Doc<"repositories"> & {
    totalCommits: number
    newCommits: number
  }
  onGenerate?: (repoId: string) => void
}

export function RepositoryCard({ repository, onGenerate }: RepositoryCardProps) {
  const [isDisconnecting, setIsDisconnecting] = useState(false)
  const toggleActive = useMutation(api.repositories.toggleActive)
  const disconnect = useMutation(api.repositories.disconnect)

  const handleToggleActive = async () => {
    try {
      await toggleActive({ repositoryId: repository._id })
      toast.success(repository.isActive ? "Repository paused" : "Repository activated")
    } catch (error) {
      toast.error("Failed to toggle repository status")
      console.error(error)
    }
  }

  const handleDisconnect = async () => {
    if (!confirm(`Are you sure you want to disconnect ${repository.name}? This will delete all associated commits.`)) {
      return
    }

    setIsDisconnecting(true)
    try {
      await disconnect({ repositoryId: repository._id })
      toast.success("Repository disconnected successfully")
    } catch (error) {
      toast.error("Failed to disconnect repository")
      console.error(error)
      setIsDisconnecting(false)
    }
  }

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return "just now"
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5 hover:ring-white/20 transition group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
            <Github className="w-4 h-4 text-white/80" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-sm text-white/90" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif', fontWeight: 600 }}>
              {repository.name}
            </h3>
            <p className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
              {repository.owner}
            </p>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          {repository.isActive ? (
            <span className="h-2 w-2 bg-emerald-500 rounded-full" title="Active"></span>
          ) : (
            <span className="h-2 w-2 bg-white/40 rounded-full" title="Paused"></span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="rounded-lg bg-black ring-1 ring-white/10 p-3">
          <div className="flex items-center gap-2 mb-1">
            <GitCommit className="w-3.5 h-3.5 text-white/60" strokeWidth={1.5} />
            <p className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
              Total commits
            </p>
          </div>
          <p className="text-lg tracking-tight" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif', fontWeight: 600 }}>
            {repository.totalCommits}
          </p>
        </div>

        <div className="rounded-lg bg-black ring-1 ring-white/10 p-3">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-3.5 h-3.5 text-emerald-300" strokeWidth={1.5} />
            <p className="text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
              New commits
            </p>
          </div>
          <p className="text-lg tracking-tight text-emerald-300" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif', fontWeight: 600 }}>
            {repository.newCommits}
          </p>
        </div>
      </div>

      {/* Meta info */}
      <div className="flex items-center gap-3 mb-4 text-xs text-white/60" style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" strokeWidth={1.5} />
          <span>Last sync: {formatTimeAgo(repository.lastSyncedAt)}</span>
        </div>
        {repository.language && (
          <>
            <span>•</span>
            <span>{repository.language}</span>
          </>
        )}
        {repository.isPrivate && (
          <>
            <span>•</span>
            <span className="text-amber-300">Private</span>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {repository.newCommits > 0 && (
          <button
            onClick={() => onGenerate?.(repository._id)}
            className="flex-1 rounded-lg bg-white text-black hover:bg-white/90 px-4 py-2 text-sm font-medium transition"
            style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}
          >
            Generate Content
          </button>
        )}

        {repository.newCommits === 0 && (
          <a
            href={repository.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10 px-4 py-2 text-sm text-white/90 text-center transition"
            style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}
          >
            View on GitHub →
          </a>
        )}

        <button
          onClick={handleToggleActive}
          className="rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10 px-4 py-2 text-xs text-white/90 transition"
          style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}
        >
          {repository.isActive ? "Pause" : "Resume"}
        </button>

        <button
          onClick={handleDisconnect}
          disabled={isDisconnecting}
          className="rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-red-500/10 hover:ring-red-500/20 px-4 py-2 text-xs text-white/90 hover:text-red-300 transition disabled:opacity-50"
          style={{ fontFamily: 'Geist, var(--font-geist-sans), Inter, sans-serif' }}
        >
          {isDisconnecting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            "Disconnect"
          )}
        </button>
      </div>
    </div>
  )
}
