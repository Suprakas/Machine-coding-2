
import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    const controller =
      new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await fetch(url, {
            signal:
              controller.signal,
          });

        if (!response.ok) {
          throw new Error(
            "Failed to fetch"
          );
        }

        const result =
          await response.json();

        setData(result);
      } catch (err) {
        if (
          err.name !==
          "AbortError"
        ) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () =>
      controller.abort();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
}

/*

useFetch is a reusable custom hook that encapsulates API fetching logic. 
It manages loading, error, and data states so that components remain clean and focused on rendering.
Internally, it uses useEffect to trigger requests whenever the URL changes and handles success, failure, 
and cleanup scenarios. In production, I would also use AbortController to cancel pending requests when the component unmounts.

Questions Interviewers Commonly Ask
Q1. Why use a custom hook?
Answer

To avoid duplicating API-fetching logic across multiple components and keep components cleaner.

Q2. Why use useEffect?
Answer

Because API calls are side effects. They should run after rendering, which is exactly what useEffect is designed for.

Q3. Why loading state?
Answer

To provide user feedback while data is being fetched.

Example:

Loading...
Spinner...
Skeleton UI...
Q4. Why error state?
Answer

To gracefully handle API failures instead of leaving the UI blank.

Q5. What is AbortController?
Answer

AbortController allows us to cancel an ongoing fetch request. This prevents state updates after a component unmounts 
and avoids race conditions.

Q6. What happens if component unmounts during fetch?
Answer

Without cleanup, the request may complete and attempt to update state on an unmounted component. AbortController prevents this.

Q7. What is a race condition?

Example:

Search: "R"
Search: "Re"
Search: "React"

Request order:

Request 1 → slow
Request 2 → fast
Request 3 → fastest

Responses:

React
Re
R

Wrong UI.

Answer

Race conditions occur when older requests finish after newer ones and overwrite fresh data with stale results.

Q8. How would you prevent race conditions?
Answer
AbortController
Request IDs
React Query
SWR

Q9. Can useFetch support POST requests?
Answer
Yes

By accepting:

{
  method,
  headers,
  body
}

as options.

Q10. Can we cache responses?
Answer
Yes

Use:

useRef
Map
React Query
SWR

Q11. What happens when URL changes?
Answer

Since url is in the dependency array, the effect runs again and fetches new data.

Q12. Why use finally?
Answer

loading should become false whether the request succeeds or fails.
*/