# PRD-0001: GitHub Repository Connection

## 1. Introduction/Overview

**Feature Name:** GitHub Repository Connection

**Problem Statement:**
CodeToContent's core value proposition is turning GitHub commits into publish-ready content. Currently, the dashboard displays mock data with no real GitHub integration. Users cannot connect their repositories, fetch commits, or generate content from actual development work.

**Goal:**
Implement a secure GitHub OAuth integration that allows users to:
- Authenticate with GitHub
- Select and connect repositories to CodeToContent
- Automatically fetch and sync commit data (metadata + diff statistics)
- Monitor repositories for new commits in real-time
- Manage connected repositories with plan-based limits

This feature serves as the **foundational data layer** for all content generation features.

---

## 2. Goals

1. **Enable GitHub Authentication:** Users can securely connect their GitHub account via OAuth 2.0
2. **Repository Selection:** Users can browse and select multiple repositories to monitor (within plan limits)
3. **Automated Commit Syncing:** System automatically fetches commit metadata and diff statistics
4. **Historical Data Import:** Users can import commits from the past 7/30/90 days upon first connection
5. **Real-time Updates:** New commits are detected via webhooks with polling fallback
6. **Plan-Based Limits:** Enforce repository connection limits based on subscription tier
7. **Repository Management:** Users can view, disconnect, and manage connected repositories
8. **Error Resilience:** Handle GitHub API failures gracefully with retry mechanisms

---

## 3. User Stories

### US-001: Connect GitHub Account
**As a** CodeToContent user
**I want to** connect my GitHub account
**So that** I can import my repositories and commits for content generation

**Acceptance Criteria:**
- Clicking "Connect GitHub" initiates OAuth flow
- User is redirected to GitHub authorization page
- After authorization, user returns to dashboard
- Success message confirms connection
- GitHub access token is securely stored

### US-002: Select Repositories
**As a** user with connected GitHub account
**I want to** select which repositories to monitor
**So that** I only import commits from relevant projects

**Acceptance Criteria:**
- User sees a list of all their accessible repositories (public + private)
- User can select multiple repositories via checkboxes
- System shows repository limits based on current plan (Starter: 2, Pro: 10, Team: Unlimited)
- Selected repositories are saved and begin syncing

### US-003: View Repository Status
**As a** user with connected repositories
**I want to** see the status of each repository
**So that** I know which repos have new commits available for content generation

**Acceptance Criteria:**
- Dashboard displays cards for each connected repository
- Each card shows: repo name, last commit time, number of new commits
- Visual indicator shows active/syncing/error states
- "Generate Content" button is available for repos with new commits

### US-004: Import Historical Commits
**As a** user connecting a new repository
**I want to** import past commits
**So that** I can generate content from recent work, not just future commits

**Acceptance Criteria:**
- During repository connection, user selects lookback period (7/30/90 days)
- System fetches commits from the selected time period
- Progress indicator shows import status
- User can start generating content immediately after import

### US-005: Receive Real-time Commit Updates
**As a** user with active repositories
**I want to** automatically detect new commits
**So that** I don't have to manually refresh or re-sync

**Acceptance Criteria:**
- New commits appear in dashboard within 5 minutes
- Webhook-enabled repos update in real-time (< 30 seconds)
- Non-webhook repos poll every 5 minutes
- Notification indicates new commits are available

### US-006: Manage Connected Repositories
**As a** user
**I want to** disconnect or pause repositories
**So that** I can control which projects are actively monitored

**Acceptance Criteria:**
- User can toggle repository status (active/paused)
- User can permanently disconnect a repository
- Disconnecting removes access but preserves historical data
- User can reconnect previously disconnected repositories

### US-007: Handle Plan Limits
**As a** Starter plan user
**I want to** be informed when I've reached my repository limit
**So that** I understand when I need to upgrade

**Acceptance Criteria:**
- System enforces plan limits (Starter: 2, Pro: 10, Team: Unlimited)
- Attempting to connect beyond limit shows upgrade prompt
- User can disconnect existing repos to connect new ones
- Upgrading plan immediately increases available slots

---

## 4. Functional Requirements

### FR-001: GitHub OAuth Authentication
1. System MUST implement GitHub OAuth 2.0 App flow
2. OAuth scope MUST request `repo` access (read access to public and private repositories)
3. System MUST securely store access tokens encrypted in Convex database
4. System MUST handle OAuth errors (user denial, network failure)
5. System MUST validate and refresh tokens as needed

### FR-002: Repository Discovery
1. System MUST fetch all repositories accessible to the authenticated user
2. System MUST display repositories in a selectable list with:
   - Repository name
   - Visibility status (public/private)
   - Primary language
   - Last updated timestamp
3. System MUST allow multi-select repository selection
4. System MUST prevent selection beyond plan limits

### FR-003: Repository Connection
1. System MUST save connected repositories to Convex `repositories` table
2. System MUST store: repoId, name, fullName, owner, url, defaultBranch, isActive
3. System MUST link repositories to the authenticated user
4. System MUST trigger initial commit sync upon connection

