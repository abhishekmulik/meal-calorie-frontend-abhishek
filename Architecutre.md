# Application Architecture

This document explains the architectural decisions and folder structure used in the **Meal Calorie Tracker Frontend**.

The project is built using **Next.js App Router**, focusing on modularity, maintainability, and scalability.

---

# High-Level Architecture

The application follows a layered architecture:

```
UI Components
↓
Custom Hooks
↓
API Layer
↓
State Management (Zustand)
↓
Backend API
```

Each layer has a clear responsibility which improves separation of concerns and maintainability.

---

# Project Structure

```
src
│
├── app
│   ├── (auth)
│   │   ├── login
│   │   │   └── page.tsx
│   │   ├── register
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── (protected)
│   │   ├── dashboard
│   │   ├── calories
│   │   └── layout.tsx
│   │
│   ├── providers.tsx
│   ├── layout.tsx
│   └── page.tsx
│
├── components
│   ├── auth
│   ├── common
│   ├── mealform
│   ├── nutritionalValue
│   ├── ui
│   ├── header-navbar.tsx
│   ├── meal-history-table.tsx
│   └── theme-toggle.tsx
│
├── constants
│   ├── api.utils.ts
│   ├── common.constant.ts
│   ├── index.ts
│   └── routes.utils.ts
│
├── hooks
│   ├── useAuthGuard.ts
│   ├── useCalorieLookup.ts
│   ├── useCreateUser.ts
│   ├── useLoginUser.ts
│   └── useLogout.ts
│
├── lib
│   ├── api.ts
│   ├── auth.ts
│   ├── calorieLookup.ts
│   ├── validations.ts
│   ├── utils.ts
│   └── error-handling.tsx
│
├── stores
│   ├── authStore.ts
│   └── mealStore.ts
│
└── types
```

## Benefits

Clean URL structure

Logical grouping of routes

Shared layouts per route group

Example mapping:


| Folder                  | URL          |
| ----------------------- | ------------ |
| `(auth)/login`          | `/login`     |
| `(auth)/register`       | `/register`  |
| `(protected)/dashboard` | `/dashboard` |
| `(protected)/calories`  | `/calories`  |


Route groups allow better organization without affecting URL paths.

# Shared Layouts

Each route group has its own layout.

## Authentication Layout

`app/(auth)/layout.tsx`

This layout provides shared UI for authentication pages such as:

Authentication card container

Illustration or image section

Responsive layout

Centered form UI

This avoids duplication between login and register pages.

## Protected Layout

`app/(protected)/layout.tsx`

This layout wraps protected routes and ensures authentication validation before rendering content.

# Authentication Strategy

The application uses JWT based authentication.

Tokens are stored in:

Zustand store + localStorage (using Zustand persist middleware)

## Authentication flow:

```
User logs in
↓
JWT token received from backend
↓
Token stored in Zustand + localStorage
↓
Protected routes check authentication
↓
Authorized users can access dashboard and calorie lookup
```

# Auth Guard Implementation

Protected routes use a Client-side authentication guard.

Structure:

```
Protected Layout
        ↓
AuthGuard Hook
        ↓
Protected Pages
```

The guard verifies whether a token exists before allowing access to protected routes.

If authentication fails:
`Redirect → /login`

# State Management

Global state is handled using Zustand.

Stores used:

authStore

Manages authentication state.

Responsibilities:

- storing JWT token
- storing logged-in user information
- login/logout state management

mealStore

Manages meal history.

Responsibilities:

- storing calorie lookup history
- persisting meals in localStorage

mapping meals per user

```
foods: {
   userId1: [...meals],
   userId2: [...meals]
}
```

This ensures each user sees their own meal history.

# API Layer

All API interactions are centralized in the **lib layer**.

Files:

```
lib/
 ├ api.ts
 ├ auth.ts
 ├ calorieLookup.ts
```

Responsibilities:

- HTTP requests
- attaching authentication tokens
- handling API responses
- standardizing API calls

