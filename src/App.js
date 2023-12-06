import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Routes/Routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Toaster/>
      <RouterProvider router={router}>
      
      </RouterProvider>
    </div>
  );
}

export default App;
