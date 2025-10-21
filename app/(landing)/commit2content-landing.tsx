'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Commit2ContentPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: "How does CodeToContent work?",
      answer: "Connect your GitHub account, select commits, and our AI analyzes the code changes to generate publish-ready blog posts, tutorials, or social snippets. You can edit the content before publishing."
    },
    {
      question: "What platforms can I publish to?",
      answer: "You can publish directly to dev.to, Hashnode, Medium, or export markdown for your own blog. We support all major developer blogging platforms."
    },
    {
      question: "Do I retain ownership of the generated content?",
      answer: "Yes, absolutely. All content generated from your commits belongs to you. You have full ownership and can use it however you like."
    },
    {
      question: "Can I edit the AI-generated content?",
      answer: "Yes! Every piece of content can be edited in our built-in editor before publishing. We encourage you to add your personal insights and style."
    },
    {
      question: "What if I have a private repository?",
      answer: "Private repositories are fully supported on all paid plans. We use secure OAuth authentication and never store your code permanently."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel anytime from your dashboard. You'll retain access until the end of your billing period with no questions asked."
    }
  ]

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }

  return (
    <div className="min-h-full bg-neutral-950 text-white font-inter">
      {/* Background gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-300/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg"></div>
              <span className="text-xl font-space-grotesk font-bold">CodeToContent</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-neutral-300 hover:text-white transition-colors">How It Works</a>
              <a href="#features" className="text-neutral-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-neutral-300 hover:text-white transition-colors">Pricing</a>
              <a href="#faq" className="text-neutral-300 hover:text-white transition-colors">FAQ</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/sign-in" className="text-neutral-300 hover:text-white transition-colors">Sign In</Link>
              <Link href="/sign-up" className="px-4 py-2 bg-orange-300 text-neutral-950 rounded-lg font-medium hover:bg-orange-400 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-orange-300 mb-6">
                🚀 Transform Your GitHub Activity Into Content
              </div>
              <h1 className="text-5xl lg:text-6xl font-space-grotesk font-bold leading-tight mb-6">
                Turn GitHub Commits Into
                <span className="block text-orange-300">Publish-Ready Posts</span>
              </h1>
              <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
                Stop letting your coding work go unnoticed. CodeToContent automatically transforms your GitHub commits into engaging blog posts, tutorials, and social content—saving you hours while building your personal brand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/sign-up" className="px-8 py-4 bg-orange-300 text-neutral-950 rounded-lg font-semibold text-lg hover:bg-orange-400 transition-all hover:scale-105">
                  Start Creating Content
                </Link>
                <a href="#how-it-works" className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors">
                  See How It Works
                </a>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-space-grotesk font-bold text-orange-300">10K+</div>
                  <div className="text-sm text-neutral-400 mt-1">Posts Generated</div>
                </div>
                <div>
                  <div className="text-3xl font-space-grotesk font-bold text-orange-300">2.5K+</div>
                  <div className="text-sm text-neutral-400 mt-1">Happy Developers</div>
                </div>
                <div>
                  <div className="text-3xl font-space-grotesk font-bold text-orange-300">50+</div>
                  <div className="text-sm text-neutral-400 mt-1">Hours Saved Weekly</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-300/20 to-transparent rounded-2xl blur-3xl"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-neutral-400">feat: Add user authentication</div>
                      <div className="text-xs text-neutral-500 mt-1">→ Blog post generated</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-neutral-400">refactor: Optimize database queries</div>
                      <div className="text-xs text-neutral-500 mt-1">→ Tutorial created</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center flex-shrink-0 mt-1 animate-pulse">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-neutral-400">fix: Resolve memory leak in worker</div>
                      <div className="text-xs text-neutral-500 mt-1">→ Generating content...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="relative z-10 py-12 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-neutral-400 text-sm mb-8">Publish to your favorite platforms</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="text-neutral-300 text-lg font-medium">dev.to</div>
            <div className="text-neutral-300 text-lg font-medium">Hashnode</div>
            <div className="text-neutral-300 text-lg font-medium">Medium</div>
            <div className="text-neutral-300 text-lg font-medium">Ghost</div>
            <div className="text-neutral-300 text-lg font-medium">WordPress</div>
            <div className="text-neutral-300 text-lg font-medium">Markdown Export</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold mb-4">
              Three Simple Steps
            </h2>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
              From commit to published content in minutes, not hours
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute -top-4 -left-4 text-6xl font-space-grotesk font-bold text-orange-300/20">01</div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
                <div className="w-12 h-12 bg-orange-300/20 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-space-grotesk font-bold mb-3">Connect GitHub</h3>
                <p className="text-neutral-300 leading-relaxed">
                  Securely connect your GitHub account with one click. We support both public and private repositories.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 text-6xl font-space-grotesk font-bold text-orange-300/20">02</div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
                <div className="w-12 h-12 bg-orange-300/20 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-space-grotesk font-bold mb-3">Select Commits</h3>
                <p className="text-neutral-300 leading-relaxed">
                  Choose individual commits or entire pull requests. Our AI analyzes the code changes and context.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 text-6xl font-space-grotesk font-bold text-orange-300/20">03</div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
                <div className="w-12 h-12 bg-orange-300/20 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-space-grotesk font-bold mb-3">Edit &amp; Publish</h3>
                <p className="text-neutral-300 leading-relaxed">
                  Review, edit, and customize the generated content. Publish directly to your favorite platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold mb-4">
              Everything You Need to Create Content
            </h2>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
              Powerful features to help you turn code into compelling stories
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-neutral-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-space-grotesk font-bold mb-3">AI-Powered Generation</h3>
              <p className="text-neutral-300 leading-relaxed">
                Advanced AI analyzes your commits to create technically accurate and engaging content that resonates with developers.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-neutral-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-space-grotesk font-bold mb-3">Multiple Content Types</h3>
              <p className="text-neutral-300 leading-relaxed">
                Generate blog posts, technical tutorials, Twitter threads, or LinkedIn posts—all from the same commits.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-neutral-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-space-grotesk font-bold mb-3">Built-in Editor</h3>
              <p className="text-neutral-300 leading-relaxed">
                Polish your content with our intuitive editor. Add code snippets, images, and formatting with ease.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-neutral-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-space-grotesk font-bold mb-3">Direct Publishing</h3>
              <p className="text-neutral-300 leading-relaxed">
                Publish directly to dev.to, Hashnode, Medium, and more. Or export as markdown for your own blog.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-neutral-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-space-grotesk font-bold mb-3">Private Repo Support</h3>
              <p className="text-neutral-300 leading-relaxed">
                Work with private repositories securely. Your code is analyzed in real-time and never permanently stored.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-neutral-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-space-grotesk font-bold mb-3">Analytics Dashboard</h3>
              <p className="text-neutral-300 leading-relaxed">
                Track your content performance with detailed analytics. See what resonates with your audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
              Choose the plan that fits your content creation needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
              <h3 className="text-2xl font-space-grotesk font-bold mb-2">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-space-grotesk font-bold">$25</span>
                <span className="text-neutral-400">/month</span>
              </div>
              <p className="text-neutral-300 mb-6">Perfect for individual developers starting their content journey</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-300 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-300">10 posts per month</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-300 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-300">Public repositories</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-300 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-300">Basic analytics</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-300 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-300">Export to markdown</span>
                </li>
              </ul>
              <Link href="/sign-up?plan=starter" className="block w-full text-center px-6 py-3 bg-white/10 border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-colors">
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-orange-300/20 to-orange-500/20 backdrop-blur-sm border-2 border-orange-300/50 rounded-2xl p-8 hover:from-orange-300/30 hover:to-orange-500/30 transition-all relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-300 text-neutral-950 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-space-grotesk font-bold mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-space-grotesk font-bold">$50</span>
                <span className="text-neutral-400">/month</span>
              </div>
              <p className="text-neutral-300 mb-6">For serious developers building their brand and audience</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-300 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-300">50 posts per month</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-300 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-300">Private repositories</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-300 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-300">Advanced analytics</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-300 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-300">Direct publishing</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-300 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-300">Priority support</span>
                </li>
              </ul>
              <Link href="/sign-up?plan=pro" className="block w-full text-center px-6 py-3 bg-orange-300 text-neutral-950 rounded-lg font-semibold hover:bg-orange-400 transition-colors">
                Get Started
              </Link>
            </div>

            {/* Team Plan */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
              <h3 className="text-2xl font-space-grotesk font-bold mb-2">Team</h3>
              <div className="mb-6">
                <span className="text-4xl font-space-grotesk font-bold">$199</span>
                <span className="text-neutral-400">/month</span>
              </div>
              <p className="text-neutral-300 mb-6">For teams and organizations scaling content production</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-300 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-300">Unlimited posts</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-300 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-300">Up to 10 team members</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-300 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-300">Team collaboration tools</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-300 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-300">Custom branding</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-300 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-300">Dedicated support</span>
                </li>
              </ul>
              <Link href="/sign-up?plan=team" className="block w-full text-center px-6 py-3 bg-white/10 border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 py-24 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-neutral-300">
              Everything you need to know about CodeToContent
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-space-grotesk font-semibold text-lg pr-8">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-orange-300 flex-shrink-0 transition-transform ${
                      expandedFAQ === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-5 text-neutral-300 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-orange-300/20 to-orange-500/20 backdrop-blur-sm border border-orange-300/30 rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-300/10 to-transparent"></div>
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold mb-6">
                Ready to Start Creating Content?
              </h2>
              <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
                Join thousands of developers who are building their personal brand and sharing their knowledge effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/sign-up" className="px-8 py-4 bg-orange-300 text-neutral-950 rounded-lg font-semibold text-lg hover:bg-orange-400 transition-all hover:scale-105">
                  Get Started Free
                </Link>
                <a href="#pricing" className="px-8 py-4 bg-white/10 border border-white/20 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors">
                  View Pricing
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-space-grotesk font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-neutral-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-neutral-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#faq" className="text-neutral-400 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="/changelog" className="text-neutral-400 hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-space-grotesk font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-neutral-400 hover:text-white transition-colors">About</a></li>
                <li><a href="/blog" className="text-neutral-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="/careers" className="text-neutral-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="/contact" className="text-neutral-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-space-grotesk font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/docs" className="text-neutral-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="/guides" className="text-neutral-400 hover:text-white transition-colors">Guides</a></li>
                <li><a href="/api" className="text-neutral-400 hover:text-white transition-colors">API</a></li>
                <li><a href="/support" className="text-neutral-400 hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-space-grotesk font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-neutral-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="/terms" className="text-neutral-400 hover:text-white transition-colors">Terms</a></li>
                <li><a href="/security" className="text-neutral-400 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg"></div>
              <span className="text-lg font-space-grotesk font-bold">CodeToContent</span>
            </div>
            <p className="text-neutral-400 text-sm">
              © 2025 CodeToContent. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
