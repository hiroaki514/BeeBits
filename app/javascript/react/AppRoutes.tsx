import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Top } from './pages/Top';
import { NotFound } from './pages/NotFound';

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
};
