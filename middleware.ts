import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])
const isPublicApiRoute = createRouteMatcher([
  '/api/auth/github(.*)',  // GitHub OAuth routes should be public
])

export default clerkMiddleware(async (auth, req) => {
  // Skip Clerk middleware for public API routes (but auth() can still be used inside them)
  if (isPublicApiRoute(req)) {
    return
  }

  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}