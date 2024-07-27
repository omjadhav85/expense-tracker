import { Expense } from '@/components/Expense';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { IExpense } from './types';
import axiosClient from '@/configs/axiosConfig';
import { AddExpenseModal } from '@/components/AddExpenseModal';
import { showError } from '@/lib/utils';
import { getMonth, getYear } from 'date-fns';

const monthMapping: Record<string, number> = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

export const Dashboard = () => {
  const [expenses, setExpenses] = useState<IExpense[]>([]);

  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);

  const [month, setMonth] = useState(getMonth(new Date()) + 1);
  const [year, setYear] = useState(getYear(new Date()));

  const fetchExpenses = async () => {
    try {
      const res = await axiosClient.get<IExpense[]>('/api/expenses', {
        params: {
          month: month,
          year: year,
        },
      });

      setExpenses(res.data);
    } catch (err) {
      console.error('error: ', err);
      showError(err);
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
  }, [month, year]);

  return (
    <div className='h-full flex flex-col items-center gap-4 p-4 overflow-auto'>
      <Button onClick={() => setIsAddExpenseModalOpen(true)}>
        Add new expense
      </Button>

      <h1 className='text-3xl font-bold'>All expenses</h1>

      <div className='flex gap-4'>
        <select
          id='month'
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className='p-2 outline-none cursor-pointer rounded-md  bg-transparent border border-blue-300'
        >
          {Object.keys(monthMapping).map((m) => (
            <option key={m} value={monthMapping[m]}>
              {m}
            </option>
          ))}
        </select>

        <select
          id='year'
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className='p-2 outline-none cursor-pointer rounded-md  bg-transparent border border-blue-300'
        >
          {[2023, 2024, 2025].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

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
