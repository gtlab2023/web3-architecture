import PageNotFoundView from '@components/common/PageNotFoundView';
import MainLayout from '@layouts/MainLayout';
import DappTest from '@pages/DappTest';
import Home from '@pages/Home';
import Loading from '@components/common/Loading';
import { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const Test = lazy(() => import('@/components/common/Test'));
const Routes: RouteObject[] = [];
// 其他路由使用 lazy(()=>import()) 避免主文件太大
const Layout = () => (
  <Suspense fallback={<Loading />}>
    <MainLayout />
  </Suspense>
);
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
const DemoRoutes = {
  path: 'yideng',
  element: <Layout />,
  children: [{ path: 'test', element: <Test /> }],
};
Routes.push(mainRoutes, DemoRoutes);

export default Routes;
