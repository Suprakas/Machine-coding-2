import { useState } from "react";

export default function useLocalStorage(
  key,
  initialValue
) {
  const [storedValue, setStoredValue] =
    useState(() => {
      try {
        const item =
          localStorage.getItem(key);

        return item
          ? JSON.parse(item)
          : initialValue;
      } catch {
        return initialValue;
      }
    });

  const setValue = (value) => {
    try {
      setStoredValue(value);

      localStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

/*

useLocalStorage is a custom hook that keeps React state synchronized with the browser's localStorage. 
It initializes state from localStorage if a value already exists, otherwise it falls back to a default value.
Whenever the state changes, it updates localStorage as well. This allows data such as themes, shopping carts, 
and user preferences to persist across page refreshes.

Q1. Why JSON.stringify?

localStorage only stores strings. If I want to store objects, arrays, or booleans, 
I need to serialize them using JSON.stringify before saving.

Q2. Why JSON.parse?

When reading from localStorage, the data comes back as a string. JSON.parse converts it back into its original JavaScript type.

Example:

localStorage.setItem(
  "user",
  JSON.stringify({
    name: "John"
  })
);

Retrieve:

JSON.parse(...)
returns:
{
  name: "John"
}

Q3. Why Lazy Initialization?

useState(() => {...})
instead of:
useState(...)
Because:
Reading from localStorage is relatively expensive compared to normal variable access. 
Lazy initialization ensures it only runs during the first render.

Q4. Why not use useEffect?

You can build it with:
useEffect
but:
Using lazy initialization allows us to read the value immediately during the initial render instead of waiting for an effect.

Q5. Difference between localStorage and sessionStorage?

localStorage
Persists after browser restart.

sessionStorage
Cleared when browser tab closes.

Q6. Can localStorage store objects?

Not directly.
Need:
JSON.stringify()

Q7. What happens if localStorage contains invalid JSON?

Example:

{
broken JSON.

JSON.parse will throw an error, which is why I wrap it inside a try-catch block.

Q8. Is localStorage synchronous or asynchronous?

Synchronous
This is why excessive reads/writes should be avoided.

Q9. Is localStorage shared across tabs?

Yes
Same origin:
Same domain
Same protocol
Same port
shares storage.

Q10. How would you sync updates across multiple tabs?

Use:

window.addEventListener(
  "storage",
  handler
);

The storage event fires when another tab updates localStorage.

Q11. Can localStorage store functions?

No, functions cannot be serialized using JSON.
*/