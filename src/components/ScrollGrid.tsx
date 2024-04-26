import React from 'react';
import { useState } from 'react';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import RectangularBox from './RectangularBox';
import ThreeComponent from './threejsComponent';
// import VoxelPainter from './threejsComponent/VoxelPainter';
import RichTextEditor from './richText/RichTextEditor_ReactQuill';
// import RichTextEditor_Quill from './richText/RichTextEditor_Quill';
import UserList from './UserList';
import ThreePointCloud from './threejsComponent/pointCloud/pC1.tsx';
import Echart3DDemo from './echart/index.tsx';
import TodoList from '../pages/TodoList.tsx';
// import WaterMark from '../pages/WaterMark.tsx';
import Login from '../pages/Login.tsx';
import { DatePicker } from 'antd';
import D3Test from './d3/D3Test.tsx';
import Immutable from './immutables/index.tsx';


const render = (rowIndex: number, columnIndex: number) => {
  const componentsMap: { [key: string]: JSX.Element } = {
      '0-0': <ThreePointCloud id={`three-${rowIndex}-${columnIndex}`} />,
      '1-0': <ThreeComponent id={`three-${rowIndex}-${columnIndex}`} />,
      '2-0': <Echart3DDemo />,
      '3-0': <TodoList />,
      '4-0': <UserList />,
      '5-0': <Login />,
      '6-0': <RichTextEditor />,
      '7-0': <DatePicker />,
      // '8-0': <WaterMark />,
      '9-0': <D3Test />,
      '10-0': <Immutable />,
  };

  const key = `${rowIndex}-${columnIndex}`;
  return componentsMap[key] || <RectangularBox rowIndex={rowIndex} columnIndex={columnIndex} />;
};

interface CellProps extends GridChildComponentProps {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
}

const Cell: React.FC<CellProps> = ({ columnIndex, rowIndex, style }) => {
    return (
      <div style={{
        ...style,
        overflow: 'auto',
        // padding: '10px',
      }} >
        {render(rowIndex, columnIndex)}
      </div>
    );
};

interface ScrollGridProps {
  columnCount?: number;
  columnWidth?: number;
  height?: number;
  rowCount?: number;
  rowHeight?: number;
  width?: number;
}


const ScrollGrid: React.FC<ScrollGridProps> = ({
  columnCount = 10,
  rowCount = 10,
  columnWidth = 400,
  rowHeight = 260,
  width = window.innerWidth - 46,
  height = window.innerHeight - 46,
  
}) => {
  const [viewportData, setViewportData] = useState({left: 0, top: 0, width: 0, height: 0});
  const [visibleCells, setVisibleCells] = useState({});
  // console.log(viewportData, '当前视口位置数据');
  // console.log(visibleCells, '当前可见的单元格的数据');
  return (
    <Grid
    columnCount={columnCount}
    rowCount={rowCount}
    columnWidth={columnWidth}
    rowHeight={rowHeight}
    width={width}
    height={height}
    style = {{
      top: '26px',
      left: '26px',
      width,
      height,
    }}
    onScroll={({ scrollLeft, scrollTop }) => {
      console.log(`scrollLeft: ${scrollLeft}, scrollTop: ${scrollTop}`);
      setViewportData({
        left: Math.floor((scrollLeft / columnWidth)*10) / 10,
        top: Math.floor((scrollTop / rowHeight)*10) / 10,
        width: Math.floor((width / columnWidth)*10) / 10,
        height: Math.floor((height / rowHeight)*10) / 10,
      });

      const startColIndex = Math.floor(scrollLeft / columnWidth);
      const endColIndex = Math.min(columnCount - 1, Math.ceil((scrollLeft + width) / columnWidth) - 1);
      const startRowIndex = Math.floor(scrollTop / rowHeight);
      const endRowIndex = Math.min(rowCount - 1, Math.ceil((scrollTop + height) / rowHeight) - 1);
      const visibleCells = []
      for (let col = startColIndex; col <= endColIndex; col++) {
        for (let row = startRowIndex; row <= endRowIndex; row++) {
          const cellLeft = col * columnWidth;
          const cellTop = row * rowHeight;
          const visibleWidth = Math.min(cellLeft + columnWidth, scrollLeft + width) - Math.max(cellLeft, scrollLeft);
          const visibleHeight = Math.min(cellTop + rowHeight, scrollTop + height) - Math.max(cellTop, scrollTop);
          const visibilityRatio = (visibleWidth * visibleHeight) / (columnWidth * rowHeight);
          const visibilityHeightRatio = visibleHeight / rowHeight;
          const visibilityWidthRatio = visibleWidth / columnWidth;
          visibleCells.push({
            col,
            row,
            visibilityRatio,
            heightRatio:visibilityHeightRatio,
            widthRatio: visibilityWidthRatio,
            position: {
              left: cellLeft - scrollLeft,
              top: cellTop - scrollTop,
            }
          });
        }
      }
      setVisibleCells(visibleCells);
      // console.log(visibleCells, '当前可见的单元格的数据');
      
    }}
  >
    {Cell}
  </Grid>
  )
};

export default ScrollGrid;