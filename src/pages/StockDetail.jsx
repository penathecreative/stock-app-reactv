import { useState } from "react";
import { useParams } from "react-router-dom";
import { useStockData } from "../hooks/useStockData";
import { useHistoricalData } from "../hooks/useHistoricalData";
import StockPriceChart from "../components/charts/StockPriceChart";
import CandlestickChart from "../components/charts/CandlestickChart";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { formatCurrency, formatDate } from "../utils/formatters";

const StockDetail = () => {
  const { symbol } = useParams();
  const {
    data: stockData,
    loading: stockLoading,
    error: stockError,
  } = useStockData(symbol);
  const [interval, setInterval] = useState("daily");
  const {
    data: historicalData,
    loading: histLoading,
    error: histError,
  } = useHistoricalData(symbol, interval);

  const [chartType, setChartType] = useState("line");

  if (stockLoading) return <LoadingSpinner />;
  if (stockError)
    return <div className="text-error p-4">Error: {stockError}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {stockData && (
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{symbol}</h1>
          <div className="mt-2">
            <p className="text-2xl">{formatCurrency(stockData.price)}</p>
            <p className="text-sm text-gray-500">
              Last updated: {formatDate(stockData.timestamp)}
            </p>
          </div>
        </div>
      )}

      <div className="mb-6 flex space-x-4">
        <div>
          <label
            htmlFor="interval"
            className="block text-sm font-medium text-gray-700"
          >
            Interval
          </label>
          <select
            id="interval"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="5min">5 Minute</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="chartType"
            className="block text-sm font-medium text-gray-700"
          >
            Chart Type
          </label>
          <select
            id="chartType"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md"
          >
            <option value="line">Line Chart</option>
            <option value="candlestick">Candlestick Chart</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        {chartType === "line" ? (
          <StockPriceChart
            data={historicalData}
            loading={histLoading}
            error={histError}
          />
        ) : (
          <CandlestickChart
            data={historicalData}
            loading={histLoading}
            error={histError}
          />
        )}
      </div>

      {!histLoading && !histError && historicalData && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Open
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  High
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Low
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Close
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volume
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {historicalData.slice(0, 10).map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(item.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(item.open)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(item.high)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(item.low)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(item.close)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.volume.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StockDetail;
