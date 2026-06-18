
import {
  useEffect,
  useRef,
  useState,
} from "react";

export default function useIntersectionObserver(
  options = {}
) {
  const targetRef = useRef(null);

  const [isVisible, setIsVisible] =
    useState(false);

  useEffect(() => {
    const observer =
      new IntersectionObserver(
        ([entry]) => {
          setIsVisible(
            entry.isIntersecting
          );
        },
        options
      );

    const node = targetRef.current;

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [options]);

  return [targetRef, isVisible];
}

/*
useIntersectionObserver is used to detect when an element enters or leaves the viewport. 
It wraps the browser's IntersectionObserver API and provides a React-friendly interface.
It's commonly used for infinite scrolling, lazy loading images, and visibility tracking.
Compared to scroll listeners, it's more efficient because the browser handles the observation 
internally instead of running calculations on every scroll event.

Q1. Why not use scroll listeners?
Answer

Scroll events fire very frequently and often require manual calculations using getBoundingClientRect().
IntersectionObserver is more efficient because the browser manages the observation internally.

Q2. What is entry.isIntersecting?
Answer

true
Element is visible.
false
Element is outside viewport.

Q3. What is the purpose of useRef?
Answer

We need a reference to the DOM element that should be observed.

Q4. Why cleanup the observer?
Answer

To prevent memory leaks and stop observing elements when the component unmounts.

Q5. Infinite Scroll: How would you implement it?
Answer

Observe the last item in the list. When it becomes visible, fetch the next page of data and update the list.

Q6. What is threshold?

Advanced follow-up.

Example:

{
  threshold: 0.5
}

Means:

50% of element visible

before callback runs.

Q7. What is root?

Example:

{
  root: containerRef.current
}

Instead of viewport:

Observe inside custom container
Q8. What is rootMargin?

Example:

{
  rootMargin: "100px"
}

Trigger observer:

100px before entering viewport

Useful for:

Pre-loading images
Pre-fetching data

Q9. Can one observer watch multiple elements?
Answer
Yes

You can call:

observer.observe(node1);
observer.observe(node2);
observer.observe(node3);
Q10. Does updating observer trigger re-renders?
Answer

Only if we update React state inside the callback. The observer itself does not cause re-renders.

Q11. Is this better than throttling scroll?
Answer

For visibility detection, yes. IntersectionObserver is purpose-built for that problem and generally performs
better than manually throttling scroll events.

*/