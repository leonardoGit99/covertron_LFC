import { useEffect, useState, useRef } from "react";

// TYPES
type FetchState<T> = {
  state: "idle" | "loading" | "success" | "error";
  data: T | null;
  error: string | null;
};

type FetchFunction<T> = () => Promise<T>;


// HOOK THAT RECEIVES: SERVICE FUNCTION AND DEPENDENCIES ARRAY
export function useFetch<T>(fetchFn: FetchFunction<T>, dependencies: any[] = []) {
  // INITIAL FETCHING STATES
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    state: "idle",
    data: null,
    error: null,
  });

  // TO KNOW IF A COMPONENT THAT CALL THE USEFETCH IS STILL MOUNTED
  const isMounted = useRef(true);


  // FETCHING DATA FUNCTION
  const fetchData = async () => {
    setFetchState({ state: "loading", data: null, error: null }); // LOADING STATE
    try {
      const data = await fetchFn(); // FETCHING DATA FROM SERVICE FUNCTION
      if (isMounted.current) {
        setFetchState({ state: "success", data, error: null }); // SUCCESS STATE
      }
    } catch (error: any) {
      if (isMounted.current) {

        // ERROR STATE
        setFetchState({
          state: "error",
          data: null,
          error: error?.message || "Unknown error",
        });
      }
    }
  };

  // CALL FETCHING DATA FUNCTION INTO THE USE EFFECT
  useEffect(() => {
    isMounted.current = true; // STABLISH THAT COMPONENT IS MOUNTED
    fetchData();
    return () => {
      isMounted.current = false; // STABLISH THAT COMPONENT IS UNMOUNTED
    };
  }, dependencies); // DEPENDENCIES ARRAY

  return {
    ...fetchState, // EXPOSE THE DATA AND STATES
    refetch: fetchData, // EXPOSE THE REFECH TO CALL AGAIN THE SAME FUNCTION
  };
}
