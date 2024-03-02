import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProductPage from "./components/pages/ProductPage";
import HomePage from "./components/pages/HomePage";
import EventDetailPage from "./components/pages/EventDetail";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/products" element={<ProductPage />} exact />
        <Route path="/eventDetailPage" element={<EventDetailPage />} exact />
      </Routes>
    </BrowserRouter>
  );
};

export default App;