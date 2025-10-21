"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Github, Check, Loader2, AlertCircle, ChevronLeft, Lock, Globe } from "lucide-react"
import { toast } from "sonner"

interface GitHubRepository {
  id: number
  name: string
  fullName: string
  owner: string
  url: string
  language: string | null
  isPrivate: boolean
  description: string | null
  stars: number
  forks: number
  updatedAt: string
  pushedAt: string
  isConnected: boolean
}

export default function RepositorySelectionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [repositories, setRepositories] = useState<GitHubRepository[]>([])
  const [selectedRepos, setSelectedRepos] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isImporting, setIsImporting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const currentUser = useQuery(api.users.current)
  const repoCount = useQuery(api.repositories.getCount)

  // TODO: Get max repos from user's plan
  const maxRepos = 2

  useEffect(() => {
    // Show success message if just connected
    if (searchParams?.get("connected") === "true") {
      toast.success("GitHub connected successfully! Select repositories to import.")
    }

    // Fetch available repositories
    fetchRepositories()
  }, [searchParams])

  const fetchRepositories = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/repositories/import")

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to fetch repositories")
      }

      const data = await response.json()
      setRepositories(data.repositories)

      // Pre-select already connected repositories
      const connected = data.repositories
        .filter((r: GitHubRepository) => r.isConnected)
        .map((r: GitHubRepository) => r.id)
      setSelectedRepos(connected)
    } catch (error) {
      console.error("Error fetching repositories:", error)
      toast.error("Failed to fetch GitHub repositories")

      // If token is invalid, redirect back to repositories page
      if (error instanceof Error && error.message.includes("token")) {
        router.push("/dashboard/repositories")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleRepo = (repoId: number, isConnected: boolean) => {
    if (isConnected) {
      // Don't allow deselecting already connected repos from this page
      toast.info("To disconnect a repository, go to the repositories page")
      return
    }

    setSelectedRepos((prev) => {
      const isSelected = prev.includes(repoId)
      const currentCount = repoCount || 0
      const newSelections = prev.filter(id => !repositories.find(r => r.id === id)?.isConnected).length

      if (!isSelected) {
        // Check if adding this would exceed the limit
        if (currentCount + newSelections + 1 > maxRepos) {
          toast.error(`You can only connect ${maxRepos} repositories on your current plan`)
          return prev
        }
        return [...prev, repoId]
      } else {
        return prev.filter((id) => id !== repoId)
      }
    })
  }

  const handleImport = async () => {
    // Filter out already connected repos
    const newReposToImport = selectedRepos.filter(
      id => !repositories.find(r => r.id === id)?.isConnected
    )

    if (newReposToImport.length === 0) {
      toast.info("No new repositories selected to import")
      return
    }

    setIsImporting(true)
    try {
      const response = await fetch("/api/repositories/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repositoryIds: newReposToImport,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to import repositories")
      }

      toast.success(data.message || "Repositories imported successfully!")

      // Redirect to repositories page
      router.push("/dashboard/repositories")
    } catch (error) {
      console.error("Error importing repositories:", error)
      toast.error("Failed to import repositories")
    } finally {
      setIsImporting(false)
    }
  }

  const filteredRepositories = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repo.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repo.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const newSelectionsCount = selectedRepos.filter(
    id => !repositories.find(r => r.id === id)?.isConnected
  ).length

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (seconds < 60) return "just now"
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    if (days < 30) return `${days}d ago`
    const months = Math.floor(days / 30)
    if (months < 12) return `${months}mo ago`
    const years = Math.floor(months / 12)
    return `${years}y ago`
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-white/60 animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/dashboard/repositories")}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition mb-4"
          style={{
            fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
          }}
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
          Back to repositories
        </button>

        <h1
          className="text-2xl tracking-tight text-white mb-2"
          style={{
            fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
            fontWeight: 600,
          }}
        >
          Select Repositories to Import
        </h1>
        <p
          className="text-sm text-white/60"
          style={{
            fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
          }}
        >
          Choose which repositories you want to connect and track commits from
        </p>
      </div>

      {/* Selection Info */}
      <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-sm text-white/90"
              style={{
                fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
              }}
            >
              Repository Slots
            </p>
            <p
              className="text-xs text-white/60 mt-1"
              style={{
                fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
              }}
            >
              {newSelectionsCount} new selection{newSelectionsCount !== 1 ? "s" : ""}, {repoCount || 0} already connected
            </p>
          </div>
          <div
            className="text-lg text-white tracking-tight"
            style={{
              fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
              fontWeight: 600,
            }}
          >
            {(repoCount || 0) + newSelectionsCount} / {maxRepos}
          </div>
        </div>

        {(repoCount || 0) + newSelectionsCount >= maxRepos && (
          <p
            className="text-xs text-amber-300 mt-3"
            style={{
              fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
            }}
          >
            <AlertCircle className="w-3 h-3 inline mr-1" strokeWidth={1.5} />
            You've reached your plan limit. Upgrade to connect more repositories.
          </p>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search repositories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg bg-white/5 ring-1 ring-white/10 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-white/20"
          style={{
            fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
          }}
        />
      </div>

      {/* Repository List */}
      <div className="space-y-3 mb-6">
        {filteredRepositories.length === 0 ? (
          <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-12 text-center">
            <Github className="w-12 h-12 text-white/40 mx-auto mb-4" strokeWidth={1.5} />
            <p
              className="text-white/60"
              style={{
                fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
              }}
            >
              No repositories found
            </p>
          </div>
        ) : (
          filteredRepositories.map((repo) => {
            const isSelected = selectedRepos.includes(repo.id)
            const isConnected = repo.isConnected

            return (
              <div
                key={repo.id}
                onClick={() => handleToggleRepo(repo.id, isConnected)}
                className={`rounded-xl ring-1 p-5 transition cursor-pointer ${
                  isConnected
                    ? "bg-emerald-500/5 ring-emerald-500/20"
                    : isSelected
                    ? "bg-white/10 ring-white/20"
                    : "bg-white/5 ring-white/10 hover:ring-white/20"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Github className="w-5 h-5 text-white/80" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3
                          className="text-sm text-white/90"
                          style={{
                            fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                            fontWeight: 600,
                          }}
                        >
                          {repo.name}
                        </h3>
                        <span className="text-xs text-white/40">
                          {repo.isPrivate ? (
                            <Lock className="w-3 h-3" strokeWidth={1.5} />
                          ) : (
                            <Globe className="w-3 h-3" strokeWidth={1.5} />
                          )}
                        </span>
                      </div>
                      <p
                        className="text-xs text-white/60 mt-1"
                        style={{
                          fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                        }}
                      >
                        {repo.owner}
                      </p>
                      {repo.description && (
                        <p
                          className="text-xs text-white/50 mt-2 line-clamp-2"
                          style={{
                            fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                          }}
                        >
                          {repo.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-3 text-xs text-white/40">
                        {repo.language && (
                          <span>{repo.language}</span>
                        )}
                        <span>★ {repo.stars}</span>
                        <span>Last push: {formatTimeAgo(repo.pushedAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`h-6 w-6 rounded-full ring-2 flex items-center justify-center transition ${
                      isConnected
                        ? "bg-emerald-500 ring-emerald-500"
                        : isSelected
                        ? "bg-white ring-white"
                        : "ring-white/30"
                    }`}
                  >
                    {(isSelected || isConnected) && (
                      <Check className="w-3.5 h-3.5 text-black" strokeWidth={2} />
                    )}
                  </div>
                </div>

                {isConnected && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p
                      className="text-xs text-emerald-300"
                      style={{
                        fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                      }}
                    >
                      Already connected
                    </p>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 sticky bottom-0 bg-black/80 backdrop-blur-sm p-4 -mx-4 border-t border-white/10">
        <button
          onClick={() => router.push("/dashboard/repositories")}
          className="flex-1 rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10 px-4 py-3 text-sm text-white/90 transition"
          style={{
            fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
          }}
          disabled={isImporting}
        >
          Cancel
        </button>
        <button
          onClick={handleImport}
          disabled={isImporting || newSelectionsCount === 0}
          className="flex-1 rounded-lg bg-white text-black hover:bg-white/90 px-4 py-3 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{
            fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
          }}
        >
          {isImporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Importing...
            </>
          ) : (
            <>
              Import {newSelectionsCount} Repositor{newSelectionsCount !== 1 ? "ies" : "y"}
            </>
          )}
        </button>
      </div>
    </div>
  )
}