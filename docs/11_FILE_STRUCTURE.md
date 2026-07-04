# File Structure

## Overview
This document explains the current and future folder architecture of the project. The goal is to keep the codebase modular, easy to navigate, and scalable as the website grows.

## Current Structure
```text
app/
components/
constants/
data/
hooks/
lib/
public/
styles/
types/
utils/
docs/
```

## Folder Purpose

### app/
The App Router entry layer. It contains global layout, metadata, and route-level entry points.

### components/
Reusable presentation and interaction components. This folder should remain modular and feature-oriented.

### constants/
Shared design tokens and configuration values. This is where reusable token data should live.

### data/
Static content examples, local datasets, or structured content fixtures for development.

### hooks/
Reusable React hooks that encapsulate behavior and state logic.

### lib/
Integration helpers and shared utilities that are not purely UI-facing.

### public/
Static assets such as logos, icons, images, and previews.

### styles/
Global style resources beyond the main app stylesheet.

### types/
Shared TypeScript types and interfaces.

### utils/
General-purpose helper functions used across the project.

### docs/
Project documentation and source-of-truth planning material.

## Components Substructure
Planned or existing component categories may include:
- `components/common/`
- `components/ui/`
- `components/navbar/`
- `components/hero/`
- `components/about/`
- `components/impact/`
- `components/team/`
- `components/events/`
- `components/contact/`
- `components/footer/`

## Why Each Folder Exists
| Folder | Why It Exists |
|---|---|
| app | Defines routes, layout, and metadata |
| components | Keeps UI and interactions reusable |
| constants | Centralizes tokens and configuration |
| data | Supports structured content without immediate CMS dependency |
| hooks | Encapsulates stateful logic |
| lib | Holds integration logic and helpers |
| public | Serves static files efficiently |
| styles | Stores global styling resources |
| types | Prevents duplication of interfaces and variant types |
| utils | Provides composable helper functions |
| docs | Records architecture and decision-making |

## Naming Conventions
- React components use PascalCase file names or index exports.
- Utility modules use descriptive lowercase names.
- Token files should be explicit and grouped by concern.
- Documentation files use numeric prefixes to preserve reading order.

## Future Scalability
The folder structure should support:
- More route segments
- CMS adapters
- Reusable section blocks
- Feature packages
- Story-driven content modules
- Asset pipelines
- Test directories if added later

## Recommended Organization Rules
- One responsibility per file.
- Prefer barrel exports for stable public APIs.
- Keep feature logic near the feature when practical.
- Avoid duplicating token values across folders.
- Document major architectural changes in `docs/`.
