import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { ArrowDownCircle, ArrowUpCircle, Trash2 } from 'lucide-react';

const RecentTransactions: React.FC = () => {
  const { budget, removeExpense, removeIncome } = useBudget();
  
  // Combine expenses and income, then sort by date (most recent first)
  const allTransactions = [
    ...budget.expenses.map(expense => ({
      ...expense,
      type: 'expense' as const
    })),
    ...budget.income.map(income => ({
      ...income,
      type: 'income' as const
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5); // Show only 5 most recent transactions

  const handleDelete = (id: string, type: 'expense' | 'income') => {
    if (type === 'expense') {
      removeExpense(id);
    } else {
      removeIncome(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Transactions</h2>
      
      {allTransactions.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {allTransactions.map(transaction => (
            <li key={transaction.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center">
                {transaction.type === 'income' ? (
                  <ArrowUpCircle className="h-6 w-6 text-green-500 mr-3" />
                ) : (
                  <ArrowDownCircle className="h-6 w-6 text-red-500 mr-3" />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-xs text-gray-500">
                    {transaction.type === 'income' 
                      ? `Income - ${(transaction as any).source}` 
                      : `Expense - ${(transaction as any).category}`}
                  </p>
                  <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <p className={`text-sm font-medium ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                } mr-4`}>
                  {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                </p>
                <button 
                  onClick={() => handleDelete(transaction.id, transaction.type)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-6">No recent transactions.</p>
      )}
      
      {allTransactions.length > 0 && (
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-500 hover:text-blue-700 transition-colors">
            View All Transactions
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;