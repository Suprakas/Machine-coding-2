import { useEffect, useRef } from "react";

export default function useInterval(
  callback,
  delay
) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay == null) return;

    const id = setInterval(() => {
      savedCallback.current?.();
    }, delay);

    return () => clearInterval(id);
  }, [delay]);
}

/*

useInterval is a reusable hook that repeatedly executes a callback at a specified interval. 
It wraps the native setInterval API and automatically handles cleanup when the component unmounts or the delay changes. 
To avoid stale closure issues, I store the latest callback inside a ref and execute the ref value on every interval tick.

Questions Interviewers Commonly Ask
Q1. Why useRef?
Answer

To always access the latest callback without recreating the interval on every render.

Q2. What is a stale closure?
Answer

A stale closure occurs when an asynchronous callback captures old state or props values from a previous render.

Q3. Why not write this?
setInterval(callback, delay);
Answer

Because the callback may become stale and continue using outdated state values.

Q4. Why cleanup interval?
Answer

To prevent memory leaks and stop the interval when the component unmounts.

Q5. What happens if delay changes?
Answer

React cleans up the old interval and creates a new one using the updated delay.

Q6. How do you pause an interval?
Answer
useInterval(callback, null);

Because:

if (delay == null) return;

prevents interval creation.

Q7. Difference between useTimeout and useInterval?
Answer
useTimeout

Runs:

Once
useInterval

Runs:

Repeatedly
Q8. What if callback updates state?
Answer

That's perfectly fine.

Example:

setCount(prev => prev + 1);

is a very common use case.

Q9. Does updating a ref cause re-renders?
Answer
No

Refs persist values without triggering renders.

Q10. Can we implement polling using useInterval?
Answer
Yes

Example:

useInterval(() => {
  fetchNotifications();
}, 30000);

Fetch every:

30 seconds
*/