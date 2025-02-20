import {memo } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/common/header'
const MainLayout = () => {
  return (
    <>
    <Header />
    <main>
      <Outlet/ >
    </main>
    </>
   
  )
}

export default memo(MainLayout);