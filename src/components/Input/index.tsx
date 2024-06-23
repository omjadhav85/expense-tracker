import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  otherClasses?: string;
}

export const Input = (props: Props) => {
  const { label, error, otherClasses } = props;
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        {...props}
        className={`${otherClasses} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none`}
      />
      {error && <span className='text-red-500 text-sm'>{error}</span>}
    </div>
  );
};
