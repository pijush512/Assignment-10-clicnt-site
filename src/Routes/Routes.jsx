import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Home from '../Pages/Home/Home';
import AllBooks from '../Pages/AllBooks/AllBooks';
import AddBooks from '../Pages/AddBooks/AddBooks';
import MyBooks from '../Pages/MyBooks/MyBooks';
import Login from '../Components/Login/Login';
import Register from '../Components/Register/Register';




export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        path: '/',
        Component: Home,
      },
      {
        path: '/allBooks',
        Component: AllBooks,
      },
      {
        path: '/addBooks',
        Component: AddBooks,
      },
      {
        path: '/myBooks',
        Component: MyBooks,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      },



    ]
  }
]);

