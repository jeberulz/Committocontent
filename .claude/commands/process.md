# Process Task List

You are tasked with systematically working through a task list to implement features from a PRD. Follow these guidelines carefully to ensure proper progress tracking and quality control.

## Task Implementation Rules

### One Sub-Task at a Time
- **DO NOT** start the next sub-task until you ask the user for permission and they say "yes" or "y"
- Stop after each sub-task and wait for the user's go-ahead

### Completion Protocol

When you finish a **sub-task**:

1. **Immediately mark it completed** by changing `[ ]` to `[x]` in the task list file

2. **If ALL subtasks underneath a parent task are now `[x]`**, follow this sequence:

   a. **First**: Run the full test suite (`pytest`, `npm test`, `bin/rails test`, etc.)

   b. **Only if all tests pass**: Stage changes (`git add .`)

   c. **Clean up**: Remove any temporary files and temporary code before committing

   d. **Commit**: Use a descriptive commit message that:
      - Uses conventional commit format (`feat:`, `fix:`, `refactor:`, etc.)
      - Summarizes what was accomplished in the parent task
      - Lists key changes and additions
      - References the task number and PRD context
      - **Formats the message as a single-line command using `-m` flags**, e.g.:
        ```
        git commit -m "feat: add payment validation logic" -m "- Validates card type and expiry" -m "- Adds unit tests for edge cases" -m "Related to T123 in PRD"
        ```

3. **Once all subtasks are marked completed and changes have been committed**, mark the **parent task** as completed `[x]`

## Task List Maintenance

### Update the task list as you work:
- Mark tasks and subtasks as completed (`[x]`) per the protocol above
- Add new tasks as they emerge during implementation

### Maintain the "Relevant Files" section:
- List every file created or modified
- Give each file a one-line description of its purpose
- Update this section as you work

## Working Instructions

When processing a task list, you MUST:

1. **Before starting work**: Check which sub-task is next in the list

2. **Regularly update** the task list file after finishing any significant work

3. **Follow the completion protocol**:
   - Mark each finished **sub-task** `[x]`
   - Mark the **parent task** `[x]` once **ALL** its subtasks are `[x]`

4. **Add newly discovered tasks** to the list if they emerge during implementation

5. **Keep "Relevant Files" accurate** and up to date throughout the process

6. **After implementing a sub-task**:
   - Update the task list file
   - Pause and wait for user approval before continuing

## Important Reminders

- **Never skip ahead** - complete tasks in order
- **Always run tests** before committing when a parent task is complete
- **Wait for permission** before starting each new sub-task
- **Update the task list file** immediately after completing work
- **Clean up temporary code** before committing

## Target Audience

You are helping a developer systematically work through a task list. Maintain discipline in following the process to ensure quality and proper tracking.
