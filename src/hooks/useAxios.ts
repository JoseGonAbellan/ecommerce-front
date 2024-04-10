import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface AxiosHookResponse<T> {
    loading: boolean;
    result: T | null;
    error: any;
}

const useAxios = <T>(
    url: string,
    options?: AxiosRequestConfig
): AxiosHookResponse<T> => {
    const [loading, setLoading] = useState<boolean>(true);
    const [result, setResult] = useState<T | null>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(url, options);
                setResult(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();

    }, [options, url]);

    return { loading, result, error };
};

export default useAxios;