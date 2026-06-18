# React Custom Hooks Interview Roadmap

This roadmap focuses on the custom hooks that are most valuable for React Machine Coding and Frontend interviews (2–4 Years Experience).

---

# Priority Order

## Tier 1: Must Know ⭐⭐⭐⭐⭐

These hooks appear directly in common machine coding rounds.

### 1. useDebounce

#### Used In
- Autocomplete
- Search Bar
- Typeahead
- Product Search
- Data Table Search

#### Concepts To Study
- setTimeout
- clearTimeout
- useEffect cleanup
- Debounce vs Throttle

#### Common Interview Questions
- What problem does debounce solve?
- Debounce vs Throttle?
- Why clearTimeout?
- Can you implement debounce without useEffect?

---

### 2. useThrottle

#### Used In
- Infinite Scroll
- Scroll Tracking
- Window Resize
- Mouse Tracking

#### Concepts To Study
- useRef
- Date.now()
- Leading vs Trailing Throttle
- Timer cleanup

#### Common Interview Questions
- Why useRef?
- Why not useState?
- Infinite Scroll → Debounce or Throttle?
- Can you throttle a callback?

---

### 3. useClickOutside

#### Used In
- Dropdown
- Multi Select Dropdown
- Modal
- Context Menu
- Command Palette

#### Concepts To Study
- DOM Events
- Event Bubbling
- Refs
- Event Listener Cleanup

#### Common Interview Questions
- Why useRef?
- Why mousedown instead of click?
- Why cleanup event listeners?
- How does contains() work?

---

### 4. useFetch

#### Used In
- Product Listing
- Dashboard
- Search Results
- API-driven Components

#### Concepts To Study
- Fetch API
- Loading State
- Error Handling
- Retry Logic
- AbortController

#### Common Interview Questions
- Why AbortController?
- How do you avoid race conditions?
- How would you implement retry?
- Why use useCallback?

---

### 5. useIntersectionObserver

#### Used In
- Infinite Scroll
- Lazy Loading Images
- Analytics Tracking

#### Concepts To Study
- Intersection Observer API
- Observer Cleanup
- Viewport Detection

#### Common Interview Questions
- Why not use scroll listeners?
- What is isIntersecting?
- How is Infinite Scroll implemented?

---

# Tier 2: Important ⭐⭐⭐⭐

Frequently asked to test React fundamentals.

### 6. usePrevious

#### Used In
- React Fundamentals
- Form Change Tracking
- Analytics
- Comparison Logic

#### Concepts To Study
- useRef
- Render Cycle
- useEffect Timing

#### Common Interview Questions
- Why useRef?
- Why not useState?
- Why useEffect?
- What happens on first render?

---

### 7. useLocalStorage

#### Used In
- Theme Switcher
- Shopping Cart
- User Preferences

#### Concepts To Study
- localStorage
- JSON.stringify
- JSON.parse
- Lazy Initialization

#### Common Interview Questions
- Why stringify?
- Why parse?
- localStorage vs sessionStorage?
- Why use lazy initialization?

---

# Tier 3: Nice To Know ⭐⭐⭐

Useful but less frequently asked.

### 8. useTimeout

#### Used In
- Toast Notifications
- Auto-close Modal
- Success Messages

#### Concepts To Study
- setTimeout
- Cleanup
- Stale Closures
- useRef

#### Common Interview Questions
- Why store callback in ref?
- How do you cancel timeout?
- Difference from setTimeout?

---

### 9. useInterval

#### Used In
- Pomodoro Timer
- Stopwatch
- Countdown Timer
- Polling

#### Concepts To Study
- setInterval
- Cleanup
- Stale Closures

#### Common Interview Questions
- Difference between timeout and interval?
- Why store callback in ref?
- How do you pause interval?

---

### 10. useWindowSize

#### Used In
- Responsive Dashboard
- Mobile/Desktop Layouts

#### Concepts To Study
- Window Events
- Resize Event
- Cleanup

#### Common Interview Questions
- Why cleanup listener?
- SSR issues with window?
- How would you optimize resize events?

---

# Suggested Study Order

Week 1
- [Done] useDebounce
- [Done] useThrottle

Week 2
- [Done] useClickOutside
- [Done] useFetch

Week 3
- [Done] useIntersectionObserver
- [Done] usePrevious
- [Done] useLocalStorage

Week 4
- [Done] useTimeout
- [Done] useInterval
- [Done] useWindowSize

---

# Machine Coding Mapping

| Machine Coding Question | Hooks |
|----------|----------|
| Autocomplete | useDebounce, useFetch |
| Search Bar | useDebounce |
| Infinite Scroll | useThrottle, useIntersectionObserver |
| Multi Select Dropdown | useClickOutside |
| Dropdown Menu | useClickOutside |
| Modal System | useClickOutside |
| Product Listing | useFetch, useDebounce |
| Dashboard | useFetch, useWindowSize |
| Theme Switcher | useLocalStorage |
| Toast Notification | useTimeout |
| Pomodoro Timer | useInterval |
| React Fundamentals | usePrevious |

---

# Final Interview Checklist

Before interviews, ensure you can:

- Implement all hooks from memory.
- Explain every line of code.
- Explain why each hook exists.
- Explain real-world use cases.
- Answer follow-up questions.
- Use the hook inside a machine coding problem.

Priority Focus:

1. useDebounce
2. useThrottle
3. useClickOutside
4. useFetch
5. useIntersectionObserver

These 5 hooks provide the highest ROI for React machine coding interviews.mation on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
