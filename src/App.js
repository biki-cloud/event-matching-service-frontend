// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import EventManage from './components/EventerManage'; 
import EventDetail from './components/EventDetail'; 
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import VendorManage from './components/VendorManage'; 
import EventRegister from './components/EventRegister';
import EventerSettings from './components/EventerSettings';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/event/register" element={<EventRegister />} />
          <Route path="/eventer/manage" element={<EventManage />} index />
          <Route path="/eventer/settings" element={<EventerSettings />} index />
          <Route path="/vendor/manage" element={<VendorManage />} /> // Add this line
        </Routes>
      </div>
    </Router>
  );
}

export default App;
