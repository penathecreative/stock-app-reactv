import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API functions
export const getStockPrice = async (symbol) => {
  try {
    const response = await apiClient.get(`/stock/${symbol}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock price:", error);
    throw error;
  }
};

export const getStockHistory = async (symbol, interval = "daily") => {
  try {
    const response = await apiClient.get(
      `/stock/${symbol}/history?interval=${interval}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stock history:", error);
    throw error;
  }
};
