---
title: Maker Tracker Studio
description: A local application for managing 3D-printing inventory, models, print jobs, purchases, and production costs.
date: 2026-10-18
status: in-progress
featured: true
technologies:
  - Go
  - React
  - TypeScript
  - SQLite
category: Engineering Tooling
draft: false
---

## Problem

Owning a 3D printer introduced a growing set of information to track: filament inventory, purchase prices, models, material consumption, completed print jobs, and the real cost of producing a part.

Spreadsheets can capture individual values, but they do not naturally connect a filament purchase to its remaining stock, or a model and print job to the material and cost involved. I wanted one application that could represent those relationships directly.

## Context

Maker Tracker Studio began as a tool for my own workshop. It needs to be quick to install, straightforward to use, and useful without requiring a hosted database or external service.

The application is intended to support the complete path from buying a spool to recording a finished print:

- register filament and purchases;
- maintain model information;
- record print jobs and material usage;
- calculate the cost associated with a print;
- keep the resulting history available for later decisions.

## Design

The project uses a Go backend with a React and TypeScript frontend. Go provides a compact, cross-platform foundation for the API, while React supports the interactive workflows needed to manage linked records.

SQLite keeps persistence local and deployment simple. It avoids introducing a separate database service while still providing structured data, relationships, and reliable queries.

The architecture is deliberately small:

```text
React interface
      │
      ▼
    Go API
      │
      ▼
SQLite database
```

This boundary keeps the interface independent from storage details and leaves room for the data model to evolve.

## Implementation

Development started with the Go API and the core data model, then added the React interface on top. The main domain areas are filament inventory, purchases, models, print jobs, and cost calculation.

The API is responsible for validating operations and coordinating persistence. The frontend turns those operations into focused workflows so the user can add information without needing to understand the underlying relationships.

The project is also being prepared for Linux and Windows builds. Keeping the database embedded in the application makes those packages easier to distribute and operate.

## Challenges

The hardest early decision was not the choice of framework, but the shape of the data. Purchases, filament stock, models, and print jobs are related, and a weak model would make cost calculations inaccurate or future features difficult to add.

The second challenge is usability. Detailed tracking only provides value if recording a print is faster than ignoring the system, so each workflow has to collect enough information without becoming burdensome.

Packaging introduces another constraint: the application should remain easy to install on both Linux and Windows while preserving a user's local data safely between versions.

## Solution

The application is being built around explicit domain records and a small local-first stack. Responsibilities are separated between the Go API, the React interface, and SQLite persistence, which keeps the system understandable and testable as features are added.

Development is iterative: establish the data relationships, expose a narrow API, validate the workflow through the interface, and then extend it. Automated checks, security reviews, and screenshot-based interface validation support that process.

## Results

After roughly four months of development, the project has progressed from an initial personal prototype into a structured beta application. It has also served as a practical exercise in full-stack architecture, data modelling, cross-platform delivery, and using AI-assisted workflows while retaining validation and review steps.

Maker Tracker Studio is still in progress. The next milestone is a public open-source release with installation instructions and enough documentation for other makers to run it locally.

## Technologies

Go, React, TypeScript, and SQLite.

## Availability

The public repository and packaged releases are not available yet. Links will be added with the first open-source release.
