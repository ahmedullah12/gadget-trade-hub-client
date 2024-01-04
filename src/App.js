import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Routes/Routes';
import { Toaster } from 'react-hot-toast';
import RouteTransition from './Routes/RouteTransition';

function App() {
  return (
    <div>
      <Toaster/>
      <RouterProvider router={router}>
      <RouteTransition>
        {router}
      </RouteTransition>
      </RouterProvider>
    </div>
  );
}

export default App;
