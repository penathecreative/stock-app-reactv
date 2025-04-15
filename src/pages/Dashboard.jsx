import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StockCard from "../components/ui/StockCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { getStockPrice } from "../services/api";

const DEFAULT_STOCKS = ["AAPL", "MSFT", "GOOGL", "AMZN", "META", "TSLA"];

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoading(true);
        const stocksData = await Promise.all(
          DEFAULT_STOCKS.map(async (symbol) => {
            const data = await getStockPrice(symbol);
            return data;
          })
        );

        setStocks(stocksData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch stocks data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-error p-4">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">Stock Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stocks.map((stock) => (
          <Link
            to={`/stock/${stock.symbol}`}
            key={stock.symbol}
          >
            <StockCard
              symbol={stock.symbol}
              price={stock.price}
              timestamp={stock.timestamp}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
