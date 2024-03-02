import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from "./components/pages/HomePage";
import EventOpenPage from "./components/pages/EventOpenPage";
import EventDraftPage from "./components/pages/EventDraftPage";
import EventClosePage from "./components/pages/EventClosePage";
import AccountPage from "./components/pages/AccountPage";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/eventDraft" element={<EventDraftPage />} exact />
        <Route path="/eventOpen" element={<EventOpenPage />} exact />
        <Route path="/eventClose" element={<EventClosePage />} exact />
        a<Route path="/account" element={<AccountPage />} exact />
      </Routes>
    </BrowserRouter>
  );
};

export default App;