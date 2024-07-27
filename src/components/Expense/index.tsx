import { useState } from "react";
import { Button } from "../ui/button";
import { IExpense } from "@/pages/Dashboard/types";

interface Props {
  expense: IExpense;
  onEdit: (selectedExpense: IExpense) => void;
  onDelete: (selectedExpense: IExpense) => void;
  isDeleting: boolean;
}

export const Expense = (props: Props) => {
  const { expense, onEdit, onDelete, isDeleting } = props;
  const { amount, title, description } = expense;

  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    onEdit(expense);
  };

  const handleDelete = () => {
    onDelete(expense);
  };

  return (
    <div className="flex flex-col">
      <div
        className="flex items-center gap-4 rounded-md border p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <div>v</div> : <div>{">"}</div>}
        <div className="flex-1 flex items-center justify-between">
          <p>{title}</p>
          <p>&#8377; {amount}</p>
        </div>
      </div>
      {isOpen && (
        <div className="bg-slate-200 flex flex-col gap-4 p-4 rounded-md ">
          {description && <p>{description}</p>}

          <div className="flex gap-4 items-center">
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleDelete}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
