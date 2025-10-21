"use client"

import { useState, useEffect } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { RepositoryCard } from "@/components/repository-card"
import { ConnectGitHubModal } from "@/components/connect-github-modal"
import { Github, Plus, Loader2, AlertCircle } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { toast } from "sonner"

export default function RepositoriesPage() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const currentUser = useQuery(api.users.current)
  const repositories = useQuery(api.repositories.list)
  const repoCount = useQuery(api.repositories.getCount)
  const hasToken = useQuery(api.githubTokens.hasToken)
  const searchParams = useSearchParams()

  // Redirect to setup if user doesn't exist in Convex
  useEffect(() => {
    if (currentUser === null) {
      router.push("/dashboard/test-convex")
      toast.error("Please complete user setup first")
    }
  }, [currentUser, router])

  // Show success toast if just connected
  useEffect(() => {
    if (searchParams?.get("connected") === "true") {
      toast.success("GitHub connected successfully!")
    }
    if (searchParams?.get("error")) {
      toast.error("Failed to connect GitHub. Please try again.")
    }
  }, [searchParams])

  // Determine max repos based on plan (TODO: Get from Clerk metadata)
  const maxRepos = 2 // Starter plan default
  const isLoading = currentUser === undefined || repositories === undefined || repoCount === undefined || hasToken === undefined

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-white/60 animate-spin" />
      </div>
    )
  }

  // If user doesn't exist, the useEffect will redirect
  if (currentUser === null) {
    return null
  }

  const handleGenerate = (repoId: string) => {
    // TODO: Navigate to content generation page
    toast.info("Content generation coming soon!")
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-2xl tracking-tight text-white"
            style={{
              fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
              fontWeight: 600,
            }}
          >
            Repositories
          </h1>
          <p
            className="text-sm text-white/60 mt-1"
            style={{
              fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
            }}
          >
            Manage your connected GitHub repositories
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-white text-black hover:bg-white/90 px-4 py-2.5 text-sm font-medium transition"
          style={{
            fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
          }}
        >
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          Connect Repository
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-xs text-white/60"
                style={{
                  fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                }}
              >
                Connected repositories
              </p>
              <p
                className="text-2xl tracking-tight mt-1"
                style={{
                  fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                  fontWeight: 600,
                }}
              >
                {repoCount}
                <span className="text-white/40 text-base ml-1">
                  / {maxRepos === Infinity ? "∞" : maxRepos}
                </span>
              </p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Github className="w-5 h-5 text-white/80" strokeWidth={1.5} />
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
                Total commits
              </p>
              <p
                className="text-2xl tracking-tight mt-1"
                style={{
                  fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                  fontWeight: 600,
                }}
              >
                {repositories?.reduce((sum, repo) => sum + repo.totalCommits, 0) || 0}
              </p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white/80" strokeWidth={1.5} />
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
                Ready to generate
              </p>
              <p
                className="text-2xl tracking-tight mt-1 text-emerald-300"
                style={{
                  fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                  fontWeight: 600,
                }}
              >
                {repositories?.reduce((sum, repo) => sum + repo.newCommits, 0) || 0}
              </p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-emerald-300" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>

      {/* Repository List or Empty State */}
      {!repositories || repositories.length === 0 ? (
        <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-12">
          <div className="text-center max-w-md mx-auto">
            <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
              <Github className="w-8 h-8 text-white/60" strokeWidth={1.5} />
            </div>
            <h3
              className="text-lg tracking-tight text-white mb-2"
              style={{
                fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
                fontWeight: 600,
              }}
            >
              {hasToken ? "No repositories connected" : "Connect your first repository"}
            </h3>
            <p
              className="text-sm text-white/60 mb-6"
              style={{
                fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
              }}
            >
              {hasToken
                ? "You haven't connected any repositories yet. Connect one to start generating content from your commits."
                : "Connect your GitHub account to import repositories and start turning your commits into publish-ready content."}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-white text-black hover:bg-white/90 px-5 py-2.5 text-sm font-medium transition"
              style={{
                fontFamily: "Geist, var(--font-geist-sans), Inter, sans-serif",
              }}
            >
              <Github className="w-4 h-4" strokeWidth={1.5} />
              Connect GitHub
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repositories.map((repo) => (
            <RepositoryCard key={repo._id} repository={repo} onGenerate={handleGenerate} />
          ))}
        </div>
      )}

      {/* Connect Modal */}
      <ConnectGitHubModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentRepoCount={repoCount || 0}
        maxRepos={maxRepos}
      />
    </>
  )
}