# Centralized Error Handling

The project uses a centralized error handling mechanism.

Reasons for this decision:

Without centralization:

- Each API call handles errors differently
- Error formats become inconsistent
- Code duplication increases

Centralized handling ensures:

- consistent error format
- easier debugging
- cleaner API functions

Example error format:

```
{
  error: string
  message: string
  status_code?: number
  retryAfter?: number
}
```

# Custom Hooks Layer

Hooks encapsulate business logic and API communication.

Examples:


| Hook               | Responsibility                |
| ------------------ | ----------------------------- |
| `useLoginUser`     | Handles login mutation        |
| `useCreateUser`    | Handles user registration     |
| `useCalorieLookup` | Fetch calorie data            |
| `useLogout`        | Logout logic                  |
| `useAuthGuard`     | Protects authenticated routes |


Benefits:

- separates logic from UI
- reusable logic
- cleaner components

# Component Architecture

Components are organized by responsibility.

```
components
├ auth
├ common
├ mealform
├ nutritionalValue
├ ui
```

### UI Components

Reusable UI primitives used across the application.

### Feature Components

Feature-specific components such as:

- meal form
- nutritional values display
- authentication forms

# Design Principles

The architecture follows several important principles:

### Separation of Concerns

Each layer has a specific responsibility.

### Reusability

Shared hooks, utilities, and UI components reduce duplication.

### Scalability

Feature-based folder structure allows easy expansion.

### Maintainability

Clear separation between:

- UI
- state
- API
- business logic

# Trade-offs

## 1.  Client-side Route Guard vs Middleware Protection

### Current Approach

Protected routes use a **client-side authentication guard**.  

Structure:

```
Protected Layout
↓
AuthGuard Hook
↓
Protected Page
```

### Advantages

- Simple to implement
- Works with Zustand + localStorage authentication
- Keeps pages as Server Components

### Trade-offs

- Authentication validation happens **after page render**
- May cause a **small UI flash** before redirect

### Mitigation:

The guard temporarily returns `null` while performing authentication checks.

---

## 2. Feature-based Folder Structure

The project uses a **modular folder structure** separating components, hooks, stores, and utilities.

### Advantages

- Clear separation of responsibilities
- Easier navigation
- Scales well as the project grows

### Trade-offs

- Slightly more folders and abstraction layers

However, this improves maintainability for larger applications.

---

## 3. Centralized API Layer

All API communication is handled through a centralized API utility.

### Advantages

- Consistent API error handling
- Reusable request logic
- Cleaner hooks and components

### Trade-offs

- Adds an abstraction layer
- Slightly more setup compared to direct fetch calls

The benefits of maintainability and consistency outweigh the additional abstraction.

---

## 4. Storing Meal History by User ID

Meal history is stored in the Zustand store using a map keyed by `userId`.

Example structure:

```
foods: {
userId1: [...mealHistory],
userId2: [...mealHistory]
}
```

### Why This Approach Was Chosen

Initially, meal history was persisted using a single key in localStorage:
```meals```

This caused an issue where multiple users logging into the same browser could see the previous user's meal history.

To solve this, meals are now stored **per user ID** inside the store.

This ensures:

- each user sees their own meal history
- data persists across sessions
- switching users does not require clearing localStorage

### Advantages

- Supports multiple users on the same browser
- Preserves history when a user logs out and logs back in
- Avoids needing dynamic localStorage keys
- Simpler hydration behavior with Zustand persist middleware

### Trade-offs

- Slightly more complex state structure
- Requires selecting data using the current `userId`
- Store logic must handle fallback states when userId changes

Example selector:

```
const foods = mealStore(state => state.foods[userId] ?? [])
```

Despite the additional complexity, this approach ensures correct data isolation between users while maintaining a simple persistence strategy.

# Summary

This architecture ensures:

- clean routing structure
- modular component design
- centralized API management
- scalable state management
- maintainable project structure

