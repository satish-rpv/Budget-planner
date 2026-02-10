import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';
import { 
  formatCurrency, 
  calculateSavingsProgress, 
  daysUntilDeadline 
} from '../../utils/helpers';
import { getMonthName } from '../../utils/helpers';
import { Plus, Target, Calendar, Trash2 } from 'lucide-react';
import SavingsForm from './SavingsForm';

const SavingsPage: React.FC = () => {
  const { budget, updateSavingsGoal, removeSavingsGoal } = useBudget();
  const [showSavingsForm, setShowSavingsForm] = useState(false);
  
  const handleContribute = (goalId: string, amount: number) => {
    const goal = budget.savingsGoals.find(g => g.id === goalId);
    if (!goal) return;
    
    updateSavingsGoal({
      ...goal,
      currentAmount: goal.currentAmount + amount
    });
  };
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Savings Goals
            </h1>
            <p className="text-gray-500">
              {getMonthName(budget.month)} {budget.year}
            </p>
          </div>
          
          <button
            onClick={() => setShowSavingsForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Goal
          </button>
        </div>
        
        {budget.savingsGoals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {budget.savingsGoals.map(goal => {
              const progress = calculateSavingsProgress(goal);
              const days = daysUntilDeadline(goal.deadline);
              
              return (
                <div 
                  key={goal.id} 
                  className="bg-white rounded-lg shadow-md p-6 border-t-4 transform transition-all hover:shadow-lg"
                  style={{ borderColor: goal.color }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
                    <button
                      onClick={() => removeSavingsGoal(goal.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <Target className="h-4 w-4 text-gray-500 mr-2" />
                    <p className="text-sm text-gray-700">
                      Goal: <span className="font-medium">{formatCurrency(goal.targetAmount)}</span>
                    </p>
                  </div>
                  
                  {goal.deadline && (
                    <div className="flex items-center mb-3">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                      <p className="text-sm text-gray-700">
                        {days !== null ? (
                          <>
                            {days > 0 
                              ? `${days} days remaining` 
                              : 'Deadline reached'}
                          </>
                        ) : 'No deadline set'}
                      </p>
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Progress</span>
                      <span className="font-medium">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full rounded-full"
                        style={{ width: `${progress}%`, backgroundColor: goal.color }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-600">
                      Current: {formatCurrency(goal.currentAmount)}
                    </span>
                    <span className="text-gray-600">
                      Remaining: {formatCurrency(goal.targetAmount - goal.currentAmount)}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleContribute(goal.id, 50)}
                      className="flex-1 text-xs bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-colors"
                    >
                      +$50
                    </button>
                    <button
                      onClick={() => handleContribute(goal.id, 100)}
                      className="flex-1 text-xs bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-colors"
                    >
                      +$100
                    </button>
                    <button
                      onClick={() => handleContribute(goal.id, 500)}
                      className="flex-1 text-xs bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-colors"
                    >
                      +$500
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No savings goals yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Set up savings goals to start tracking your progress towards financial milestones.
            </p>
            <button
              onClick={() => setShowSavingsForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              Create Your First Goal
            </button>
          </div>
        )}
        
        {showSavingsForm && (
          <SavingsForm onClose={() => setShowSavingsForm(false)} />
        )}
      </div>
    </div>
  );
};

export default SavingsPage;