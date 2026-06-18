import { useEffect, useRef } from "react";

export default function useTimeout(
  callback,
  delay
) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay == null) return;

    const id = setTimeout(() => {
      savedCallback.current?.();
    }, delay);

    return () => clearTimeout(id);
  }, [delay]);
}

/*

useTimeout is a reusable hook that executes a callback after a specified delay. 
It wraps the native setTimeout API and automatically handles cleanup when the component unmounts or the delay changes. 
To avoid stale closure issues, I store the latest callback inside a ref and execute the ref value when the timer completes.

Questions Interviewers Commonly Ask
Q1. Why useRef?
Answer

To always access the latest callback without recreating the timeout on every render.

Q2. Why not directly call callback inside setTimeout?

Bad:

setTimeout(callback, delay);
Answer

Because the callback may become stale if state changes before the timeout executes.

Q3. What is a stale closure?
Answer

A stale closure occurs when an asynchronous function captures outdated state or props values from an earlier render.

Q4. Why cleanup timeout?
Answer

To prevent timers from running after the component unmounts and avoid memory leaks.

Q5. What happens if delay changes?
Answer

The old timeout is cleared and a new timeout is scheduled using the updated delay.

Q6. Why check delay == null?
if (delay == null) return;
Answer

It allows pausing or disabling the timeout.

Example:

useTimeout(callback, null);

No timer runs.

Q7. Difference between useTimeout and useInterval?
Answer

useTimeout

Runs once.

useInterval

Runs repeatedly.

Q8. Does updating a ref cause a re-render?
Answer
No

Refs persist values without triggering renders.

Q9. Can we implement useTimeout using state?
Answer

Technically yes, but it would cause unnecessary re-renders. Refs are better for timer IDs and callback references.

Q10. What is the lifecycle of this hook?
Answer

Render
↓
Store callback in ref
↓
Create timeout
↓
Execute callback
↓
Cleanup on unmount
*/