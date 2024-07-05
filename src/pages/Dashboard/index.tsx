import { Expense } from '@/components/Expense';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { IExpense } from './types';
import axiosClient from '@/configs/axiosConfig';

export const Dashboard = () => {
  const [expenses, setExpenses] = useState<IExpense[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axiosClient.get('/api/expenses');

        setExpenses(res.data);
      } catch (err) {
        console.error('error: ', err);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className='h-full flex flex-col items-center gap-4 p-4'>
      <Button>Add new expense</Button>

      <h1 className='text-3xl font-bold'>All expenses</h1>

      <div className='w-[600px] flex flex-col gap-2'>
        {expenses.map((expense) => (
          <Expense
            title={expense.title}
            amount={expense.amount}
            key={expense._id}
          />
        ))}
      </div>
    </div>
  );
};
