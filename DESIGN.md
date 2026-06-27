---
name: "Rofiqul Bari Portfolio"
description: "A recruiter-focused AI engineering portfolio with mature dark technical surfaces and clear hiring actions."
colors:
  void-bg: "#0a0a0a"
  loading-bg: "#050508"
  research-bg: "#030308"
  panel-bg: "#111827"
  panel-bg-soft: "#1f2937"
  line-muted: "#374151"
  ink: "#ffffff"
  text-strong: "#d1d5db"
  text-muted: "#9ca3af"
  text-subtle: "#6b7280"
  signal-teal: "#14b8a6"
  signal-teal-bright: "#2dd4bf"
  signal-emerald: "#10b981"
  data-cyan: "#22d3ee"
  data-cyan-soft: "#67e8f9"
  system-blue: "#3b82f6"
  ai-violet: "#8b5cf6"
  ai-violet-soft: "#a78bfa"
  graph-indigo: "#4f46e5"
  alert-pink: "#ec4899"
typography:
  display:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(3rem, 7vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: "0"
  body:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0"
  label:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.02em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  panel: "24px"
  resume-panel: "32px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.signal-teal}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 32px"
  button-secondary:
    backgroundColor: "{colors.panel-bg-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 32px"
  card-panel:
    backgroundColor: "{colors.panel-bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "32px"
  input-field:
    backgroundColor: "{colors.panel-bg-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  chip-accent:
    backgroundColor: "{colors.signal-teal}"
    textColor: "{colors.data-cyan-soft}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
---

# Design System: Rofiqul Bari Portfolio

## 1. Overview

**Creative North Star: "The Recruiter Signal Console"**

This portfolio should feel like a focused technical command surface built for hiring decisions: dark, sharp, data-rich, and easy to scan. The current identity is a near-black engineering environment with teal/cyan action signals, violet AI-atmosphere accents, strong system UI typography, profile imagery, project screenshots, and controlled kinetic reveals.

The system is not trying to be cute, playful, or template-cyber. It should make recruiters trust the person behind the interface: the work is organized, the calls to action are unmistakable, and the visual effects support proof rather than distracting from it.

**Key Characteristics:**
- Near-black technical surfaces with restrained grid, glow, and particle atmosphere.
- Teal/cyan as the primary hiring-action signal for resume, contact, GitHub, and live project links.
- Violet/indigo used as secondary AI energy, never as the whole personality.
- Flat technical panels with thin borders and tonal layering; glow belongs mostly to hover and hero moments.
- Motion is choreographed enough to feel built, but scanning should stay fast.

## 2. Colors

The palette is a dark recruiter-console system: black structural depth, teal/cyan action signals, and violet AI atmosphere.

### Primary
- **Signal Teal**: the main action color for recruiter-critical CTAs, active states, section separators, progress bars, and success/status cues.
- **Signal Teal Bright**: the bright edge of the primary gradient, used where buttons or headings need lift.
- **Signal Emerald**: the completion and confidence accent used in gradients, status dots, progress indicators, and skill-level fills.

### Secondary
- **Data Cyan**: used for resume details, section borders, scroll indicators, and technical highlights.
- **System Blue**: used in global grid overlays, soft page glow, and secondary interface atmosphere.
- **AI Violet**: used for AI/research emphasis, loader choreography, nav glow, and atmospheric secondary accents.

### Tertiary
- **Alert Pink**: a limited loader and particle accent. It should not become a regular section color unless the content needs a clear alert or contrast role.
- **Graph Indigo**: used for deep background gradients and subtle system depth.

### Neutral
- **Void Background**: the global body black and dominant page ground.
- **Loading Background** and **Research Background**: deeper black variants for cinematic first-load and research surfaces.
- **Panel Background**: the default card and container fill.
- **Panel Background Soft**: the input, secondary button, and nested-panel fill.
- **Line Muted**: borders, dividers, and quiet technical strokes.
- **Ink**, **Text Strong**, **Text Muted**, and **Text Subtle**: the text ladder from primary content to metadata.

### Named Rules

**The Recruiter Action Rule.** Teal/cyan must identify the next hiring action: view resume, download PDF, contact, open GitHub, open LinkedIn, or view live work.

**The Atmosphere Is Secondary Rule.** Violet, indigo, pink, grids, particles, and glows may create AI atmosphere, but they must not bury project evidence or recruiter actions.

## 3. Typography

**Display Font:** system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif  
**Body Font:** system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif  
**Label/Mono Font:** Courier New appears only in loader counters; do not use monospace as a general "technical" costume.

**Character:** The type system is direct, heavy, and software-native. It uses one family with strong weight contrast: bold display text for credibility signals, compact labels for metadata, and relaxed body copy on dark backgrounds.

### Hierarchy
- **Display** (900, clamp(3rem, 7vw, 4.5rem), 1.05): hero names, major section headers, loader welcome text.
- **Headline** (800, clamp(2.25rem, 5vw, 3.75rem), 1.08): section titles and large feature headings.
- **Title** (700, clamp(1.5rem, 3vw, 2.25rem), 1.18): project titles, card titles, role headings, and technical category names.
- **Body** (400, 1rem, 1.7): explanatory copy, descriptions, project summaries, and resume narrative. Keep line length around 65-75ch.
- **Label** (600, 0.875rem, 0.02em): pills, metadata labels, button text, status badges, and small navigation.

### Named Rules

**The One-Family Confidence Rule.** Keep the current system font stack unless a future redesign deliberately chooses a recruiter-grade type direction; do not add a reflex display font just to look designed.

**The Label Restraint Rule.** Use uppercase and wide tracking only for resume headers or compact status labels. Repeated tiny uppercase section eyebrows are forbidden.

## 4. Elevation

This system should read as flat technical panels, not bubbly cards. Depth comes from near-black tonal separation, thin borders, backdrop blur, radial light, and occasional hover glow. Shadows exist, but they are stateful or cinematic, not the default definition of every surface.

### Shadow Vocabulary
- **CTA Glow** (`0 0 24px rgba(20, 184, 166, 0.45)`): use on primary button hover or profile-image hover only.
- **Research Hover** (`0 20px 60px rgba(139,92,246,0.15)`): use for research-style interactive surfaces where violet is already the local accent.
- **Resume Shell** (`0 30px 120px rgba(8,145,178,0.18)`): use for the resume page shell and similarly large framed documents.
- **Card Ambient** (`0 20px 80px rgba(0,0,0,0.35)`): use for document-like panels only; avoid combining this with heavy borders on every card.

### Named Rules

**The Flat Technical Panel Rule.** Panels rest flat with tonal fill and one-pixel borders; glow appears only for hover, focus, or one primary hero moment.

**The No Template Shine Rule.** Do not pair a generic 1px border with a huge decorative shadow across every card. If everything glows, no recruiter signal is visible.

## 5. Components

### Buttons

- **Shape:** rounded hiring-action pills for hero and footer CTAs (999px), rounded technical rectangles for forms and resume actions (12-16px).
- **Primary:** teal-to-emerald gradient, white text, medium-to-bold weight, icon plus label, generous horizontal padding.
- **Hover / Focus:** brighten toward teal/cyan, add a modest signal glow, and use focus-visible outlines that are obvious on black.
- **Secondary / Ghost:** transparent white or gray panels with thin borders; they should support primary CTAs, not compete with them.

### Chips

- **Style:** compact rounded pills with accent-tinted text, accent-tinted border, and transparent accent fill.
- **State:** use for skills, tags, paper status, contact badges, and technology metadata. Chips should be readable at 12-14px and never become decorative confetti.

### Cards / Containers

- **Corner Style:** 16-24px for normal panels; 32px only for large resume/document shells that need a distinct page frame.
- **Background:** near-black panels (`panel-bg`, `panel-bg-soft`) over darker page grounds.
- **Shadow Strategy:** flat by default; hover may add one localized glow when the card is interactive.
- **Border:** thin neutral or accent-tinted one-pixel borders. Do not use thick side-stripe borders as accents.
- **Internal Padding:** 24-40px for feature cards, 16-24px for compact cards.

### Inputs / Fields

- **Style:** dark field fill, one-pixel gray border, 12px radius, white entered text, muted but AA-compliant placeholder text.
- **Focus:** border shifts to Signal Teal with a visible focus ring or glow.
- **Error / Disabled:** errors should use a distinct red or amber treatment; disabled fields should reduce contrast but keep labels readable.

### Navigation

The nav is a fixed dark glass bar with a compact profile logo, pill links, active underline, social actions, mobile menu, and top scroll progress. It should stay professional and compressed: recruiters need fast section access, not a giant decorative header. Emoji icons currently exist in nav labels; future polish should replace them with consistent icon components if the surface needs a more mature tone.

### Signature Component: Interactive Profile Hero

The hero combines recruiter copy, resume CTAs, social links, and an interactive profile image. The image frame may tilt, glow, and reveal the cyber profile state on hover, but the first read must remain the role, name, and CTAs. Preserve the profile photo as proof of personhood; do not replace it with generic AI abstraction.

### Signature Component: Project Timeline

The project section uses alternating image/content rows, a central desktop timeline, real screenshots, tags, and live/GitHub actions. This is the main proof surface. Keep it more evidence-led than decoration-led: project titles, outcomes, tags, screenshots, and actions should win.

## 6. Do's and Don'ts

### Do:
- **Do** make recruiter actions unmistakable with Signal Teal and Data Cyan on resume, contact, GitHub, LinkedIn, and live-work links.
- **Do** keep the interface professional, mature, and technically confident.
- **Do** use real project screenshots, profile imagery, resume content, and measurable technical proof before adding atmosphere.
- **Do** keep dark panels flat and precise at rest, with glow reserved for hover, focus, and hero emphasis.
- **Do** preserve strong contrast on all gray text over black surfaces; muted copy still needs to be readable.
- **Do** provide reduced-motion alternatives for GSAP, Framer Motion, loader, cursor, and scroll-triggered reveals.

### Don't:
- **Don't** make the portfolio childish, playful, or novelty-driven.
- **Don't** use generic AI-template aesthetics, overused cyber decorations without substance, or template-like portfolio sections.
- **Don't** let violet/pink glow overpower teal/cyan recruiter actions.
- **Don't** use gradient text as the default answer for every heading; use solid white headings with accent only where emphasis is earned.
- **Don't** repeat tiny uppercase tracked labels above every section as generic scaffolding.
- **Don't** use thick side-stripe borders, nested cards, or soft decorative shadows on every surface.
- **Don't** hide real proof behind animation; content must be visible and scannable even if motion is reduced or delayed.
