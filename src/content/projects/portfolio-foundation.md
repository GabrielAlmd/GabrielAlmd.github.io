---
title: Portfolio Foundation
description: A maintainable Astro foundation for documenting engineering work.
date: 2026-09-26
status: in-progress
featured: true
technologies:
  - Astro
  - TypeScript
  - CSS
category: Engineering Tooling
repositoryUrl: https://github.com/GabrielAlmd/GabrielAlmd.github.io
draft: false
---

## Problem

Create a lightweight place to present engineering projects without committing to a complex application stack.

## Context

The site needs to be statically generated, easy to maintain, and deployable as a GitHub user site.

## Design

Astro provides file-based routing, validated content collections, and static output with minimal client-side JavaScript.

## Implementation

The foundation uses semantic Astro components, strict TypeScript, plain CSS design tokens, and Markdown project entries.

## Challenges

The structure must remain useful as more case studies are added without overbuilding the first iteration.

## Solution

Project metadata is validated centrally while each Markdown file controls its own case-study sections.

## Results

The repository now has a small, extensible base for future content and visual design work.

## Technologies

Astro, TypeScript, CSS, Markdown, and GitHub Actions.

## Links

- [Source repository](https://github.com/GabrielAlmd/GabrielAlmd.github.io)
