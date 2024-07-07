import { Input } from '@/components/Input';
import { Button } from '@/components/ui/button';
import axiosClient from '@/configs/axiosConfig';
import { USER_DATA } from '@/lib/constants';
import { useAuthStore } from '@/store/authStore';
import { IUserData } from '@/store/types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const setUserData = useAuthStore((state) => state.actions.setUserData);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const res = await axiosClient.post<IUserData>('/api/users/login', {
        email,
        password,
      });

      localStorage.setItem(USER_DATA, JSON.stringify(res.data));

      setUserData(res.data);

      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Err: ', err);
      toast.error(err.response.data.message || 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <Input
          label='Email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type='submit'>Login</Button>

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
