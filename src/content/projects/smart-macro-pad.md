---
title: ESP32-C6 Smart MacroPad
description: A programmable ESP32-C6 macro keypad combining PC shortcuts, media controls, Home Assistant integration and an on-device status display.
date: 2026-08-26
status: planned
featured: true
technologies:
  - ESP32-C6
  - ESP-IDF
  - C
  - BLE HID
  - Wi-Fi
  - MQTT
  - I2C
  - OLED
  - Home Assistant
  - FDM 3D Printing

category: Home Laboratory
draft: false
---

## Problem

Traditional macro keyboards are generally designed around a single use case: sending keyboard shortcuts to a computer.

I wanted a device that could remain useful independently of the application currently running on the PC.

The goal was to design a programmable desktop controller capable of combining:

- keyboard shortcuts;
- gaming actions;
- media controls;
- development shortcuts;
- Home Assistant commands;
- device status information;
- multiple configurable operating profiles.

Rather than building a fixed-purpose keypad, the objective was to create a reusable hardware platform whose behaviour could change dynamically according to the selected profile.

## Context

The project started as an experiment using an ESP32-C6 development board and components already available in my electronics kit.

The ESP32-C6 was particularly interesting because it provides several communication technologies in a single MCU, including:

- Bluetooth Low Energy;
- Wi-Fi;
- IEEE 802.15.4 support;
- Zigbee capability;
- ESP-NOW.

This made it possible to explore a device that could operate simultaneously as a PC peripheral and as an IoT controller.

The initial idea evolved into a Smart MacroPad with four main profiles:

- **Game**
- **Desktop**
- **Dev**
- **Home**

Each profile would map the same physical controls to different actions.

For example, the same key could launch a development tool while using the Dev profile and control a Home Assistant entity while using the Home profile.

## Design

The planned production version consists of:

- ESP32-C6 MCU;
- 15 mechanical switches;
- 3 × 5 keyboard matrix;
- one EC11 rotary encoder;
- OLED or small IPS display;
- USB-C interface;
- custom PCB;
- FDM-printed enclosure.

The original design considered approximately 8–12 keys, but the concept evolved towards a **15-key 3 × 5 layout** to provide enough physical controls for gaming and development workflows without making the device unnecessarily large.

Each matrix key would use a diode, such as a 1N4148, to prevent ghosting and allow reliable multi-key operation.

### Profiles

The firmware would expose multiple logical profiles.

#### Game

Designed for application-specific or game-specific shortcuts.

Possible actions include:

- keyboard combinations;
- sequences of keyboard commands;
- frequently used game functions.

#### Desktop

General Windows and productivity controls.

Examples:

- application shortcuts;
- media control;
- volume management;
- frequently used desktop commands.

#### Dev

Actions commonly used during software development.

Examples include:

- terminal shortcuts;
- build commands;
- debugging actions;
- Git-related shortcuts;
- launching development tools.

#### Home

The MacroPad becomes a Home Assistant controller.

Keys could control:

- lights;
- scenes;
- switches;
- automations;
- other Home Assistant entities.

Communication with Home Assistant was planned primarily through **Wi-Fi + MQTT**.

Zigbee was also considered as a future development path because the ESP32-C6 contains an IEEE 802.15.4 radio.

### Rotary encoder

The EC11 rotary encoder would provide contextual controls.

Depending on the active profile, rotation or pressing the encoder could perform operations such as:

- volume up/down;
- mute;
- display brightness;
- profile navigation;
- menu navigation.

This keeps frequently adjusted values away from the main keypad.

### Display

A small OLED or IPS display provides immediate feedback directly on the device.

The display was planned to show:

- active profile;
- last executed action;
- BLE connection state;
- Wi-Fi state;
- Home Assistant/MQTT connectivity;
- contextual information associated with the selected mode.

This was an important design requirement because a multi-profile controller needs clear feedback about what its keys currently represent.

## Implementation

The firmware architecture was planned around **ESP-IDF** rather than a monolithic Arduino sketch.

The design separates hardware drivers, communication interfaces and application logic.

Conceptually:

```text
Physical Inputs
     │
     ├── Key Matrix
     └── Rotary Encoder
             │
             ▼
        Event Queue
             │
             ▼
        Macro Engine
             │
     ┌───────┼──────────┐
     │       │          │
     ▼       ▼          ▼
 BLE HID    MQTT     Profile Manager
     │       │          │
     ▼       ▼          ▼
    PC       HA        Display