import { Expense } from '@/components/Expense';
import { Button } from '@/components/ui/button';
import { expenses } from '@/data';

export const Dashboard = () => {
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
