import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';
import { Layout } from './components/layouts/MainLayout';
import NotFound from './pages/NotFound';
import { HomePage } from './pages/HomePage/HomePage';
import { ProductDetails } from './pages/ProductDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="product-details/:id" element={<ProductDetails />} />

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
