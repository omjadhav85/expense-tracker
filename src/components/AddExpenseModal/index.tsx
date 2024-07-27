import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../Input";
import toast from "react-hot-toast";
import { showError } from "@/lib/utils";
import axiosClient from "@/configs/axiosConfig";
import { IExpense } from "@/pages/Dashboard/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  fetchExpenses: () => Promise<void>;
  selectedExpense: IExpense | null;
}

export const AddExpenseModal = ({
  isOpen,
  onClose,
  fetchExpenses,
  selectedExpense,
}: Props) => {
  const [data, setData] = useState({
    title: "",
    amount: 0,
    desc: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { amount, desc, title } = data;

  const updateData = (event: any) => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount || !title) {
      toast.error("Amount and title are required!");
      return;
    }
    setIsLoading(true);
    try {
      if (isEditMode) {
        await axiosClient.put(`/api/expenses/${selectedExpense?._id}`, {
          title,
          amount,
          description: desc,
        });
      } else {
        await axiosClient.post("/api/expenses", {
          title,
          amount,
          description: desc,
        });
      }

      await fetchExpenses();

      onClose();
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getBtnText = useCallback(() => {
    if (isEditMode) {
      if (isLoading) {
        return "Editing...";
      }

      return "Edit";
    }

    if (isLoading) {
      return "Adding...";
    }

    return "Add";
  }, [isEditMode, isLoading]);

  const btnText = useMemo(() => getBtnText(), [getBtnText]);

  useEffect(() => {
    if (selectedExpense) {
      setIsEditMode(true);
      setData({
        amount: selectedExpense.amount,
        desc: selectedExpense.description,
        title: selectedExpense.title,
      });
    }
  }, [selectedExpense]);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit expense" : "Add expense"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Make any changes to an existing expense"
              : "Add new expense in the database"}
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            label="Title"
            value={title}
            onChange={updateData}
            name="title"
            required
          />
          <Input
            label="Amount"
            type="number"
            value={amount || ""}
            onChange={updateData}
            name="amount"
            required
          />

          <Input
            label="Description"
            value={desc}
            onChange={updateData}
            name="desc"
          />
          <DialogFooter>
            <Button type="submit">{btnText}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
