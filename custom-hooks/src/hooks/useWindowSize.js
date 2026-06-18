import { useEffect, useState } from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] =
    useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  return windowSize;
}

/*

useWindowSize is a custom hook that tracks the browser window's width and height. 
It listens for resize events and updates React state whenever the viewport dimensions change. 
It's commonly used for responsive layouts, adaptive dashboards, and mobile-versus-desktop rendering. 
The hook also cleans up the resize listener when the component unmounts.

Questions Interviewers Commonly Ask
Q1. Why useEffect?
Answer

Attaching event listeners is a side effect. React recommends handling side effects inside useEffect.

Q2. Why cleanup listener?
Answer

To prevent memory leaks and avoid registering duplicate event listeners.

Q3. What event are you listening to?
Answer
resize

Browser fires this event whenever the window size changes.

Q4. What triggers re-render?
Answer
setWindowSize(...)

updates React state.

Q5. Why not useRef?
Answer

The window dimensions affect the UI, so state is appropriate. Using a ref would not trigger re-renders when the size changes.

Q6. What is the SSR issue?
Answer

During server-side rendering, window doesn't exist. Accessing window.innerWidth directly can throw an error.

Q7. How do you fix SSR issues?
Answer

Initialize with:

{
  width: undefined,
  height: undefined
}

and read:

window.innerWidth

inside:

useEffect

which only runs in the browser.

Q8. Can resize events fire frequently?
Answer
Yes

Dragging a browser edge can fire many resize events.

Q9. How would you optimize this?

Advanced question.

Answer

Use:

Throttle
Debounce

Example:

const throttledResize =
  useThrottle(width, 200);

or throttle the resize handler itself.

Q10. Could you use ResizeObserver instead?

Advanced browser question.

Answer
Yes

But:

ResizeObserver

observes:

Specific Elements

while:

useWindowSize

observes:

Entire Window

Q11. What happens when component unmounts?
Answer

React executes:

removeEventListener(...)

and removes the listener.

Q12. Time Complexity?
Answer

Each resize event:

O(1)

Just reading:

window.innerWidth
window.innerHeight

and updating state.
*/