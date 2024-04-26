// src/routes/About.tsx
import React from 'react';
//@ts-ignore
import VoxelPainter from '../components/threejsComponent/VoxelPainter';

const GridPainter: React.FC = () => {
  return <VoxelPainter width={400} height={260} />;
};

export default GridPainter;