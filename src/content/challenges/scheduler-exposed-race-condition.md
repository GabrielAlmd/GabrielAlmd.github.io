---
title: A scheduler change did not cause this race condition
description: How a thread-priority change exposed an unsafe startup assumption in shared configuration state.
date: 2026-09-25
featured: true
technologies:
  - C
  - C++
  - Embedded Linux
  - POSIX threads
topics:
  - Thread scheduling
  - Race conditions
  - Initialization ordering
  - Reliability
confidentiality: anonymized-professional
draft: true
---

## Problem

After a thread-priority change, startup began failing intermittently. The priority change looked guilty: revert it and the failures became much harder to reproduce.

That was a clue about timing, not proof of cause. The configuration code did not actually depend on a particular priority value, so I treated the scheduling change as something that had exposed a bad assumption.

## Context

Several startup paths shared configuration state. One prepared it; another could start consuming it. The old scheduling behaviour usually let preparation finish first, but nothing in the design guaranteed that order.

## What made it difficult

Some runs completed normally. Others used incomplete or default configuration and failed later in startup. Adding logging changed how often it happened—an unhelpful debugging experience, but a useful sign that execution timing was part of the bug.

## Investigation

I logged monotonic timestamps, thread identifiers, and configuration-state transitions rather than chase the later error. Stress runs varied priority arrangements and introduced small, controlled delays around suspected hand-offs.

Those timelines showed one path consuming configuration while another could still modify or reset it. Reverting the priority change hid the problem again; it did not create a synchronization guarantee.

## Root cause

The configuration lifecycle depended on an accidental execution order. A later initialization step could still reset or modify shared state after another thread had treated it as ready. The scheduler had exposed the race; it had not created the missing ordering constraint.

## Solution

I made ownership and hand-off explicit. Configuration was fully constructed before publication, consumers waited for readiness through the normal synchronization path, and reset behaviour moved out of the concurrent consumption window.

## Validation

I repeated startup under multiple priority arrangements and injected delays around the old race window. The state transitions consistently followed initialize → publish → consume, and consumers no longer observed partial configuration.

## What I took from it

Scheduling changes often reveal assumptions that were already unsafe. If correctness relies on one thread *usually* running first, the system needs an explicit ordering mechanism—not a preferred priority or a well-timed delay.
