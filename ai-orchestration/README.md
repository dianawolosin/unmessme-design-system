# AI Orchestration Layer

## Purpose
This directory acts as the **operational cortex** for the project. It houses the meta-instructions, workflows, and technical guides that instruct AI agents *how* to work within the repository.

While the `context-engine` defines **what** to build, `ai-orchestration` defines **how** to build it to standard.

## Taxonomy of Instructions

### The Directives
*   **`.cursorrules`**: The Prime Directive. Global behavioral constraints, role definitions, and tool usage rules.
*   **`project_north_star.md`**: The active roadmap and strategic alignment. This tells the AI "where we are going."

### The Workflows
*   **`component_request_workflow.md`**: The protocol for validating component requests. It instructs the AI to gather context (Experience, Interaction, Purpose) before coding to ensure meaningful design decisions.

### The Engineering Guides
*   **`component_implementation_guide.md`**: The protocol for creating components. It enforces the *Foundations → Components → Patterns* cascade.
*   **`token_orchestration_guide.md`**: The methodology for styling. It instructs the AI how to resolve semantic tokens instead of hardcoding values.
