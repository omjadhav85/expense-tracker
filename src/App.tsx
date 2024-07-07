import { RouterProvider } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { router } from './router';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