### FR-004: Commit Data Fetching
1. System MUST fetch commits with metadata:
   - SHA, message, author (name/email), timestamp, branch
2. System MUST fetch diff statistics:
   - Files changed, lines added, lines removed
3. System MUST store commit data in Convex `commits` table
4. System MUST avoid duplicate commits (check by SHA)

### FR-005: Historical Commit Import
1. System MUST allow users to select import period: 7, 30, or 90 days
2. System MUST respect GitHub API rate limits during bulk imports
3. System MUST show progress indicator during import
4. System MUST handle large repositories (> 1000 commits) via pagination

### FR-006: Real-time Webhook Integration
1. System MUST register webhooks for connected repositories (when possible)
2. System MUST receive and validate GitHub webhook payloads
3. System MUST verify webhook signatures using secret
4. System MUST process `push` events to fetch new commits
5. System MUST handle webhook delivery failures

### FR-007: Polling Fallback
1. System MUST poll repositories without webhooks every 5 minutes
2. System MUST fetch commits since `lastSyncedAt` timestamp
3. System MUST update `lastSyncedAt` after successful sync
4. System MUST implement exponential backoff for API failures

### FR-008: Repository Management UI
1. System MUST provide `/dashboard/repositories` page
2. Page MUST display all connected repositories as cards
3. Each card MUST show:
   - Repository name with GitHub icon
   - Last commit timestamp
   - New commits count badge
   - Active/Paused toggle
   - Disconnect button
   - "Generate Content" CTA
4. Page MUST have "Connect Repository" button
5. System MUST show plan limits (e.g., "2 of 2 repos connected")

### FR-009: Error Handling
1. System MUST display user-friendly error messages for:
   - OAuth failures
   - Network errors
   - GitHub API rate limits
   - Invalid tokens
2. System MUST implement automatic retry queue for failed API calls
3. System MUST log errors for debugging
4. System MUST notify users of persistent connection issues

### FR-010: Plan-Based Limits
1. System MUST enforce repository limits:
   - Free/Starter: 2 repositories
   - Pro: 10 repositories
   - Team: Unlimited repositories
2. System MUST check user's plan via Clerk metadata
3. System MUST prevent connections beyond limit
4. System MUST show upgrade prompt when limit reached

---

## 5. Non-Goals (Out of Scope)

1. **Write Access:** This feature only reads repository data. No push/commit capabilities.
2. **GitHub Issues/PRs:** Only commits are imported. Issues and pull requests are future features.
3. **Other Git Platforms:** GitLab, Bitbucket integration is not included.
4. **Code Analysis:** No static analysis or code quality checks. Only metadata and diff stats.
5. **Multi-Account Support:** Users can only connect one GitHub account per CodeToContent account.
6. **Organization-wide Access:** GitHub App installation for organizations is not included (OAuth App only).
7. **Branch Selection:** All commits from default branch are imported. Multi-branch support is future work.

---

## 6. Design Considerations

### UI Components
- **Connect GitHub Modal:** Full-screen modal with OAuth flow explanation
- **Repository Card:** Dark themed card matching current dashboard aesthetic
  - Uses Geist font family
  - Glass-morphic design (`bg-white/5 ring-1 ring-white/10`)
  - Status indicators (green dot = active, yellow = syncing, red = error)
- **Repository List:** Grid layout (3 columns on desktop, 1 on mobile)
- **Empty State:** Illustration + "Connect your first repository" CTA

### UX Flow
1. User clicks "Connect GitHub" in dashboard
2. Modal explains permissions and shows plan limits
3. User confirms → redirected to GitHub OAuth
4. After auth → returns to repository selection screen
5. User selects repos and import period
6. Loading state shows import progress
7. Success → redirects to `/dashboard/repositories`
8. Repository cards appear with real data

### Visual References
- Follow existing dashboard design system
- Use Lucide icons for GitHub, commits, status
- Match color scheme: emerald for success, amber for warnings, red for errors

---

## 7. Technical Considerations

### Architecture
- **Frontend:** Next.js 15 App Router (React Server Components + Client Components)
- **Backend:** Convex serverless functions
- **Auth:** Clerk + GitHub OAuth
- **API Client:** `@octokit/rest` for GitHub API calls
- **Webhooks:** `@octokit/webhooks` for signature verification

### Database Schema (Convex)

**Table: `repositories`**
```typescript
{
  userId: Id<"users">,
  githubRepoId: number,
  name: string,
  fullName: string,
  owner: string,
  url: string,
  defaultBranch: string,
  language?: string,
  isActive: boolean,
  isPrivate: boolean,
  webhookId?: number,
  lastSyncedAt: number,
  createdAt: number
}
// Indexes: byUserId, byGithubRepoId, byUserAndActive
```

**Table: `commits`**
```typescript
{
  repositoryId: Id<"repositories">,
  sha: string,
  message: string,
  authorName: string,
  authorEmail: string,
  committedAt: number,
  filesChanged: number,
  additions: number,
  deletions: number,
  url: string,
  branch: string,
  processed: boolean, // for content generation
  createdAt: number
}
// Indexes: byRepositoryId, bySha, byProcessedStatus
```

