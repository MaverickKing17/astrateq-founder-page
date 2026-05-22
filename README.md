# Astrateq Gadgets — ASTRA-AI Pre-Launch Validation Engine
> [cite_start]Premium, high-conversion "Light Editorial" reservation funnel for the ASTRA-AI Predictive Vehicle Safety System. 

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Framework: React 18](https://img.shields.io/badge/Framework-React%2018-blue?logo=react)](https://react.dev/)
[![Styling: Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-61dafb?logo=tailwindcss)](https://tailwindcss.com/)
[![Compliance: AODA / WCAG AA](https://img.shields.io/badge/Compliance-AODA%20%2F%20WCAG%20AA-success)](#accessibility--compliance)

---

## 🎯 Project Purpose & Mission
[cite_start]This repository houses the rebuilt, single-file production-ready front-end application for **Astrateq Gadgets' Founder Batch 01** validation campaign[cite: 1, 2, 11]. 

[cite_start]The primary business goal is direct-response market validation[cite: 2, 4]. [cite_start]It captures fully refundable credit card micro-deposits via Stripe to prove real transactional intent for the **ASTRA-AI Predictive Vehicle Safety System**[cite: 1, 2, 11]. [cite_start]The product ecosystem features a plug-and-play Smart OBD-II Diagnostic Dongle and a Dual-Lens AI Windshield Camera [cite: 2, 93][cite_start], engineered to reduce background driving anxieties for the Canadian "Sandwich Generation" (adults aged 35–55 caring for elderly parents)[cite: 2, 8].

---

## 🎨 Visual Identity & UX Architecture
[cite_start]Following a rigorous audit of conversion best practices, this application explicitly enforces a **"Light Editorial Tech"** layout strategy[cite: 2], discarding dark-mode layouts to match the elite, high-trust consumer tone of Apple or Samsung product releases.

* [cite_start]**Color Baseline:** Pure White (`#FFFFFF`) background, ultra-light surface cards (`#F8F9FA`), and high-contrast Rich Charcoal (`#1A1A2E`) text[cite: 2, 9].
* [cite_start]**Brand Accents:** High-visibility, crisp responsive Cyan (`#00D4FF`) reserved for active markers, live indicators, and primary navigation CTAs[cite: 2, 9].
* [cite_start]**Typography:** Elegant Editorial Serif (**DM Serif Display**) with tight letter-spacing (`-0.02em`) for core headers [cite: 2, 10][cite_start]; high-legibility Sans-Serif (**DM Sans**) with a structural line-height (`1.6`) for reading blocks[cite: 2, 10].
* [cite_start]**Grid Discipline:** Strict 8-point geometric layout matrix[cite: 2]. [cite_start]Fluid single-column stacking on mobile viewports scaling up cleanly to an uncompromised 12-column grid layout with spacious horizontal padding (`120px`) on desktop views[cite: 2, 52].

---

## ⚙️ Core Technical Stack
* [cite_start]**Runtime Framework:** React 18+ (Vite Bundler Lifecycle) [cite: 16]
* [cite_start]**Styling Engine:** Tailwind CSS v3+ (Inline utility design classes only; no custom `.css` files allowed) [cite: 17, 196]
* [cite_start]**Micro-Interactions:** Framer Motion (Orchestrating custom scroll-triggered page fades and spring animations) [cite: 20]
* [cite_start]**Icons Layer:** Lucide React (SVG-native rendering, ensuring WCAG AA color contrast ratios) [cite: 22, 189]
* [cite_start]**Transactional Engine:** Stripe.js Redirect Integration (`loadStripe` architecture via `@stripe/stripe-js`) [cite: 18]

---

## 🗺️ Functional Page Sections (Mandated Order)
[cite_start]The front-end layout executes exactly 13 strict components built in unbending programmatic sequence[cite: 24, 25]:

1. [cite_start]**Sticky Frosted Glass Navbar:** Interactive navigation component that triggers an elegant blur filter transition on scroll[cite: 26, 30]. [cite_start]Includes the corporate logo left, anchors center, and an absolute responsive desktop/mobile checkout button[cite: 27, 28, 29].
2. [cite_start]**Split Hero Section:** Features the core copy framework ("Quiet protection for the drivers you love most.") alongside real-time inline social proof icons[cite: 31, 32, 35]. [cite_start]Includes a dedicated geographic visual placeholder frame for Canadian winter roads[cite: 34].
3. [cite_start]**Emotional Trust Strip:** High-contrast full-width break containing deep narrative founder quotes[cite: 45, 46].
4. [cite_start]**The Guardian Founder's Bundle (Pricing Matrix):** Responsive, highly asymmetric 3-column pricing framework[cite: 49, 52]. [cite_start]The middle card ($85 CAD) leverages a `scale-105` transformation matrix on desktop with a featured accent badge to highlight conversion[cite: 60, 61, 62, 153].
5. [cite_start]**Horizontal Conversion Timeline:** 3-step programmatic map breaking down the frictionless reservation process into clear time metrics[cite: 65, 67].
6. [cite_start]**Vehicle Compatibility Checker Tool:** Fully working stateful client-side tool featuring three interactive dropdown selectors (Year, Make, Model) generating custom dynamic success and waitlist notifications[cite: 73, 75, 76, 79, 81].
7. [cite_start]**3x2 Feature Intelligence Grid:** Elegant utility block addressing winter driving traction, data privacy, and early mechanical fault alerts[cite: 83, 85].
8. [cite_start]**Client Testimonials Block:** Star-rated, bordered validation tiles explicitly anchored around realistic local user reviews across Canadian regions (ON, AB)[cite: 94, 96, 107].
9. [cite_start]**Hardware Inventory Inventory Frame:** A 2-column component explicitly itemizing all physical assets arriving inside the retail packaging container[cite: 108, 110].
10. [cite_start]**Path to Ownership Horizon Map:** Staggered chronological timeline listing the manufacturing and target shipping windows cleanly[cite: 118, 120].
11. [cite_start]**Stateful FAQ Accordions:** Collapsible, accessible answers resolving top consumer friction vectors (refund loops, data handling, app usage fees)[cite: 124, 126].
12. [cite_start]**The Final Northern Guarantee Block:** Strategic, high-trust split checkout interface with absolute radio button data connections[cite: 139, 141, 150, 152].
13. [cite_start]**Compliance Layout Footer:** Legal and localized compliance links (CASL, PIPEDA data residency notes) and language accessibility declarations[cite: 157, 159, 191].

---

## 🔒 Variables & Local Deployment Setup

[cite_start]To launch this architecture or push it cleanly to production infrastructure targets like Vercel [cite: 23, 197][cite_start], you must establish the following environment keys in your target host panel or root file structure[cite: 197]:

```bash
# Stripe Public Sandbox/Live Access Keys
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_yourPublicKeyHere

# Product Line Price Identifiers (Stripe Dashboard Native IDs)
VITE_STRIPE_PRICE_EARLYBIRD=price_earlybird_25CAD
VITE_STRIPE_PRICE_FOUNDING=price_founding_85CAD
VITE_STRIPE_PRICE_GUARDIAN=price_guardian_150CAD
