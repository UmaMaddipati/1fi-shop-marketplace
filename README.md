# 1Fi Shop & Marketplace

## Overview

This project is an independent frontend implementation of the 1Fi Shop experience with a fully interactive 1Fi Marketplace section, created as part of the 1Fi SDE Intern assignment.

> **Note**: This is an independent submission for an engineering assignment and is not the official 1Fi source code.

---

## Features

### Shop
* **Top Brands placeholder**: Clean, structured placeholder indicating future ecosystem partner brands.
* **Nearby Stores placeholder**: Geolocation-aware placeholder indicating local merchant and retail store partner discovery.
* **1Fi Marketplace**: Full interactive shopping experience enabling purchases backed by mutual fund investments.

### Marketplace
* **Product catalogue**: Curated catalog of consumer electronics (flagship smartphones, ultraportable laptops, productivity tablets, audiophile wireless audio).
* **Product search**: Instant client-side search across product titles, descriptions, and tags with 280ms input debounce.
* **Category filtering**: Filter items by category chips (`All`, `Smartphones`, `Laptops`, `Tablets`, `Audio`) with dynamic category count metrics.
* **Product details**: Dedicated responsive view with rich specification grids, cashback highlights, and variant options.
* **Product gallery**: Multi-angle image showcase with thumbnail selection, active badges, and synchronized variant indexing.
* **Product variants**: Storage capacity selection with dynamic price adjustments.
* **Color selection**: High-contrast color swatches that automatically switch gallery views to match the selected colorway.
* **Dynamic pricing**: Live recalculation of final device price, discount percentage, MRP savings, and net effective cost after cashback.
* **EMI plan comparison**: Visual side-by-side comparison of 3, 6, 9, 12, 18, and 24-month tenures highlighting 0% interest No-Cost EMI options.
* **EMI plan selection**: Interactive plan cards displaying monthly installment, zero downpayment badge, total plan cost, and interest savings.
* **Eligibility/plan confirmation**: Confirmation modal and drawer verifying KYC status, mutual fund pledge lien eligibility, repayment breakdown, and plan confirmation.
* **Loading states**: Custom shimmer skeleton loaders for marketplace grids and comprehensive product detail layouts.
* **Error states**: Graceful network error handling with retry triggers and simulated error toggle for QA demonstration.
* **Empty states**: Thoughtful zero-result state with one-click filter reset.
* **Responsive mobile-first UI**: Built with adaptive ergonomics tested across all standard mobile viewports and desktop layouts.
* **Accessibility support**: Keyboard navigation, ARIA semantics, visible focus rings, and Escape-key dismissals.

### Engineering
* **Decoupled product data layer**: Strongly-typed static catalogue cleanly separated from presentation logic.
* **Asynchronous mock API/service abstraction**: Simulated network latency and Promise-based API contract simulating a production backend.
* **Reusable components**: Modular UI atomic components (buttons, badges, search bar, chips, skeletons, cards).
* **Type-safe product models**: Comprehensive TypeScript interfaces for products, variants, EMI plans, and filter states.
* **EMI calculation utility**: Robust mathematical model computing monthly installments, reducing interest, and total payable amounts.
* **State management**: Predictable React state hooks with URL hash deep linking and browser back/forward synchronization.
* **Request race-condition handling**: Request token tracking discarding outdated asynchronous queries on rapid keystrokes or filter toggles.
* **Responsive design**: Mobile-first Tailwind CSS design system with safe-area padding for mobile gesture navigation.
* **Keyboard accessibility**: Full keyboard controllability across tabs, product cards, variant selectors, EMI options, and modal dialogs.

---

## Architecture

The application follows a clean modular architecture separating concerns across presentation, domain logic, data abstraction, and utilities:

