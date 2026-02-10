import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';
import { getMonthName } from '../../utils/helpers';
import { Plus } from 'lucide-react';

const ExpensePage: React.FC = () => {
  const { budget } = useBudget();
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Expense Tracker
            </h1>
            <p className="text-gray-500">
              {getMonthName(budget.month)} {budget.year}
            </p>
          </div>
          
          <button
            onClick={() => setShowExpenseForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Expense
          </button>
        </div>
        
        <ExpenseList />
        
        {showExpenseForm && (
          <ExpenseForm onClose={() => setShowExpenseForm(false)} />
        )}
      </div>
    </div>
  );
};

export default ExpensePage;