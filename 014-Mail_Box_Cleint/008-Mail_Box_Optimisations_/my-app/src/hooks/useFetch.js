import { useState, useEffect } from "react";

export function useFetch(fetchFn, initialValue = null) {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const [fetchedData, setFetchedData] = useState(initialValue);

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const data = await fetchFn();
                setFetchedData(data);
            } catch (error) {
                setError({ message: error.message || "Failed to fetch data." });
            } finally {
                setIsFetching(false);
            }
        }

        fetchData();
    }, []);

    return {
        isFetching,
        fetchedData,
        error,
    };
}
