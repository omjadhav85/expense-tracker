import { Input } from '@/components/Input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const SignupPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <form className='flex flex-col gap-4'>
        <Input label='Username' />

        <Input label='Email' type='email' />

        <Input label='Password' type='password' />

        <Input label='Re-enter password' type='password' />

        <Button>Sign Up</Button>

        <p className='text-sm'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-500'>
            Login!
          </Link>
        </p>
      </form>
    </div>
  );
};
