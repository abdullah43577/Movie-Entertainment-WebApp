import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';

// components/pages
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

// components/layouts
import RootLayout from './components/layouts/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />

      {/* this would run only if none of the other pages here were entered i.e someone tried breaking your page going to a different path that's not registered */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
