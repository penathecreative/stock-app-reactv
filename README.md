# 📈 Stock Tracker App

A modern React-based application that allows users to track real-time stock prices and view historical performance with interactive charts.

## 🔍 Features

- 📊 View real-time prices of popular stocks (e.g. AAPL, MSFT, GOOGL)
- 📈 Interactive line and candlestick charts
- 🕒 Switch between different time intervals (daily, weekly, monthly, 5min)
- 🔍 Detailed view per stock symbol
- 💅 Beautifully styled with Tailwind CSS

## 🛠️ Tech Stack

- React (with Hooks)
- React Router v6
- Tailwind CSS
- Chart.js & Recharts
- Custom Hooks for API calls

## 📂 Folder Structure

/src
├── components
│ ├── layout/Navbar.js
│ ├── ui/StockCard.js
│ ├── ui/LoadingSpinner.js
│ └── charts/
│ ├── StockPriceChart.js
│ └── CandlestickChart.js
├── pages
│ ├── Dashboard.js
│ └── StockDetail.js
├── hooks/
│ ├── useStockData.js
│ └── useHistoricalData.js
├── services/
│ └── api.js
├── utils/
│ └── formatters.js
└── App.js

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/stock-tracker-app.git
cd stock-tracker-app
```

### 2. Install dependencies

bash
Copy
Edit
npm install

### 3. Configure your API key

Create a .env file in the root of your project and add your stock market API key:

env
Copy
Edit
VITE_API_KEY=your_api_key_here
💡 You can get a free API key from services like Alpha Vantage or Finnhub.

### 4. Start the development server

bash
Copy
Edit
npm run dev
Open your browser at http://localhost:5173.

## 📦 Build for Production

bash
Copy
Edit
npm run build
🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

## Made with ❤️ by Bruno Fernandes
