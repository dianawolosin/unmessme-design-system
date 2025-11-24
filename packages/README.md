# Packages Ecosystem

## Purpose
This directory contains the **Execution Layer** of the repository. While `context-engine` defines the rules and `ai-orchestration` guides the process, `packages` is where the actual software is constructed and assembled.

It operates as a **monorepo** workspace, allowing distinct parts of the system to be developed in isolation yet linked together.

## Taxonomy of Artifacts

### The Core (`/design-system`)
*   **Role:** The Product.
*   **Description:** The exportable library containing the Semantic Token Engine, Atomic Components, and Pattern Molecules.
*   **Relationship:** This package is the "upstream" dependency. It exports `tokens`, `theme`, and `components`.

### The Lab (`/prototype`)
*   **Role:** The Testbed.
*   **Description:** A lightweight Vite application used solely to visualize, stress-test, and validate the Design System.
*   **Relationship:** This package is the "downstream" consumer. It imports `@unmessme/design-system` to render the UI.

