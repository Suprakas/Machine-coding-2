

/* usage : Infinite scroll ->

const throttledPage = useThrottle(page, 500);

useEffect(() => {
  fetchProducts(throttledPage);
}, [throttledPage]);

*/

import { useEffect, useRef, useState } from "react";

export default function useThrottle(value, delay) {
  const [throttledValue, setThrottledValue] = useState(value);

  const lastExecuted = useRef(0);

  useEffect(() => {
    const now = Date.now();

    if (now - lastExecuted.current >= delay) {
      setThrottledValue(value);
      lastExecuted.current = now;
      return;
    }

    const timer = setTimeout(() => {
      setThrottledValue(value);
      lastExecuted.current = Date.now();
    }, delay - (now - lastExecuted.current));

    return () => clearTimeout(timer);
  }, [value, delay]);

  return throttledValue;
}

/*
Q1: Why would you use useThrottle?

Suppose a user is continuously scrolling a page. The scroll event can fire hundreds of times per second.
If I perform expensive calculations or API calls on every event, it can hurt performance. 
useThrottle helps by ensuring the update happens only once every specified interval, such as every 300ms. 
Internally, it tracks when the last update occurred and ignores intermediate
updates until the delay period has passed.

Q2: Difference between debounce and throttle?
Debounce waits for the user to stop performing an action,
whereas throttle allows the action to continue but limits how often it can execute.

Q3. When would you use Throttle?

I would use throttle whenever an event fires very frequently and I want to limit how often my logic runs. 
Common examples are scroll events, resize events, mouse movement tracking, and infinite scrolling. 
For example, during scrolling, hundreds of events can fire every second, 
so throttling helps reduce unnecessary work and improves performance.

Q4. Can we throttle a callback instead of a value?

Yes. In fact, in real applications, throttling a callback is very common. 
Instead of throttling a value, we can throttle a function so that no matter how many times it's called,
it only executes once within the specified interval. 
This is useful for scroll handlers, resize handlers, and analytics tracking events.

Q5. For Infinite Scroll, would you choose Debounce or Throttle?

I would choose throttle. Infinite scroll depends on the user continuously scrolling,
so I still want periodic updates while scrolling is happening. 
If I used debounce, the logic would only execute after the user stopped scrolling,
which could delay loading the next set of data. 
Throttle gives me a good balance between performance and responsiveness.

Q6. Why did you use useRef(0) instead of useRef(Date.now())?

Using 0 ensures the first value is emitted immediately. If I initialize it with Date.now(), 
the hook may unnecessarily delay the first update because it appears as if an execution just happened.

Q7. Explain the implementation ?

This hook throttles a value, meaning it allows updates at most once every specified delay.
 I keep track of the last execution time using a ref. 
 Whenever the value changes, I check whether enough time has passed since the previous update. 
 If yes, I update immediately. Otherwise, I schedule an update after the remaining delay.
 I also clear any pending timeout in the cleanup function to avoid stale updates.

*/