# Create Product Requirements Document

You are tasked with creating a detailed Product Requirements Document (PRD) in Markdown format. The PRD should be clear, actionable, and suitable for a junior developer to understand and implement the feature.

## Process

1. **Ask Clarifying Questions First:** Before writing the PRD, you MUST ask clarifying questions to gather sufficient detail. Focus on understanding the "what" and "why" of the feature. Provide options in letter/number lists for easy responses.

2. **Generate PRD:** Based on the initial prompt and answers to clarifying questions, generate a PRD using the structure below.

3. **Save PRD:** Save the document as `[n]-prd-[feature-name].md` inside the `/tasks` directory. (Where `n` is a zero-padded 4-digit sequence starting from 0001, e.g., `0001-prd-user-authentication.md`, `0002-prd-dashboard.md`)

## Clarifying Questions to Ask

Adapt questions based on the prompt, but explore these areas:

* **Problem/Goal:** "What problem does this feature solve for the user?" or "What is the main goal we want to achieve?"
* **Target User:** "Who is the primary user of this feature?"
* **Core Functionality:** "Can you describe the key actions a user should be able to perform?"
* **User Stories:** "Could you provide a few user stories? (e.g., As a [type of user], I want to [perform an action] so that [benefit].)"
* **Acceptance Criteria:** "How will we know when this feature is successfully implemented?"
* **Scope/Boundaries:** "Are there any specific things this feature should NOT do (non-goals)?"
* **Data Requirements:** "What kind of data does this feature need to display or manipulate?"
* **Design/UI:** "Are there any existing design mockups or UI guidelines to follow?"
* **Edge Cases:** "Are there any potential edge cases or error conditions we should consider?"

## PRD Structure

Include these sections in the generated PRD:

1. **Introduction/Overview:** Briefly describe the feature and the problem it solves. State the goal.
2. **Goals:** List the specific, measurable objectives for this feature.
3. **User Stories:** Detail the user narratives describing feature usage and benefits.
4. **Functional Requirements:** List specific functionalities using clear, concise language (e.g., "The system must allow users to upload a profile picture."). Number these requirements.
5. **Non-Goals (Out of Scope):** Clearly state what this feature will NOT include to manage scope.
6. **Design Considerations (Optional):** Link to mockups, describe UI/UX requirements, or mention relevant components/styles if applicable.
7. **Technical Considerations (Optional):** Mention any known technical constraints, dependencies, or suggestions (e.g., "Should integrate with the existing Auth module").
8. **Success Metrics:** How will the success of this feature be measured? (e.g., "Increase user engagement by 10%", "Reduce support tickets related to X").
9. **Open Questions:** List any remaining questions or areas needing further clarification.

## Important Rules

1. **DO NOT start implementing the PRD** - only create the document
2. **Make sure to ask the user clarifying questions** before generating the PRD
3. **Take the user's answers** to the clarifying questions and improve the PRD
4. **Write for a junior developer** - requirements should be explicit, unambiguous, and avoid jargon

## Output

* **Format:** Markdown (`.md`)
* **Location:** `/tasks/`
* **Filename:** `[n]-prd-[feature-name].md`
