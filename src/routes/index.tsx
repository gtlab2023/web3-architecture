import PageNotFoundView from "@components/common/PageNotFoundView"
import MainLayout from '@layouts/MainLayout';
import DappTest from '@pages/DappTest';
import Home from '@pages/Home';
import { RouteObject } from 'react-router-dom';

const Routes: RouteObject[] = [];

const mainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    { path: '*', element: <PageNotFoundView /> },
    { path: '/dapp', element: <DappTest /> },
    { path: '/', element: <Home /> },
    { path: '404', element: <PageNotFoundView /> },
  ],
};
Routes.push(mainRoutes);

export default Routes;
