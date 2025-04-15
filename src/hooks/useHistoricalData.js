import { useState, useEffect } from "react";
import { getStockHistory } from "../services/api";

export const useHistoricalData = (symbol, interval = "daily") => {
  const [data, setData] = useState([]);
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
        const result = await getStockHistory(symbol, interval);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch historical data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol, interval]);

  return { data, loading, error };
};