```
src/
├── types/
│   └── product.ts            # Domain contracts (Product, Variant, EMIPlan, FilterState, ShopTab)
├── data/
│   └── products.ts           # Source catalogue with images, specs, variants, and pricing
├── services/
│   └── productService.ts     # Asynchronous service abstraction with simulated latency & race-safe querying
├── utils/
│   ├── currency.ts           # INR formatting, currency conversion, and discount calculations
│   └── emiCalculator.ts      # Monthly installment, reducing interest, and No-Cost EMI generator
├── components/
│   ├── common/               # Design system atoms: Badge, PrimaryButton, SkeletonLoader, EmptyState, ErrorState
│   ├── layout/               # Global navigation Header with user portfolio balance and assignment modal trigger
│   ├── shop/                 # Shop view components: ShopNavTabs, TopBrandsPlaceholder, NearbyStoresPlaceholder
│   ├── marketplace/          # Catalogue components: SearchBar, CategoryChip, ProductCard, ProductGrid
│   └── product-details/      # Detail view: ProductGallery, VariantSelector, EMIPlanCard, EMICalculatorSection, ProductSpecs, EligibilityDrawer
└── screens/
    ├── ShopScreen.tsx        # Top-level shell coordinating navigation tabs and URL hash state
    ├── MarketplaceScreen.tsx # Marketplace catalogue view coordinating filters, search debounce, and request tokens
    └── ProductDetailsScreen.tsx # Full product detail screen with async fetching, skeletons, and sticky mobile actions
```

### Screens
* **`ShopScreen.tsx`**: Top-level entry shell managing top navigation tabs (`marketplace`, `brands`, `stores`), URL hash navigation (`#product-<id>`), and native browser back/forward history events (`popstate`).
* **`MarketplaceScreen.tsx`**: Renders the marketplace header, search bar with debounce, category filter bar, sort dropdown, simulation toggle, loading skeletons, error fallback, and the responsive product grid.
* **`ProductDetailsScreen.tsx`**: Handles asynchronous product loading by ID, variant pricing calculation, EMI tenure updates, gallery color synchronization, mobile sticky CTA action bar, and the eligibility drawer.

### Reusable Components
* **`components/common/`**: Shared design primitives including `Badge.tsx`, `PrimaryButton.tsx`, `SkeletonLoader.tsx`, `EmptyState.tsx`, and `ErrorState.tsx`.
* **`components/marketplace/`**: Reusable search, filtering, and card presentation controls (`SearchBar.tsx`, `CategoryChip.tsx`, `ProductCard.tsx`, `ProductGrid.tsx`).
* **`components/product-details/`**: Encapsulated sub-views for product showcase (`ProductGallery.tsx`, `VariantSelector.tsx`, `EMIPlanCard.tsx`, `EMICalculatorSection.tsx`, `ProductSpecs.tsx`, `EligibilityDrawer.tsx`).

### Product Data Layer
* **`data/products.ts`**: Contains realistic product records across consumer tech categories. Each record includes high-resolution imagery, specifications, variants (storage, color swatches with image mapping), pricing, and loan tenure eligibility flags.

### Mock API / Service Layer
* **`services/productService.ts`**: Simulates an asynchronous RESTful/GraphQL backend service. Introduces a standard 350ms network delay returning Promises, supports full-text search, category filtering, multi-criteria sorting (popularity, price, EMI amounts), and includes error simulation controls for QA verification.

### EMI Calculation Utility
* **`utils/emiCalculator.ts`**: Calculates reducing-rate loan amortization for non-subsidized plans and zero-interest distribution for subsidized No-Cost EMI plans. Provides exact downpayment figures, monthly installments, processing fees, and interest savings metrics.

### State Management & Navigation
* Local React state (`useState`, `useMemo`, `useCallback`, `useRef`) coordinates component interactions without heavyweight external dependencies.
* Search query inputs update immediately for smooth UI feedback while a 280ms debounce triggers catalogue re-fetching.
* Active request token tracking (`activeRequestIdRef`) ensures out-of-order asynchronous responses are safely discarded.
* Browser navigation integration enables smooth Back/Forward button usage between catalogue and product details via URL hashes.

---

## User Flow

