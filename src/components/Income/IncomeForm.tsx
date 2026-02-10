import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';
import { IncomeSource } from '../../types/budget';
import { X } from 'lucide-react';

interface IncomeFormProps {
  onClose: () => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ onClose }) => {
  const { addIncome } = useBudget();
  
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [source, setSource] = useState<IncomeSource>('Salary');
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  
  const incomeSources: IncomeSource[] = [
    'Salary', 'Freelance', 'Investments', 'Bonus', 'Gift', 'Other'
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (amount <= 0 || !description.trim()) {
      return;
    }
    
    addIncome({
      amount,
      description,
      source,
      date: new Date(date)
    });
    
    // Reset form
    setAmount(0);
    setDescription('');
    setSource('Salary');
    setDate(new Date().toISOString().slice(0, 10));
    
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Add New Income</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount ($)
            </label>
            <input
              type="number"
              id="amount"
              min="0.01"
              step="0.01"
              value={amount || ''}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
              Source
            </label>
            <select
              id="source"
              value={source}
              onChange={(e) => setSource(e.target.value as IncomeSource)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {incomeSources.map(src => (
                <option key={src} value={src}>{src}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-md transition-colors"
            >
              Add Income
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncomeForm;