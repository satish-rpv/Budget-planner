import { MonthlyBudget, Expense, Income, BudgetCategory, SavingsGoal } from '../types/budget';
import { generateId } from '../utils/helpers';

// Current date info
const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

// Mock expenses
const mockExpenses: Expense[] = [
  {
    id: generateId(),
    amount: 1500,
    date: new Date(currentYear, currentMonth, 5),
    description: 'Monthly Rent',
    category: 'Housing',
  },
  {
    id: generateId(),
    amount: 400,
    date: new Date(currentYear, currentMonth, 8),
    description: 'Grocery Shopping',
    category: 'Food',
  },
  {
    id: generateId(),
    amount: 120,
    date: new Date(currentYear, currentMonth, 12),
    description: 'Electricity Bill',
    category: 'Utilities',
  },
  {
    id: generateId(),
    amount: 80,
    date: new Date(currentYear, currentMonth, 15),
    description: 'Internet Bill',
    category: 'Utilities',
  },
  {
    id: generateId(),
    amount: 200,
    date: new Date(currentYear, currentMonth, 18),
    description: 'Dining Out',
    category: 'Food',
  },
  {
    id: generateId(),
    amount: 150,
    date: new Date(currentYear, currentMonth, 20),
    description: 'Gas',
    category: 'Transportation',
  },
  {
    id: generateId(),
    amount: 50,
    date: new Date(currentYear, currentMonth, 22),
    description: 'Movie Night',
    category: 'Entertainment',
  },
  {
    id: generateId(),
    amount: 300,
    date: new Date(currentYear, currentMonth, 25),
    description: 'New Clothes',
    category: 'Shopping',
  }
];

// Mock income
const mockIncome: Income[] = [
  {
    id: generateId(),
    amount: 4000,
    date: new Date(currentYear, currentMonth, 1),
    description: 'Monthly Salary',
    source: 'Salary',
  },
  {
    id: generateId(),
    amount: 500,
    date: new Date(currentYear, currentMonth, 15),
    description: 'Freelance Project',
    source: 'Freelance',
  }
];

// Mock budget categories
const mockBudgetCategories: BudgetCategory[] = [
  {
    id: generateId(),
    name: 'Housing',
    budgetedAmount: 1500,
    spentAmount: 1500,
    color: '#3B82F6', // blue
  },
  {
    id: generateId(),
    name: 'Food',
    budgetedAmount: 700,
    spentAmount: 600,
    color: '#10B981', // green
  },
  {
    id: generateId(),
    name: 'Transportation',
    budgetedAmount: 200,
    spentAmount: 150,
    color: '#F59E0B', // amber
  },
  {
    id: generateId(),
    name: 'Utilities',
    budgetedAmount: 250,
    spentAmount: 200,
    color: '#8B5CF6', // purple
  },
  {
    id: generateId(),
    name: 'Entertainment',
    budgetedAmount: 150,
    spentAmount: 50,
    color: '#EC4899', // pink
  },
  {
    id: generateId(),
    name: 'Shopping',
    budgetedAmount: 300,
    spentAmount: 300,
    color: '#F97316', // orange
  }
];

// Mock savings goals
const mockSavingsGoals: SavingsGoal[] = [
  {
    id: generateId(),
    name: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 5000,
    deadline: new Date(currentYear + 1, 0, 1),
    color: '#3B82F6', // blue
  },
  {
    id: generateId(),
    name: 'Vacation',
    targetAmount: 2000,
    currentAmount: 800,
    deadline: new Date(currentYear, currentMonth + 3, 1),
    color: '#10B981', // green
  },
  {
    id: generateId(),
    name: 'New Laptop',
    targetAmount: 1500,
    currentAmount: 300,
    deadline: new Date(currentYear, currentMonth + 6, 1),
    color: '#F59E0B', // amber
  }
];

// Create mock monthly budget
export const mockMonthlyBudget: MonthlyBudget = {
  month: currentMonth,
  year: currentYear,
  income: mockIncome,
  expenses: mockExpenses,
  budgetCategories: mockBudgetCategories,
  savingsGoals: mockSavingsGoals,
};