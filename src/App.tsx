import { RouterProvider } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { router } from './router';

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
