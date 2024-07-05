import { Input } from '@/components/Input';
import { Button } from '@/components/ui/button';
import axiosClient from '@/configs/axiosConfig';
import { USER_DATA } from '@/lib/constants';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export const SignupPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = userData;

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords does not match!');
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosClient.post('/api/users/signup', {
        name,
        email,
        password,
      });

      localStorage.setItem(USER_DATA, JSON.stringify(res.data));

      toast.success('Sign up successful!');
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
        <Input label='Name' value={name} name='name' onChange={updateField} />

        <Input
          label='Email'
          type='email'
          value={email}
          name='email'
          onChange={updateField}
        />

        <Input
          label='Password'
          type='password'
          value={password}
          name='password'
          onChange={updateField}
        />

        <Input
          label='Re-enter password'
          type='password'
          value={confirmPassword}
          name='confirmPassword'
          onChange={updateField}
        />

        <Button type='submit'>Sign Up</Button>

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
