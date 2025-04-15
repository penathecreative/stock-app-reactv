// Format currency
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

// Format large numbers
export const formatNumber = (value) => {
  return new Intl.NumberFormat("en-US").format(value);
};

// Format percentage
export const formatPercentage = (value) => {
  return `${(value * 100).toFixed(2)}%`;
};

// Format date
export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};
