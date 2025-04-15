import { formatCurrency, formatPercentage } from "../../utils/formatters";

const StockCard = ({ symbol, price, change, timestamp }) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{symbol}</h3>
        <span className="text-xs text-gray-500">{timestamp}</span>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold">{formatCurrency(price)}</p>
        {change !== undefined && (
          <p
            className={`text-sm ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? "▲" : "▼"} {formatPercentage(Math.abs(change))}
          </p>
        )}
      </div>
    </div>
  );
};

export default StockCard;
