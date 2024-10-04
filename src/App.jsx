
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProductList from "./pages/productList";
import Cart from "./pages/ShoppingCart";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProductList />
    },
    {
      path: "/cart",
      element: <Cart />
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
