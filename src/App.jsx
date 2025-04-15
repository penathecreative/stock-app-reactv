import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import StockDetail from "./pages/StockDetail";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={<Dashboard />}
            />
            <Route
              path="/stock/:symbol"
              element={<StockDetail />}
            />
          </Routes>
        </main>
        <footer className="bg-primary text-white py-4 text-center">
          <p>&copy; {new Date().getFullYear()} Stock Tracker App</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
