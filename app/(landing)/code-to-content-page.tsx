'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function CodeToContentLandingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  const prices = {
    starter: { monthly: 25, annual: Math.round(25 * 12 * 0.85) / 12 },
    pro: { monthly: 50, annual: Math.round(50 * 12 * 0.85) / 12 },
    team: { monthly: 199, annual: Math.round(199 * 12 * 0.85) / 12 }
  }

  const getPrice = (plan: 'starter' | 'pro' | 'team') => {
    return isAnnual ? prices[plan].annual.toFixed(0) : prices[plan].monthly
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-30 backdrop-blur bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-semibold tracking-tight font-geist">CodeToContent</span>
              <span className="text-xs text-white/50 hidden sm:inline">beta</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm text-white/70 font-geist">
              <Link href="#product" className="hover:text-white transition">Product</Link>
              <Link href="#how-it-works" className="hover:text-white transition">How it works</Link>
              <Link href="#features" className="hover:text-white transition">Features</Link>
              <Link href="#pricing" className="hover:text-white transition">Pricing</Link>
              <Link href="#faq" className="hover:text-white transition">FAQ</Link>
              <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex text-sm text-white/80 hover:text-white transition rounded-full px-3 py-2 ring-1 ring-white/10 font-geist"
              >
                Log in
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-sm font-semibold text-black rounded-full px-4 py-2 bg-white hover:bg-white/90 shadow ring-1 ring-white/20 font-geist"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Connect GitHub
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="h-[60vh] bg-[radial-gradient(1000px_400px_at_50%_-10%,rgba(255,255,255,0.10),transparent)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 lg:pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Copy */}
            <div className="lg:col-span-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] font-geist font-medium">
                Turn your GitHub commits into publish‑ready posts
              </h1>
              <p className="text-base md:text-lg text-white/70 mt-5 max-w-xl font-geist">
                Ship code. We&apos;ll write the story. CodeToContent converts commits, PRs, and diffs into technical articles, tutorials, and social threads that sound like you.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold bg-white text-black hover:bg-white/90 shadow ring-1 ring-white/20 font-geist"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Connect GitHub — Free 14‑day trial
                </Link>
                <Link
                  href="#demo"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm text-white/90 hover:bg-white/10 ring-1 ring-white/10 font-geist"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/>
                  </svg>
                  Watch 60‑second demo
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-white/60">
                <div className="flex -space-x-2">
                  <Image alt="user" className="h-8 w-8 rounded-full ring-2 ring-black object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" width={32} height={32} />
                  <Image alt="user" className="h-8 w-8 rounded-full ring-2 ring-black object-cover" src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&auto=format&fit=crop" width={32} height={32} />
                  <Image alt="user" className="h-8 w-8 rounded-full ring-2 ring-black object-cover" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop" width={32} height={32} />
                </div>
                <span className="font-geist">Trusted by 3,200+ developers and small teams</span>
                <span className="inline-flex items-center gap-1 text-emerald-300 font-geist">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  Private by default — repo‑level control
                </span>
              </div>
            </div>

            {/* Product Mockup */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur shadow-[0_20px_120px_-20px_rgba(0,0,0,0.7)]">
                {/* Window chrome */}
                <div className="flex sm:px-6 border-white/10 border-b pt-3 pr-4 pb-3 pl-4 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500/90"></span>
                    <span className="h-3 w-3 rounded-full bg-amber-400/90"></span>
                    <span className="h-3 w-3 rounded-full bg-emerald-500/90"></span>
                    <div className="ml-3 text-sm text-white/70 font-geist">CodeToContent — Preview</div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <button className="rounded-lg p-2 hover:bg-white/10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white/80">
                        <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"></path>
                        <path d="m14 7 3 3"></path>
                        <path d="M5 6v4"></path>
                        <path d="M19 14v4"></path>
                        <path d="M10 2v2"></path>
                        <path d="M7 8H3"></path>
                        <path d="M21 16h-4"></path>
                        <path d="M11 3H9"></path>
                      </svg>
                    </button>
                    <button className="rounded-lg p-2 hover:bg-white/10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white/60">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Content grid */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Commits */}
                  <aside className="p-4 sm:p-6 border-b md:border-b-0 md:border-r border-white/10">
                    <p className="text-xs uppercase tracking-wider text-white/50 mb-3 font-geist">Recent commits</p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 rounded-lg p-3 bg-white/5 ring-1 ring-white/10">
                        <div className="mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-300">
                            <circle cx="12" cy="12" r="3"></circle>
                            <line x1="3" x2="9" y1="12" y2="12"></line>
                            <line x1="15" x2="21" y1="12" y2="12"></line>
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-white/90 truncate font-geist">feat: add image optimization and lazy loading</p>
                          <p className="text-[11px] text-white/50">+142 −36 in /app/routes</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 rounded-lg p-3 bg-white/5 ring-1 ring-white/10">
                        <div className="mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-300">
                            <circle cx="12" cy="12" r="3"></circle>
                            <line x1="3" x2="9" y1="12" y2="12"></line>
                            <line x1="15" x2="21" y1="12" y2="12"></line>
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-white/90 truncate font-geist">fix: race condition in webhook handler</p>
                          <p className="text-[11px] text-white/50">+28 −11 in /services/webhooks.ts</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 rounded-lg p-3 bg-white/5 ring-1 ring-white/10">
                        <div className="mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-300">
                            <circle cx="12" cy="12" r="3"></circle>
                            <line x1="3" x2="9" y1="12" y2="12"></line>
                            <line x1="15" x2="21" y1="12" y2="12"></line>
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-white/90 truncate font-geist">chore: migrate to pnpm and turbo</p>
                          <p className="text-[11px] text-white/50">+6 −6 in /</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-white/60 font-geist">Select commits →</span>
                      <button className="inline-flex items-center gap-2 text-xs rounded-full px-3 py-1.5 bg-white text-black hover:bg-white/90 ring-1 ring-white/20 font-geist">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                          <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"></path>
                          <path d="m14 7 3 3"></path>
                          <path d="M5 6v4"></path>
                          <path d="M19 14v4"></path>
                          <path d="M10 2v2"></path>
                          <path d="M7 8H3"></path>
                          <path d="M21 16h-4"></path>
                          <path d="M11 3H9"></path>
                        </svg>
                        Generate draft
                      </button>
                    </div>
                  </aside>
                  {/* Draft */}
                  <section className="p-4 sm:p-6">
                    <p className="text-xs uppercase tracking-wider text-white/50 mb-3 font-geist">Generated Article</p>
                    <div className="rounded-lg p-4 bg-white/5 ring-1 ring-white/10">
                      <h3 className="text-lg tracking-tight mb-1 font-geist font-medium">
                        Optimizing Images with Lazy Loading and Responsive Srcsets
                      </h3>
                      <p className="text-sm text-white/70 font-geist">
                        This week I refactored our asset pipeline to ship the smallest possible images for every device. Here&apos;s the why, the trade‑offs, and the exact code changes across routes and the loader…
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="text-[11px] text-white/70 bg-white/5 ring-1 ring-white/10 px-2 py-1 rounded-full font-geist">React</span>
                        <span className="text-[11px] text-white/70 bg-white/5 ring-1 ring-white/10 px-2 py-1 rounded-full font-geist">Performance</span>
                        <span className="text-[11px] text-white/70 bg-white/5 ring-1 ring-white/10 px-2 py-1 rounded-full font-geist">Frontend</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-white/60">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                            <path d="m15 5 4 4"></path>
                          </svg>
                          <span className="font-geist">Edit tone</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="rounded-full px-3 py-1.5 text-xs ring-1 ring-white/10 hover:bg-white/10 font-geist">Export</button>
                          <button className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs bg-white text-black hover:bg-white/90 ring-1 ring-white/20 font-geist">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                              <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                              <path d="m21.854 2.147-10.94 10.939"></path>
                            </svg>
                            Publish
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              {/* Credibility numbers */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <div className="rounded-lg bg-white/5 ring-1 ring-white/10 p-4">
                  <p className="text-2xl tracking-tight font-geist font-semibold">4h+</p>
                  <p className="text-xs text-white/60 font-geist">Avg time saved per post</p>
                </div>
                <div className="rounded-lg bg-white/5 ring-1 ring-white/10 p-4">
                  <p className="text-2xl tracking-tight font-geist font-semibold">10k+</p>
                  <p className="text-xs text-white/60 font-geist">Repos connected</p>
                </div>
                <div className="rounded-lg bg-white/5 ring-1 ring-white/10 p-4">
                  <p className="text-2xl tracking-tight font-geist font-semibold">98%</p>
                  <p className="text-xs text-white/60 font-geist">Say drafts &quot;sound like me&quot;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl tracking-tight font-geist font-medium">From code to content in 3 steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
              <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <p className="text-lg tracking-tight font-geist font-semibold">Connect GitHub</p>
              <p className="text-sm text-white/70 mt-1.5 font-geist">Select repos and scopes. We only read commits and PR metadata you allow.</p>
            </div>
            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
              <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
              </div>
              <p className="text-lg tracking-tight font-geist font-semibold">Generate drafts</p>
              <p className="text-sm text-white/70 mt-1.5 font-geist">We transform diffs into narratives with accurate explanations and code blocks.</p>
            </div>
            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
              <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <p className="text-lg tracking-tight font-geist font-semibold">Publish anywhere</p>
              <p className="text-sm text-white/70 mt-1.5 font-geist">Push to dev.to, Hashnode, or your blog with one click, then share social snippets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl tracking-tight font-geist font-medium">Features that ship your story faster</h2>
          <p className="text-white/70 mt-3 max-w-2xl font-geist">Everything you need to turn invisible work into visible expertise.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {[
              { icon: '1010', title: 'Developer‑grade accuracy', desc: 'Understands code, diffs, and context—writes like a dev, not a bot.' },
              { icon: '📋', title: 'Proven templates', desc: '"How I built X," "Debugging Y," "Why Z tech"—optimized for engagement.' },
              { icon: 'Aa', title: 'Custom tone + voice', desc: 'Set your style once—concise, friendly, academic—and reuse.' },
              { icon: '📢', title: 'Auto social snippets', desc: 'Get tweet/thread and LinkedIn intros derived from your post.' },
              { icon: '🧠', title: 'Learns your patterns', desc: 'Improves with each repo and edit—like a teammate who knows your stack.' },
              { icon: '☁️', title: 'One‑click publish', desc: 'Push to dev.to, Hashnode, or static site CMS with canonical links.' },
            ].map((feature, i) => (
              <div key={i} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
                <div className="text-2xl mb-3">{feature.icon}</div>
                <p className="mt-3 text-lg tracking-tight font-geist font-semibold">{feature.title}</p>
                <p className="text-sm text-white/70 mt-1.5 font-geist">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl tracking-tight font-geist font-medium">Simple pricing for shipping more content</h2>
          <p className="text-white/70 mt-3 max-w-2xl font-geist">14‑day free trial. No credit card required. Cancel anytime.</p>

          {/* Billing toggle */}
          <div className="mt-6 flex items-center gap-3">
            <span className="text-xs text-white/60 font-geist">Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/10 ring-1 ring-white/10"
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${isAnnual ? 'translate-x-5' : 'translate-x-0'}`}></span>
            </button>
            <span className="text-xs text-white/60 font-geist">Annual <span className="text-emerald-300">Save 15%</span></span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Starter */}
            <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 p-6 flex flex-col">
              <div className="flex items-center justify-between">
                <p className="text-lg tracking-tight font-geist font-semibold">Starter</p>
                <span className="text-[11px] text-white/60 ring-1 ring-white/10 px-2 py-1 rounded-full font-geist">Solo devs</span>
              </div>
              <p className="mt-3">
                <span className="text-3xl tracking-tight font-geist font-semibold">${getPrice('starter')}</span>
                <span className="text-sm text-white/60">/mo</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm flex-grow">
                <li className="flex items-start gap-2">✓ Connect 2 repos</li>
                <li className="flex items-start gap-2">✓ 8 drafts / month</li>
                <li className="flex items-start gap-2">✓ Templates & basic tone</li>
              </ul>
              <Link href="/dashboard" className="mt-6 inline-flex justify-center rounded-full px-4 py-2 text-sm bg-white text-black hover:bg-white/90 ring-1 ring-white/20 font-geist">Start free</Link>
            </div>
            {/* Pro */}
            <div className="rounded-2xl ring-2 ring-white/30 bg-white/10 p-6 flex flex-col relative">
              <span className="absolute -top-3 right-4 text-[11px] bg-white text-black px-2 py-1 rounded-full ring-1 ring-white/20 font-geist">Most popular</span>
              <div className="flex items-center justify-between">
                <p className="text-lg tracking-tight font-geist font-semibold">Pro</p>
                <span className="text-[11px] text-white/60 ring-1 ring-white/10 px-2 py-1 rounded-full font-geist">Power users</span>
              </div>
              <p className="mt-3">
                <span className="text-3xl tracking-tight font-geist font-semibold">${getPrice('pro')}</span>
                <span className="text-sm text-white/60">/mo</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm flex-grow">
                <li className="flex items-start gap-2">✓ Unlimited repos</li>
                <li className="flex items-start gap-2">✓ 30 drafts / month</li>
                <li className="flex items-start gap-2">✓ Advanced tone + style memory</li>
                <li className="flex items-start gap-2">✓ Social snippets + scheduler</li>
                <li className="flex items-start gap-2">✓ Analytics</li>
              </ul>
              <Link href="/dashboard" className="mt-6 inline-flex justify-center rounded-full px-4 py-2 text-sm bg-white text-black hover:bg-white/90 ring-1 ring-white/20 font-geist">Start free</Link>
            </div>
            {/* Team */}
            <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 p-6 flex flex-col">
              <div className="flex items-center justify-between">
                <p className="text-lg tracking-tight font-geist font-semibold">Team</p>
                <span className="text-[11px] text-white/60 ring-1 ring-white/10 px-2 py-1 rounded-full font-geist">Small teams</span>
              </div>
              <p className="mt-3">
                <span className="text-3xl tracking-tight font-geist font-semibold">${getPrice('team')}</span>
                <span className="text-sm text-white/60">/mo</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm flex-grow">
                <li className="flex items-start gap-2">✓ 5 seats included</li>
                <li className="flex items-start gap-2">✓ Shared style guide + approvals</li>
                <li className="flex items-start gap-2">✓ SSO + role permissions</li>
                <li className="flex items-start gap-2">✓ Priority support</li>
              </ul>
              <Link href="/dashboard" className="mt-6 inline-flex justify-center rounded-full px-4 py-2 text-sm bg-white text-black hover:bg-white/90 ring-1 ring-white/20 font-geist">Start free</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl tracking-tight font-geist font-medium">Frequently asked questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[
              { q: 'How do you use my GitHub data?', a: 'We only read the repos and scopes you approve. Content generation uses commit messages, diffs, and PR titles; you can revoke at any time.' },
              { q: 'Will the content be technically accurate?', a: 'Yes—our models are trained to preserve intent and code semantics. You always review and edit before publishing.' },
              { q: 'Can I customize tone and structure?', a: 'Choose templates, set tone, and add notes. We learn from your edits to match your style over time.' },
              { q: 'What&apos;s included in the trial?', a: 'Full access for 14 days. Connect repos, generate drafts, and publish to sandboxes. No credit card required.' },
              { q: 'Do you support team workflows?', a: 'Yes—shared style guide, approvals, role permissions, and analytics on Pro/Team plans.' },
              { q: 'Can I publish to my own blog?', a: 'Export Markdown or push directly via RSS and CMS adapters with canonical URL control.' },
            ].map((faq, i) => (
              <div key={i} className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
                <p className="text-sm text-white/90 font-geist">{faq.q}</p>
                <p className="text-sm text-white/70 mt-1.5 font-geist">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="cta" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="rounded-2xl ring-1 ring-white/10 bg-gradient-to-tr from-white/10 to-transparent p-8 md:p-12">
            <h3 className="text-3xl md:text-5xl tracking-tight font-geist font-medium">Turn this week&apos;s commits into an article—today</h3>
            <p className="text-white/70 mt-3 max-w-2xl font-geist">Start free. Generate your first draft in minutes. Cancel anytime, no lock‑in.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold bg-white text-black hover:bg-white/90 ring-1 ring-white/20 font-geist">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Connect GitHub
              </Link>
              <Link href="#learn" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-white/90 hover:bg-white/10 ring-1 ring-white/10 font-geist">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-sm text-white/80 font-geist">CodeToContent, Inc.</p>
              <p className="text-xs text-white/60 mt-1 font-geist">© {new Date().getFullYear()} All rights reserved.</p>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-xs text-white/60 font-geist">
              <Link href="#status" className="hover:text-white transition">Status</Link>
              <Link href="#privacy" className="hover:text-white transition">Privacy</Link>
              <Link href="#security" className="hover:text-white transition">Security</Link>
              <Link href="#terms" className="hover:text-white transition">Terms</Link>
              <Link href="#contact" className="hover:text-white transition">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
