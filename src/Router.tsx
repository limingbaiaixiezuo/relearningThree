import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import VoxelPainter from './routes/Gridpainter';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/gridPainter" element={<VoxelPainter />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;