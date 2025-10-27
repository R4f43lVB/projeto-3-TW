import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Search from './pages/Search/index.jsx';
import Collection, {loader as colecaoLoader} from './pages/Collection/index.jsx';
import WishList, {loader as wishLoader} from './pages/WishList/index.jsx';
import GameFocus, { loader as gameLoader} from './pages/GameFocus/index.jsx';
import Similar, { loader as similarLoader } from './pages/Similar/index.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />,
  },
  {
    path: "/gameFocus/:id",
    element: <GameFocus />,
    loader:gameLoader,
  },
  {
    path: "/favorites",
    element: <Collection />,
    loader: colecaoLoader
  },
  {
    path: "/wishlist",
    element: <WishList />,
    loader: wishLoader
  },
  {
    path: "/semelhantes/:id",
    element: <Similar />,
    loader: similarLoader,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)