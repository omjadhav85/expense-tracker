import { Expense } from '@/components/Expense';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { IExpense } from './types';
import axiosClient from '@/configs/axiosConfig';
import { AddExpenseModal } from '@/components/AddExpenseModal';
import { showError } from '@/lib/utils';

export const Dashboard = () => {
  const [expenses, setExpenses] = useState<IExpense[]>([]);

  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);

  const fetchExpenses = async () => {
    try {
      const res = await axiosClient.get<IExpense[]>('/api/expenses');

      setExpenses(res.data);
    } catch (err) {
      console.error('error: ', err);
    }
  };

  const handleEdit = (expObj: IExpense) => {
    setSelectedExpense(expObj);
    setIsAddExpenseModalOpen(true);
  };

  const handleDelete = async (expObj: IExpense) => {
    try {
      await axiosClient.delete(`/api/expenses/${expObj._id}`);

      await fetchExpenses();
    } catch (err) {
      showError(err);
    }
  };

  const handleExpenseModalClose = () => {
    setIsAddExpenseModalOpen(false);

    setSelectedExpense(null);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className='h-full flex flex-col items-center gap-4 p-4 overflow-auto'>
      <Button onClick={() => setIsAddExpenseModalOpen(true)}>
        Add new expense
      </Button>

      <h1 className='text-3xl font-bold'>All expenses</h1>

      <div className='w-[600px] flex flex-col gap-2'>
        {expenses.map((expense) => (
          <Expense
            expense={expense}
            onEdit={handleEdit}
            onDelete={handleDelete}
            key={expense._id}
          />
        ))}
      </div>
      {isAddExpenseModalOpen && (
        <AddExpenseModal
          isOpen={isAddExpenseModalOpen}
          onClose={handleExpenseModalClose}
          fetchExpenses={fetchExpenses}
          selectedExpense={selectedExpense}
        />
      )}
    </div>
  );
};
