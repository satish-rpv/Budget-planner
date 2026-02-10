import { Expense, Income, BudgetCategory, ExpenseCategory, SavingsGoal } from '../types/budget';

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

// Format date
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

// Calculate total from expenses
export const calculateTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

// Calculate total from income
export const calculateTotalIncome = (income: Income[]): number => {
  return income.reduce((total, inc) => total + inc.amount, 0);
};

// Calculate remaining budget
export const calculateRemainingBudget = (income: Income[], expenses: Expense[]): number => {
  return calculateTotalIncome(income) - calculateTotalExpenses(expenses);
};

// Calculate percentage of budget used
export const calculateBudgetPercentage = (budgetCategory: BudgetCategory): number => {
  if (budgetCategory.budgetedAmount === 0) return 0;
  return (budgetCategory.spentAmount / budgetCategory.budgetedAmount) * 100;
};

// Calculate savings goal progress
export const calculateSavingsProgress = (goal: SavingsGoal): number => {
  if (goal.targetAmount === 0) return 0;
  return (goal.currentAmount / goal.targetAmount) * 100;
};

// Generate a random ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Get month name
export const getMonthName = (month: number): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month];
};

// Group expenses by category
export const groupExpensesByCategory = (expenses: Expense[]): Record<ExpenseCategory, number> => {
  return expenses.reduce((grouped, expense) => {
    if (!grouped[expense.category]) {
      grouped[expense.category] = 0;
    }
    grouped[expense.category] += expense.amount;
    return grouped;
  }, {} as Record<ExpenseCategory, number>);
};

// Check if budget exceeded
export const isBudgetExceeded = (budgetCategory: BudgetCategory): boolean => {
  return budgetCategory.spentAmount > budgetCategory.budgetedAmount;
};

// Calculate days until deadline
export const daysUntilDeadline = (deadline?: Date): number | null => {
  if (!deadline) return null;
  
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 0;
};