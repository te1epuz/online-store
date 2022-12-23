import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Layout } from './components/layouts/MainLayout';
import NotFound from './components/NotFound';
import { HomePage } from './pages/HomePage/HomePage';
import { ProductDetails } from './pages/ProductDetails/ProductDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="product-details/:id" element={<ProductDetails />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
