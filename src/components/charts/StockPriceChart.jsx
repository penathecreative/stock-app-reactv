import React from "react";
import ReactApexChart from "react-apexcharts";
import LoadingSpinner from "../ui/LoadingSpinner";

const StockPriceChart = ({ data, loading, error }) => {
  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-error p-4">Error: {error}</div>;
  if (!data || data.length === 0)
    return <div className="p-4">No data available</div>;

  // Transform data for ApexCharts
  const seriesData = data.map((item) => ({
    x: new Date(item.timestamp),
    y: item.close,
  }));

  // Sort by date in ascending order
  seriesData.sort((a, b) => new Date(a.x) - new Date(b.x));

  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    title: {
      text: "Stock Price Movement",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return "$" + value.toFixed(2);
        },
      },
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
    theme: {
      mode: "light",
      monochrome: {
        enabled: true,
        color: "#22c55e",
        shadeTo: "light",
        shadeIntensity: 0.65,
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
        type="line"
        height={350}
      />
    </div>
  );
};

export default StockPriceChart;
