// App.tsx
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './utils/constants';
import { Main } from './pages/main/main';
import NotFound from './pages/not-found/not-found';
import About from './pages/about/about';

const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <Main />,
    errorElement: <NotFound />,
  },
  {
    path: ROUTES.NOTFOUND,
    element: <NotFound />,
  },
  {
    path: ROUTES.ABOUT,
    element: <About />,
  },
]);

export default function App(): React.JSX.Element {
  return <RouterProvider router={router} />;
}
