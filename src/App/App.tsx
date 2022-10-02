import React, { createContext } from 'react';

import Header from '@components/Header';
import Homepage from '@pages/HomePage';
import ProductPage from '@pages/ProductPage';
import SingleProductPage from '@pages/SingleProductPage';
import { Navigate, Route, Routes } from 'react-router-dom';

import MainStore from './../store/MainStore';
import { useQueryParamsStoreInit } from './../store/RootStore/hooks/useQueryParamsStoreInit';

export const StoreContext = createContext<MainStore>(new MainStore());

export const StoreProvider = StoreContext.Provider;

const App: React.FC = () => {
  useQueryParamsStoreInit();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product-list" element={<ProductPage />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
