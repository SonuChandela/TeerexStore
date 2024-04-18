import ProductList from './pages/ProductList'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ShopingCart from './pages/ShopingCart';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProductList />
    }, {
      path: "/cart",
      element: <ShopingCart />
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
