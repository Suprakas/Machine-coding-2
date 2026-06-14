/* 
Usage in component =>

const [search, setSearch] = useState("");

const debouncedSearch = useDebounce(search, 500);

useEffect(() => {
  fetchData(debouncedSearch);
}, [debouncedSearch]);

*/

import { useState, useEffect } from "react";

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/*
Why useDebounce ?

I use useDebounce to delay updating a value until the user stops changing it for a specified duration.
It's commonly used in search and autocomplete components to avoid making API calls on every keystroke. 
Internally, the hook starts a timeout whenever the value changes. 
If the value changes again before the timeout completes, the previous timeout is cleared. 
Only the latest timeout is allowed to finish, which updates the debounced value.
This reduces unnecessary work and improves performance.

*/
