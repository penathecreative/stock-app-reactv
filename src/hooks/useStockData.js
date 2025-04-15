import { useState, useEffect } from "react";
import { getStockPrice } from "../services/api";

export const useStockData = (symbol) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getStockPrice(symbol);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch stock data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  return { data, loading, error };
};
