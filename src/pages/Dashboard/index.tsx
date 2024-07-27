import { Expense } from "@/components/Expense";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { IExpense } from "./types";
import axiosClient from "@/configs/axiosConfig";
import { AddExpenseModal } from "@/components/AddExpenseModal";
import { showError } from "@/lib/utils";

export const Dashboard = () => {
  const [expenses, setExpenses] = useState<IExpense[]>([]);

  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);

  const [isFetching, setIsFetching] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchExpenses = async () => {
    setIsFetching(true);
    try {
      const res = await axiosClient.get<IExpense[]>("/api/expenses");

      setExpenses(res.data);
    } catch (err) {
      console.error("error: ", err);
      showError(err);
    } finally {
      setIsFetching(false);
    }
  };

  const handleEdit = (expObj: IExpense) => {
    setSelectedExpense(expObj);
    setIsAddExpenseModalOpen(true);
  };

  const handleDelete = async (expObj: IExpense) => {
    setIsDeleting(true);
    try {
      await axiosClient.delete(`/api/expenses/${expObj._id}`);

      await fetchExpenses();
    } catch (err) {
      showError(err);
    } finally {
      setIsDeleting(false);
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
    <div className="h-full flex flex-col items-center gap-4 p-4 overflow-auto">
      <Button onClick={() => setIsAddExpenseModalOpen(true)}>
        Add new expense
      </Button>

      <h1 className="text-3xl font-bold">All expenses</h1>

      {isFetching && <div>Fetching expenses...</div>}
      {!isFetching && (
        <div className="w-[600px] flex flex-col gap-2">
          {expenses.map((expense) => (
            <Expense
              key={expense._id}
              expense={expense}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      )}
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
