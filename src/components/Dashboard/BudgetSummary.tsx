import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { 
  calculateTotalIncome, 
  calculateTotalExpenses, 
  calculateRemainingBudget, 
  formatCurrency 
} from '../../utils/helpers';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const BudgetSummary: React.FC = () => {
  const { budget } = useBudget();
  
  const totalIncome = calculateTotalIncome(budget.income);
  const totalExpenses = calculateTotalExpenses(budget.expenses);
  const remainingBudget = calculateRemainingBudget(budget.income, budget.expenses);
  
  // Calculate percentage of income spent
  const percentageSpent = totalIncome > 0 
    ? Math.round((totalExpenses / totalIncome) * 100) 
    : 0;
  
  // Calculate savings rate
  const savingsRate = totalIncome > 0 
    ? Math.round((remainingBudget / totalIncome) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Total Income */}
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 transform transition-all hover:scale-105 duration-300">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Income</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalIncome)}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <TrendingUp className="h-6 w-6 text-blue-500" />
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-500">From {budget.income.length} source(s)</p>
      </div>
      
      {/* Total Expenses */}
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500 transform transition-all hover:scale-105 duration-300">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Expenses</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalExpenses)}</p>
          </div>
          <div className="p-3 bg-red-100 rounded-full">
            <TrendingDown className="h-6 w-6 text-red-500" />
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-500">{percentageSpent}% of income spent</p>
      </div>
      
      {/* Remaining Budget */}
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500 transform transition-all hover:scale-105 duration-300">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">Remaining Budget</p>
            <p className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(remainingBudget)}
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <Wallet className="h-6 w-6 text-green-500" />
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-500">{savingsRate}% savings rate</p>
      </div>
    </div>
  );
};

export default BudgetSummary;