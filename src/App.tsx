import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BudgetProvider } from './context/BudgetContext';
import LoginPage from './components/Auth/LoginPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Navbar from './components/Navbar';
import DashboardPage from './components/Dashboard/DashboardPage';
import ExpensePage from './components/Expenses/ExpensePage';
import IncomePage from './components/Income/IncomePage';
import SavingsPage from './components/Savings/SavingsPage';
import ReportsPage from './components/Reports/ReportsPage';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <BudgetProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-100">
                  <Navbar />
                  <Navigate to="/dashboard" replace />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-100">
                  <Navbar />
                  <DashboardPage />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-100">
                  <Navbar />
                  <ExpensePage />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/income"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-100">
                  <Navbar />
                  <IncomePage />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/savings"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-100">
                  <Navbar />
                  <SavingsPage />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-100">
                  <Navbar />
                  <ReportsPage />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BudgetProvider>
    </Router>
  );
}

export default App;