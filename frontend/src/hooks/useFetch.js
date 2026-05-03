import { useEffect, useState } from "react";

export default function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const result = await fetcher();
        if (mounted) setData(result);
      } catch (err) {
        if (mounted) setError(err?.response?.data?.message || err.message || "Request failed");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, deps);

  return { data, loading, error };
}
