import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { formatCurrency, calculateBudgetPercentage, isBudgetExceeded } from '../../utils/helpers';

const CategoryBudget: React.FC = () => {
  const { budget } = useBudget();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Budget by Category</h2>
      
      <div className="space-y-4">
        {budget.budgetCategories.map(category => {
          const percentage = calculateBudgetPercentage(category);
          const exceeded = isBudgetExceeded(category);
          
          return (
            <div key={category.id} className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                </div>
                <div className="text-sm text-right">
                  <span className={`font-medium ${exceeded ? 'text-red-600' : 'text-gray-700'}`}>
                    {formatCurrency(category.spentAmount)}
                  </span>
                  <span className="text-gray-500"> / {formatCurrency(category.budgetedAmount)}</span>
                </div>
              </div>
              
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    exceeded ? 'bg-red-500' : 
                    percentage > 80 ? 'bg-amber-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs mt-1">
                <span className={`${exceeded ? 'text-red-600' : 'text-gray-500'}`}>
                  {Math.round(percentage)}% used
                </span>
                <span className="text-gray-500">
                  {formatCurrency(Math.max(category.budgetedAmount - category.spentAmount, 0))} left
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {budget.budgetCategories.length === 0 && (
        <p className="text-gray-500 text-center py-6">No budget categories defined yet.</p>
      )}
    </div>
  );
};

export default CategoryBudget;