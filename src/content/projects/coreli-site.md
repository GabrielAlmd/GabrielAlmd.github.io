---
title: Coreli Site
description: A content-managed website for a physiotherapy and clinical Pilates practice, with clear service information and integrated appointment booking.
date: 2026-02-28
status: complete
featured: true
technologies:
  - Next.js
  - TypeScript
  - Tailwind CSS
  - Sanity CMS
  - TidyCal
  - Vercel
category: Website
externalUrl: https://www.coreli.pt
draft: false
---

## Problem

Coreli needed a professional online presence where prospective clients could understand its physiotherapy and clinical Pilates services and move easily from finding information to booking an appointment.

The website also needed to remain practical after launch. Updating service descriptions or other page content should not require editing the application or redeploying it manually.

## Context

This was a client-facing project for a health and wellness practice. That made clarity, ease of navigation, and straightforward content management more important than adding unnecessary application features.

The project had two distinct users to consider:

- visitors looking for services and appointment information;
- the site owner, who needs to keep the content current without developer support.

## Design

The site separates presentation, content management, and scheduling into focused parts:

- **Next.js** provides the website structure and page rendering;
- **Sanity CMS** gives the owner an approachable editing experience;
- **TidyCal** handles the appointment-booking flow;
- **Tailwind CSS** supports a consistent visual system across the site;
- **Vercel** provides deployment and hosting for the frontend.

This approach keeps the public experience simple while avoiding the need to build a custom administration and scheduling system.

## Implementation

The frontend was built with Next.js and TypeScript, with reusable page and interface patterns styled through Tailwind CSS.

Editable content is managed in Sanity rather than embedded directly in the frontend. This allows information to evolve independently of the application code. Appointment scheduling is delegated to TidyCal, giving visitors a direct path from learning about a service to choosing a suitable time.

## Challenges

The central challenge was balancing flexibility with simplicity. The content model had to support new and updated material without exposing unnecessary complexity to the person maintaining the site.

The integration boundaries also needed to stay clear: Sanity owns editorial content, TidyCal owns scheduling, and the Next.js application brings both into one coherent experience.

## Solution

The finished architecture uses established services for the parts they handle best instead of recreating them inside one large application. The result is a focused website with manageable content, integrated booking, and a deployment workflow that remains easy to maintain.

## Results

Coreli is published and available to prospective clients. Visitors can explore the practice and its services, then continue to appointment booking from the same experience. The owner can update the website through the CMS without needing to change the frontend code.

**Go check and see the results at [Coreli](https://www.coreli.pt). Also, book your appointment to make my wife happy !!!**

## Technologies

Next.js, TypeScript, Tailwind CSS, Sanity CMS, TidyCal, and Vercel.

## Links

- [Visit Coreli](https://www.coreli.pt)
