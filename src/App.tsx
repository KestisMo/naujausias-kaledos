import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home/Home';


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/404" element={<ErrorPage />} />
    </Routes>
  </Router>
);

export default App;
