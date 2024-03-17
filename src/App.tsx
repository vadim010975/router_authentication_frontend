import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import StartPage from './pages/StartPage/StartPage';
import NewslinePage from './pages/NewslinePage/NewslinePage';
import NewsPage from './pages/NewsPage/NewsPage';
import Page404 from './pages/Page404/Page404';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: StartPage,
      },
      {
        path: "/news",
        Component: NewslinePage,
      },
      {
        path: "/news/:id",
        Component: NewsPage,
      },
      {
        path: "/page404",
        Component: Page404,
      },
    ],
  },
]);


export default function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>



  );
}
