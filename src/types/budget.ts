export type ExpenseCategory = 
  | 'Housing'
  | 'Food'
  | 'Transportation'
  | 'Utilities'
  | 'Healthcare'
  | 'Entertainment'
  | 'Shopping'
  | 'Education'
  | 'Personal'
  | 'Debt'
  | 'Insurance'
  | 'Savings'
  | 'Other';

export type IncomeSource = 
  | 'Salary'
  | 'Freelance'
  | 'Investments'
  | 'Bonus'
  | 'Gift'
  | 'Other';

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  description: string;
}

export interface Expense extends Transaction {
  category: ExpenseCategory;
}

export interface Income extends Transaction {
  source: IncomeSource;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: Date;
  color: string;
}

export interface BudgetCategory {
  id: string;
  name: ExpenseCategory;
  budgetedAmount: number;
  spentAmount: number;
  color: string;
}

export interface MonthlyBudget {
  month: number; // 0-11
  year: number;
  income: Income[];
  expenses: Expense[];
  budgetCategories: BudgetCategory[];
  savingsGoals: SavingsGoal[];
}