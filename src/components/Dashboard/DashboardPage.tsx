import React from 'react';
import BudgetSummary from './BudgetSummary';
import CategoryBudget from './CategoryBudget';
import RecentTransactions from './RecentTransactions';
import SavingsGoalsList from './SavingsGoalsList';
import { useBudget } from '../../context/BudgetContext';
import { getMonthName } from '../../utils/helpers';

const DashboardPage: React.FC = () => {
  const { budget } = useBudget();
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Financial Dashboard
        </h1>
        <p className="text-gray-500 mb-6">
          {getMonthName(budget.month)} {budget.year}
        </p>
        
        <BudgetSummary />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <CategoryBudget />
            <RecentTransactions />
          </div>
          <div>
            <SavingsGoalsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;