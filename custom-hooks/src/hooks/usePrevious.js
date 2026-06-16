
import { useEffect, useRef } from "react";

export default function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

/*

usePrevious is used to access the value from the previous render. React only gives us the current state, 
so I use a ref to store the latest value after each render. Since refs persist across renders and
updating them doesn't trigger a re-render, during the next render the ref still contains the previous value, which I can return.

Q1. Why useRef?

I need a value that persists across renders without causing re-renders. 
useRef is perfect for that because updating a ref doesn't trigger a component update.

Q2. Why not useState?

Using state would cause another render every time I store the previous value. 
Since the previous value doesn't directly affect rendering logic, a ref is a better choice.

Q3. What will it return on the first render?

undefined because: ref.current hasn't been assigned yet.

Q4. Why is useEffect needed?

The effect runs after rendering. That allows the current render to access 
the previous value before the ref gets updated with the latest value.

Q5. What happens if I update the ref during render?

Example:

ref.current = value;
return ref.current;

Then the hook would always return the current value instead of the previous one because the ref gets overwritten
before the render completes.

Q6. Does updating a ref cause a re-render?

No
That's one of the key differences between:
useRef
useState

Q7. What is stored inside ref.current?

The value from the previous render.

Q8. Can usePrevious store objects?

Yes. It can store primitives, objects, arrays, functions, or any JavaScript value because refs can hold any type.

Q9. Real-world use cases?

Track previous form values
Compare prices
Detect route changes
Analytics
Undo functionality
Animations

*/