interface Props {
  title: string;
  amount: number;
}

export const Expense = (props: Props) => {
  const { amount, title } = props;
  return (
    <div className='flex justify-between items-center gap-4'>
      <p>{title}</p>
      <p>&#8377; {amount}</p>
    </div>
  );
};
