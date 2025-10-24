# Generate Task List from PRD

You are tasked with creating a detailed, step-by-step task list in Markdown format based on an existing Product Requirements Document (PRD). The task list should guide a developer through implementation.

## Process

1. **Receive PRD Reference:** The user points you to a specific PRD file in `/tasks/`

2. **Analyze PRD:** Read and analyze the functional requirements, user stories, and other sections of the specified PRD.

3. **Assess Current State:** Review the existing codebase to understand:
   - Existing infrastructure, architectural patterns, and conventions
   - Existing components or features that could be relevant to the PRD requirements
   - Related files, components, and utilities that can be leveraged or need modification

4. **Phase 1: Generate Parent Tasks:**
   - Create the task file: `tasks-[prd-file-name].md` in `/tasks/` directory
   - Generate main, high-level tasks required to implement the feature (typically ~5 tasks)
   - Present these tasks to the user in the specified format (without sub-tasks yet)
   - Inform the user: "I have generated the high-level tasks based on the PRD. Ready to generate the sub-tasks? Respond with 'Go' to proceed."

5. **Wait for Confirmation:** Pause and wait for the user to respond with "Go"

6. **Phase 2: Generate Sub-Tasks:** Once confirmed, break down each parent task into smaller, actionable sub-tasks that:
   - Logically follow from the parent task
   - Cover implementation details implied by the PRD
   - Consider existing codebase patterns where relevant without being constrained by them

7. **Identify Relevant Files:** Based on the tasks and PRD, identify potential files that will need to be created or modified. List these under the `Relevant Files` section, including corresponding test files if applicable.

8. **Generate Final Output:** Combine parent tasks, sub-tasks, relevant files, and notes into the final Markdown structure.

9. **Save Task List:** Save the document as `tasks-[prd-file-name].md` in `/tasks/` directory
   - Example: If input is `0001-prd-user-profile-editing.md`, output is `tasks-0001-prd-user-profile-editing.md`

## Output Format

The generated task list MUST follow this structure:

```markdown
## Relevant Files

- `path/to/potential/file1.ts` - Brief description of why this file is relevant (e.g., Contains the main component for this feature).
- `path/to/file1.test.ts` - Unit tests for `file1.ts`.
- `path/to/another/file.tsx` - Brief description (e.g., API route handler for data submission).
- `path/to/another/file.test.tsx` - Unit tests for `another/file.tsx`.
- `lib/utils/helpers.ts` - Brief description (e.g., Utility functions needed for calculations).
- `lib/utils/helpers.test.ts` - Unit tests for `helpers.ts`.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Parent Task Title
  - [ ] 1.1 [Sub-task description 1.1]
  - [ ] 1.2 [Sub-task description 1.2]
- [ ] 2.0 Parent Task Title
  - [ ] 2.1 [Sub-task description 2.1]
- [ ] 3.0 Parent Task Title (may not require sub-tasks if purely structural or configuration)
```

## Important Rules

1. **Two-Phase Approach:** Generate parent tasks first, wait for "Go" confirmation, then generate sub-tasks
2. **Assess the codebase:** Review existing patterns and architecture before creating tasks
3. **Write for a junior developer:** Tasks should be clear and actionable
4. **Include test files:** Every implementation file should have a corresponding test file

## Output

- **Format:** Markdown (`.md`)
- **Location:** `/tasks/`
- **Filename:** `tasks-[prd-file-name].md`

## Target Audience

Assume the primary reader is a **junior developer** who will implement the feature with awareness of the existing codebase context.