**Table: `githubTokens`**
```typescript
{
  userId: Id<"users">,
  accessToken: string, // encrypted
  tokenType: string,
  scope: string,
  expiresAt?: number,
  createdAt: number
}
// Indexes: byUserId
```

### API Routes (Next.js)
- `GET /api/auth/github` - Initiates OAuth flow
- `GET /api/auth/github/callback` - Handles OAuth callback

### Convex Functions
- `repositories.connect(repoIds: number[], importDays: 7|30|90)` - Connect repos
- `repositories.disconnect(repositoryId: Id)` - Disconnect repo
- `repositories.list()` - Get user's repos
- `repositories.toggleActive(repositoryId: Id)` - Pause/resume
- `commits.fetchByRepository(repositoryId: Id)` - Get commits for repo
- `commits.syncNew(repositoryId: Id)` - Fetch new commits
- `githubTokens.store(userId: Id, token: string)` - Save token
- `githubTokens.get(userId: Id)` - Retrieve token

### Security
- Store GitHub tokens encrypted using `crypto` module
- Validate webhook signatures using `@octokit/webhooks`
- Never expose tokens in client-side code
- Use Convex internal mutations for token operations
- Implement CORS properly for webhook endpoints

### Rate Limiting
- GitHub API: 5,000 requests/hour for OAuth apps
- Implement request queuing to respect limits
- Cache repository metadata (refresh every 24 hours)
- Use conditional requests (ETags) when possible

### Error Handling
- Wrap GitHub API calls in try/catch
- Implement exponential backoff for rate limits
- Queue failed webhook deliveries for retry
- Show toast notifications for user-facing errors
- Log all errors to Convex for debugging

---

## 8. Success Metrics

1. **Adoption Rate:** 80% of active users connect at least 1 repository within first session
2. **Connection Success Rate:** > 95% OAuth completion rate
3. **Sync Reliability:** > 99% of commits successfully synced within 5 minutes
4. **Error Rate:** < 1% of API calls result in unrecoverable errors
5. **Performance:** Repository list loads in < 2 seconds
6. **User Satisfaction:** Positive feedback on connection flow in beta testing

### Analytics to Track
- Number of repositories connected per user
- Average commits per repository per day
- OAuth completion vs abandonment rate
- GitHub API rate limit hits
- Webhook vs polling usage ratio
- Time from commit to detection

---

## 9. Open Questions

1. **Q:** Should we support GitHub Enterprise instances?
   **A:** Not in Phase 1. Re-evaluate based on user demand.

2. **Q:** How should we handle deleted repositories?
   **A:** Mark as inactive, preserve commit history. Discuss in implementation.

3. **Q:** Should users be able to filter commits by author or file pattern?
   **A:** Not in Phase 1. Add to backlog for Phase 2 enhancements.

4. **Q:** What happens if user revokes GitHub access?
   **A:** Detect on next API call, mark token invalid, prompt re-auth. Document in implementation.

5. **Q:** Should we support monorepo path filtering?
   **A:** Not in Phase 1. Consider for future enhancement.

6. **Q:** How to handle force-pushes or rewritten history?
   **A:** For Phase 1, treat as new commits. Advanced history handling is out of scope.

---

## Implementation Priority

**Must Have (P0):**
- OAuth flow
- Repository selection
- Commit fetching (metadata + stats)
- Basic webhook support
- Repository cards on dashboard

**Should Have (P1):**
- Historical import with date selection
- Polling fallback
- Error retry mechanism
- Plan-based limits enforcement

**Nice to Have (P2):**
- Webhook auto-registration
- Advanced filtering
- Repository analytics
- Bulk actions (disconnect multiple repos)

---

## Dependencies

### External Services
- GitHub OAuth App (requires registration at https://github.com/settings/developers)
- GitHub API v3 REST API
- Convex deployment with HTTP endpoints enabled

### NPM Packages
- `@octokit/rest` ^20.0.0
- `@octokit/webhooks` ^12.0.0
- `crypto` (Node.js built-in)

### Environment Variables
```bash
# Add to .env.local and Convex dashboard
GITHUB_CLIENT_ID=your_github_oauth_app_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_app_client_secret
GITHUB_WEBHOOK_SECRET=your_webhook_secret
```

---

## Timeline Estimate

| Task | Estimated Time |
|------|----------------|
| Database schema creation | 1 hour |
| OAuth flow implementation | 2 hours |
| Repository selection UI | 2 hours |
| Commit syncing logic | 2 hours |
| Webhook handler | 1.5 hours |
| Polling service | 1 hour |
| Error handling & retries | 1 hour |
| Testing & debugging | 2 hours |
| **Total** | **12.5 hours** |

---

## Approval

**Product Owner:** _[To be signed]_
**Engineering Lead:** _[To be signed]_
**Date:** 2025-01-21

---

**Next Steps:**
1. Register GitHub OAuth App
2. Set up environment variables
3. Begin database schema implementation
4. Proceed with OAuth flow development
