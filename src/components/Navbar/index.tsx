import { useAuthStore } from '@/store/authStore';
import { Button } from '../ui/button';
import { USER_DATA } from '@/lib/constants';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const resetStore = useAuthStore((state) => state.actions.resetStore);
  const userData = useAuthStore((state) => state.userData);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(USER_DATA);

    resetStore();

    navigate('/');
  };

  return (
    <div className='sticky top-0 p-4 bg-primary w-full flex items-center justify-between'>
      <div>
        <h3 className='text-white font-serif'>Expense Tracker</h3>
      </div>
      {userData && <Button onClick={handleLogout}>Logout</Button>}
    </div>
  );
};
