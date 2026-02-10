import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { 
  formatCurrency, 
  calculateTotalIncome, 
  calculateTotalExpenses, 
  groupExpensesByCategory,
  getMonthName
} from '../../utils/helpers';

const ReportsPage: React.FC = () => {
  const { budget } = useBudget();
  
  const totalIncome = calculateTotalIncome(budget.income);
  const totalExpenses = calculateTotalExpenses(budget.expenses);
  const remainingBudget = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (remainingBudget / totalIncome) * 100 : 0;
  
  // Group expenses by category
  const expensesByCategory = groupExpensesByCategory(budget.expenses);
  
  // Sort categories by amount spent (descending)
  const sortedCategories = Object.entries(expensesByCategory)
    .sort(([, amountA], [, amountB]) => amountB - amountA);
  
  // Find the categories with highest and lowest spending
  const highestCategory = sortedCategories.length > 0 ? sortedCategories[0][0] : 'None';
  const lowestCategory = sortedCategories.length > 0 ? sortedCategories[sortedCategories.length - 1][0] : 'None';
  
  // Calculate percentage of total for each category
  const categoryPercentages = sortedCategories.map(([category, amount]) => ({
    category,
    amount,
    percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
  }));
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Financial Reports
          </h1>
          <p className="text-gray-500">
            {getMonthName(budget.month)} {budget.year}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Income vs Expenses */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Income vs Expenses</h2>
            
            <div className="flex flex-col space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-500">Total Income</span>
                  <span className="text-sm font-medium text-green-600">{formatCurrency(totalIncome)}</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full">
                  <div className="h-full bg-green-500 rounded-full w-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-500">Total Expenses</span>
                  <span className="text-sm font-medium text-red-600">{formatCurrency(totalExpenses)}</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-red-500 rounded-full" 
                    style={{ width: `${Math.min((totalExpenses / totalIncome) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-900">Remaining</span>
                  <span className={`text-sm font-medium ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(remainingBudget)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-900">Savings Rate</span>
                  <span className={`text-sm font-medium ${savingsRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {savingsRate.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Expense Insights */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Expense Insights</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-500 font-medium uppercase">Highest Spending</p>
                  <p className="text-lg font-semibold text-gray-900">{highestCategory}</p>
                  {sortedCategories.length > 0 && (
                    <p className="text-sm text-gray-600">{formatCurrency(sortedCategories[0][1])}</p>
                  )}
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-500 font-medium uppercase">Lowest Spending</p>
                  <p className="text-lg font-semibold text-gray-900">{lowestCategory}</p>
                  {sortedCategories.length > 0 && (
                    <p className="text-sm text-gray-600">
                      {formatCurrency(sortedCategories[sortedCategories.length - 1][1])}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Number of transactions: {budget.expenses.length}</p>
                <p className="text-sm font-medium text-gray-700 mb-4">Average expense: {
                  budget.expenses.length > 0 
                    ? formatCurrency(totalExpenses / budget.expenses.length) 
                    : formatCurrency(0)
                }</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Spending by Category */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Spending by Category</h2>
          
          {categoryPercentages.length > 0 ? (
            <div className="space-y-4">
              {categoryPercentages.map(({ category, amount, percentage }) => (
                <div key={category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                    <div>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(amount)}</span>
                      <span className="text-sm text-gray-500 ml-2">({percentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: budget.budgetCategories.find(c => c.name === category)?.color || '#3B82F6'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No expense data available.</p>
          )}
        </div>
        
        {/* Budget Utilization */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Budget Utilization</h2>
          
          {budget.budgetCategories.length > 0 ? (
            <div className="space-y-4">
              {budget.budgetCategories.map(category => {
                const utilizationPercentage = category.budgetedAmount > 0 
                  ? (category.spentAmount / category.budgetedAmount) * 100 
                  : 0;
                
                let statusColor = 'text-green-600';
                let statusText = 'Under budget';
                
                if (utilizationPercentage > 90 && utilizationPercentage <= 100) {
                  statusColor = 'text-amber-600';
                  statusText = 'Near limit';
                } else if (utilizationPercentage > 100) {
                  statusColor = 'text-red-600';
                  statusText = 'Over budget';
                }
                
                return (
                  <div key={category.id} className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200">
                    <div className="mb-2 sm:mb-0">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="text-sm font-medium text-gray-900">{category.name}</span>
                      </div>
                      <span className={`text-xs ${statusColor}`}>{statusText}</span>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="text-sm">
                        <span className="font-medium text-gray-900">{formatCurrency(category.spentAmount)}</span>
                        <span className="text-gray-500"> / {formatCurrency(category.budgetedAmount)}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {Math.round(utilizationPercentage)}% utilized
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No budget categories defined.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;