```
Shop Navigation
  │
  ├──► Top Brands (Placeholder)
  ├──► Nearby Stores (Placeholder)
  │
  └──► 1Fi Marketplace
         │
         ├──► Search Products (Debounced query)
         ├──► Filter by Category (Smartphones, Laptops, Tablets, Audio)
         ├──► Sort Catalogue (Popularity, Price, Lowest EMI)
         │
         └──► Select Product Card
                │
                └──► Product Details View
                       ├──► Select Storage Variant (Updates base price)
                       ├──► Select Color Swatch (Synchronizes gallery image)
                       ├──► Compare & Select EMI Plan (3, 6, 9, 12, 18, 24 Months)
                       ├──► Review Specifications & Mutual Fund Benefits
                       │
                       └──► Click "Proceed to 1Fi EMI" (Desktop button or Mobile Sticky CTA)
                              │
                              └──► Eligibility & Confirmation Drawer
                                     ├──► Review Mutual Fund Lien Pledge
                                     ├──► Verify KYC & Portfolio Collateral
                                     ├──► Confirm Loan Schedule
                                     └──► Confirmation Success State
```

---

## Data & API

The project uses mock/demo product and EMI data through an asynchronous service abstraction (`productService`) because a live backend integration was not provided as part of the assignment.

> **Disclaimer**: This prototype does not perform real financial transactions, credit decisions, or eligibility approvals. All loan schedules, mutual fund lien pledges, and approval workflows are simulated client-side representations designed for user experience demonstration.

---

## Responsive Design

The entire user interface was constructed using a mobile-first approach with fluid typography, responsive flex/grid wrappers, and touch-friendly interactive targets (minimum 44px on mobile).

The application has been tested and verified at:
* **320px** (Ultra-compact mobile screens)
* **360px** (Standard compact Android devices)
* **375px** (iPhone SE / standard compact iOS viewports)
* **390px** (iPhone 12 / 13 / 14 / 15 / 16 standard viewport)
* **414px** (iPhone Plus / Max viewport)
* **Desktop** (1024px, 1280px, 1440px+ widescreen displays)

Special mobile ergonomic features:
* Sticky bottom action bar on mobile screens with safe-area inset accommodation (`env(safe-area-inset-bottom)`).
* Horizontal swipeable category chips and thumbnail carousels.
* Multi-column adaptive grids: 1 column on mobile, 2 columns on tablets, 3 columns on desktop.

---

## Accessibility

