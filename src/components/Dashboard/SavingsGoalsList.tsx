import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { 
  formatCurrency, 
  calculateSavingsProgress, 
  daysUntilDeadline 
} from '../../utils/helpers';

const SavingsGoalsList: React.FC = () => {
  const { budget, updateSavingsGoal } = useBudget();
  
  const handleContribute = (goalId: string, amount: number) => {
    const goal = budget.savingsGoals.find(g => g.id === goalId);
    if (!goal) return;
    
    updateSavingsGoal({
      ...goal,
      currentAmount: goal.currentAmount + amount
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Savings Goals</h2>
      
      {budget.savingsGoals.length > 0 ? (
        <div className="space-y-6">
          {budget.savingsGoals.map(goal => {
            const progress = calculateSavingsProgress(goal);
            const days = daysUntilDeadline(goal.deadline);
            
            return (
              <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    {Math.round(progress)}%
                  </span>
                </div>
                
                <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ 
                      width: `${progress}%`,
                      backgroundColor: goal.color
                    }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>{formatCurrency(goal.currentAmount)}</span>
                  <span>{formatCurrency(goal.targetAmount)}</span>
                </div>
                
                {days !== null && (
                  <p className="text-xs text-gray-500 mb-3">
                    {days > 0 
                      ? `${days} days remaining to reach goal` 
                      : 'Deadline has passed'}
                  </p>
                )}
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleContribute(goal.id, 50)}
                    className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
                  >
                    +$50
                  </button>
                  <button
                    onClick={() => handleContribute(goal.id, 100)}
                    className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
                  >
                    +$100
                  </button>
                  <button
                    onClick={() => handleContribute(goal.id, 500)}
                    className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
                  >
                    +$500
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-6">No savings goals defined yet.</p>
      )}
    </div>
  );
};

export default SavingsGoalsList;