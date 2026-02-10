import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  MonthlyBudget, 
  Expense, 
  Income, 
  SavingsGoal, 
  BudgetCategory 
} from '../types/budget';
import { mockMonthlyBudget } from '../data/mockData';
import { generateId } from '../utils/helpers';

interface BudgetContextType {
  budget: MonthlyBudget;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  addIncome: (income: Omit<Income, 'id'>) => void;
  updateBudgetCategory: (category: BudgetCategory) => void;
  addBudgetCategory: (category: Omit<BudgetCategory, 'id'>) => void;
  removeBudgetCategory: (id: string) => void;
  updateSavingsGoal: (goal: SavingsGoal) => void;
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id'>) => void;
  removeSavingsGoal: (id: string) => void;
  removeExpense: (id: string) => void;
  removeIncome: (id: string) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [budget, setBudget] = useState<MonthlyBudget>(mockMonthlyBudget);

  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: generateId(),
    };

    setBudget(prevBudget => {
      // Find the corresponding budget category and update spent amount
      const updatedBudgetCategories = prevBudget.budgetCategories.map(category => {
        if (category.name === expenseData.category) {
          return {
            ...category,
            spentAmount: category.spentAmount + expenseData.amount
          };
        }
        return category;
      });

      return {
        ...prevBudget,
        expenses: [...prevBudget.expenses, newExpense],
        budgetCategories: updatedBudgetCategories
      };
    });
  };

  const removeExpense = (id: string) => {
    setBudget(prevBudget => {
      const expense = prevBudget.expenses.find(e => e.id === id);
      
      if (!expense) return prevBudget;

      // Update the corresponding budget category spent amount
      const updatedBudgetCategories = prevBudget.budgetCategories.map(category => {
        if (category.name === expense.category) {
          return {
            ...category,
            spentAmount: Math.max(0, category.spentAmount - expense.amount)
          };
        }
        return category;
      });

      return {
        ...prevBudget,
        expenses: prevBudget.expenses.filter(e => e.id !== id),
        budgetCategories: updatedBudgetCategories
      };
    });
  };

  const addIncome = (incomeData: Omit<Income, 'id'>) => {
    const newIncome: Income = {
      ...incomeData,
      id: generateId(),
    };

    setBudget(prevBudget => ({
      ...prevBudget,
      income: [...prevBudget.income, newIncome]
    }));
  };

  const removeIncome = (id: string) => {
    setBudget(prevBudget => ({
      ...prevBudget,
      income: prevBudget.income.filter(i => i.id !== id)
    }));
  };

  const updateBudgetCategory = (updatedCategory: BudgetCategory) => {
    setBudget(prevBudget => ({
      ...prevBudget,
      budgetCategories: prevBudget.budgetCategories.map(category => 
        category.id === updatedCategory.id ? updatedCategory : category
      )
    }));
  };

  const addBudgetCategory = (categoryData: Omit<BudgetCategory, 'id'>) => {
    const newCategory: BudgetCategory = {
      ...categoryData,
      id: generateId(),
    };

    setBudget(prevBudget => ({
      ...prevBudget,
      budgetCategories: [...prevBudget.budgetCategories, newCategory]
    }));
  };

  const removeBudgetCategory = (id: string) => {
    setBudget(prevBudget => ({
      ...prevBudget,
      budgetCategories: prevBudget.budgetCategories.filter(c => c.id !== id)
    }));
  };

  const updateSavingsGoal = (updatedGoal: SavingsGoal) => {
    setBudget(prevBudget => ({
      ...prevBudget,
      savingsGoals: prevBudget.savingsGoals.map(goal => 
        goal.id === updatedGoal.id ? updatedGoal : goal
      )
    }));
  };

  const addSavingsGoal = (goalData: Omit<SavingsGoal, 'id'>) => {
    const newGoal: SavingsGoal = {
      ...goalData,
      id: generateId(),
    };

    setBudget(prevBudget => ({
      ...prevBudget,
      savingsGoals: [...prevBudget.savingsGoals, newGoal]
    }));
  };

  const removeSavingsGoal = (id: string) => {
    setBudget(prevBudget => ({
      ...prevBudget,
      savingsGoals: prevBudget.savingsGoals.filter(g => g.id !== id)
    }));
  };

  return (
    <BudgetContext.Provider value={{
      budget,
      addExpense,
      addIncome,
      updateBudgetCategory,
      addBudgetCategory,
      removeBudgetCategory,
      updateSavingsGoal,
      addSavingsGoal,
      removeSavingsGoal,
      removeExpense,
      removeIncome
    }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = (): BudgetContextType => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};