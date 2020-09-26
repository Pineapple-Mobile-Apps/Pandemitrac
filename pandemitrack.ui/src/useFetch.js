import { useEffect, useState } from "react";

export default function useFetch(url, options, depends) {
    const [request, setRequest] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(async () => {
        setIsLoading(true);
        try {
            let request = await fetch(url, options);
            let json = await request.json();
            setData(json);
            setRequest(request);
            setError(null);
        } catch (e) {
            setError(e);
        }
        setIsLoading(false);
    }, depends);

    return { request, isLoading, error, data };
}