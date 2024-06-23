import { Input } from '@/components/Input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <form className='flex flex-col gap-4'>
        <Input label='Email' type='email' />

        <Input label='Password' type='password' />

        <Button>Login</Button>

        <p className='text-sm'>
          Don't have an account?{' '}
          <Link to='/signup' className='text-blue-500'>
            Sign up!
          </Link>
        </p>
      </form>
    </div>
  );
};
