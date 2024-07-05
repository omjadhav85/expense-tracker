import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
]);

function App() {
  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <Navbar />
      <div
        className='flex flex-col overflow-auto'
        style={{
          height: 'calc(100vh - 3.5rem)',
        }}
      >
        <RouterProvider router={router} />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
