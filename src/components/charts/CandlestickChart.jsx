import React from "react";
import ReactApexChart from "react-apexcharts";
import LoadingSpinner from "../ui/LoadingSpinner";

const CandlestickChart = ({ data, loading, error }) => {
  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-error p-4">Error: {error}</div>;
  if (!data || data.length === 0)
    return <div className="p-4">No data available</div>;

  // Transform data for ApexCharts candlestick format
  const seriesData = data.map((item) => ({
    x: new Date(item.timestamp),
    y: [item.open, item.high, item.low, item.close],
  }));

  // Sort by date in ascending order
  seriesData.sort((a, b) => new Date(a.x) - new Date(b.x));

  const chartOptions = {
    chart: {
      type: "candlestick",
      height: 350,
      toolbar: {
        show: true,
      },
    },
    title: {
      text: "Candlestick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: function (value) {
          return "$" + value.toFixed(2);
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <ReactApexChart
        options={chartOptions}
        series={[
          {
            name: "Stock Price",
            data: seriesData,
          },
        ]}
        type="candlestick"
        height={350}
      />
    </div>
  );
};

export default CandlestickChart;
