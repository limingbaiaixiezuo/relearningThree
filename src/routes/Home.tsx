import React from 'react';
import { useGrid } from '../config/grid';
import ScrollGrid from '../components/ScrollGrid'


const Home: React.FC = () => {
  const {
    columnCount,
    rowCount,
    columnWidth,
    rowHeight,
    width,
    height,
  } = useGrid();
  return (
    <div className="container">
          <ScrollGrid 
            columnCount={columnCount} 
            rowCount={rowCount} 
            columnWidth={columnWidth}
            rowHeight={rowHeight}
            width={width}
            height={height}
          />
        </div>
  )
};

export default Home;