* **Keyboard Navigation**: Full keyboard navigation across all interactive elements (tabs, search bar, chips, cards, swatches, buttons, radio options, close triggers).
* **Focus-Visible States**: Prominent emerald focus rings (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500`) applied across buttons, cards, swatches, and inputs.
* **ARIA Semantics**: Proper ARIA roles and labels applied (`role="tablist"`, `role="tab"`, `role="dialog"`, `role="radio"`, `aria-modal="true"`, `aria-checked`, `aria-label`).
* **Escape-Key Dismissal**: Both the Eligibility confirmation drawer and the Assignment overview modal can be closed via the `Escape` key.
* **Accessible Controls**: Color swatches utilize luminance calculation to display dark checkmarks on light colors (e.g., White, Silver, Porcelain) and light checkmarks on dark swatches.
* **Radio Selection Semantics**: EMI plan cards function as semantic radio options with keyboard selection support (`Enter` / `Space`).

---

## Tech Stack

* **React 19** (`^19.0.1`): Declarative UI library using functional components and hooks
* **TypeScript** (`~5.8.2`): Strict type-checking and interface definitions
* **Vite** (`^6.2.3`): Fast development server and production bundler
* **Tailwind CSS** (`^4.1.14`): Utility-first styling framework with CSS variables
* **Lucide React** (`^0.546.0`): Clean, accessible iconography
* **Motion** (`^12.23.24`): Smooth animation transitions

---

## Setup

To install all project dependencies, run:

```bash
npm install
```

---

## Run

To start the local development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000` (or the port assigned by the dev environment).

---

## Build

To compile a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Project Structure

```
├── .env.example              # Example environment variable declarations
├── .gitignore                # Git ignore configuration
├── index.html                # HTML entry point with metadata and Plus Jakarta Sans font
├── metadata.json             # AI Studio applet metadata and capabilities
├── package.json              # Project scripts and dependency declarations
├── tsconfig.json             # TypeScript compiler configuration
├── vite.config.ts            # Vite configuration with Tailwind CSS plugin
├── public/                   # Static assets
└── src/
    ├── main.tsx              # React application DOM entry point
    ├── App.tsx               # Root component rendering the ShopScreen
    ├── index.css             # Tailwind CSS imports and global styling
    ├── types/                # Domain TypeScript contracts
    │   └── product.ts
    ├── data/                 # Product catalogue data
    │   └── products.ts
    ├── services/             # Mock async backend service
    │   └── productService.ts
    ├── utils/                # Calculation and formatting helpers
    │   ├── currency.ts
    │   └── emiCalculator.ts
    ├── components/           # Reusable UI component library
    │   ├── common/
    │   │   ├── Badge.tsx
    │   │   ├── EmptyState.tsx
    │   │   ├── ErrorState.tsx
    │   │   ├── PrimaryButton.tsx
    │   │   └── SkeletonLoader.tsx
    │   ├── layout/
    │   │   └── Header.tsx
    │   ├── shop/
    │   │   ├── NearbyStoresPlaceholder.tsx
    │   │   ├── ShopNavTabs.tsx
    │   │   └── TopBrandsPlaceholder.tsx
    │   ├── marketplace/
    │   │   ├── CategoryChip.tsx
    │   │   ├── ProductCard.tsx
    │   │   ├── ProductGrid.tsx
    │   │   └── SearchBar.tsx
    │   └── product-details/
    │       ├── EligibilityDrawer.tsx
    │       ├── EMICalculatorSection.tsx
    │       ├── EMIPlanCard.tsx
    │       ├── ProductGallery.tsx
    │       ├── ProductSpecs.tsx
    │       └── VariantSelector.tsx
    └── screens/              # Primary application views
        ├── MarketplaceScreen.tsx
        ├── ProductDetailsScreen.tsx
        └── ShopScreen.tsx
```

---

## Assignment Notes

* **Top Brands** and **Nearby Stores** sections are intentionally styled as placeholder views because the assignment brief explicitly specifies that only the **1Fi Marketplace** requires functional implementation.
* The portfolio collateral credit balance (₹2,50,000 against Mutual Funds) in the navigation header serves as context for the 1Fi zero-liquidation value proposition.

---

## Known Limitations

* **Simulated Financial Backend**: Product, credit limit, and EMI plan schedules use client-side mock data through a simulated asynchronous service layer.
* **No Real Transactions**: No real financial backend, banking gateway, KYC verification provider, or mutual fund depository (CAMS/KFintech) is connected.
* **Simulated Credit Approval**: The eligibility and plan confirmation drawer performs simulated validation without binding legal or credit agreements.

---

## Screenshots

<!-- You can replace the placeholder images below with actual application screenshots -->

### 1. Shop Page
![Shop Page Placeholder](https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80)
*Overview of 1Fi Shop navigation tabs and mutual fund credit balance banner.*

### 2. Marketplace Catalogue
![Marketplace Catalogue Placeholder](https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80)
*1Fi Marketplace catalogue with search, category filtering, and product cards displaying zero downpayment badges.*

### 3. Product Details
![Product Details Placeholder](https://images.unsplash.com/photo-1511707171634-5f897ff0252a?auto=format&fit=crop&w=1200&q=80)
*Detailed product view with multi-image gallery, storage selection, and colorway swatches.*

### 4. EMI Plan Selection
![EMI Plan Selection Placeholder](https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80)
*Interactive 1Fi EMI tenure comparison grid highlighting 0% interest No-Cost EMI plans.*

### 5. Eligibility & Plan Confirmation
![Eligibility Confirmation Placeholder](https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80)
*Lien pledge confirmation drawer detailing mutual fund collateral terms and repayment schedules.*
