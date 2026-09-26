---
title: The deadlock was hiding in a signal handler
description: Tracing an intermittent embedded-Linux stall to work that was unsafe in asynchronous signal context.
date: 2026-09-26
featured: true
technologies:
  - C
  - C++
  - Embedded Linux
  - POSIX threads
  - POSIX semaphores
topics:
  - Concurrency
  - Shared memory
  - Signals
  - Software debugging
confidentiality: anonymized-professional
draft: false
---

## Problem

An embedded Linux service occasionally stopped making progress while coordinating shared state. The process stayed alive, but normal work could not complete. It was rare enough to be frustrating and frequent enough to matter.

## Context

Several execution contexts accessed shared state through POSIX synchronization primitives. Signals were also part of the asynchronous event path. On the target, diagnostic overhead had to stay low, so the investigation needed focused instrumentation rather than broad tracing.

## What made it difficult

There was no crash and no useful error. Thread state and timestamped logs placed the stall near a synchronization boundary, but the last visible event varied from run to run.

## Investigation

I added low-overhead markers around lock acquisition, release, and the relevant state transitions. Stress runs narrowed the window to a signal arriving while another execution context was updating shared state.

At that point, I stopped treating the handler as an ordinary callback. A review of its reachable operations found synchronization and library calls that were not guaranteed to be async-signal-safe. By varying signal timing and workload, I could reproduce the relationship consistently enough to trust the diagnosis.

## Root cause

The handler entered synchronization and library code that was unsafe from asynchronous signal context. If it interrupted code while related application or library state was locked, the handler could wait for work that could not resume until the handler returned.

## Solution

I reduced the handler to a minimal, async-signal-safe notification path. Normal thread context performed the real work after receiving that notification.

The appropriate hand-off depends on the platform and design: an async-signal-safe semaphore post where suitable, a Linux `eventfd` or self-pipe, or blocking signals in worker threads and receiving them synchronously from a dedicated `sigwait()` thread.

## Validation

I exercised the revised design with repeated signal injection under concurrent load. The instrumentation confirmed that the handler no longer attempted unsafe work, and the original stall did not recur during extended stress runs.

## What I took from it

Signal handlers are a separate execution environment, not ordinary callbacks. Keeping them small and using them only to notify normal thread context makes synchronization easier to reason about, test, and observe.
