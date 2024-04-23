import React from 'react';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import RectangularBox from './RectangularBox';
import ThreeComponent from './threejsComponent';
import RichTextEditor from './richText/RichTextEditor_ReactQuill';
// import RichTextEditor_Quill from './richText/RichTextEditor_Quill';
import UserList from './UserList';
import ThreePointCloud from './threejsComponent/pointCloud/pC1.tsx';


const render = (rowIndex: number, columnIndex: number) => {
    if (rowIndex === 1 && columnIndex === 0) {
        return <ThreeComponent id={`three-${rowIndex}-${columnIndex}`}/>;
    }
    if (rowIndex === 0 && columnIndex === 1) {
        return <RichTextEditor />;
    }
    if (rowIndex === 0 && columnIndex === 0) {
        // return <RichTextEditor_Quill />;
        return <ThreePointCloud id={`three-${rowIndex}-${columnIndex}`}/>;
    }

    if (rowIndex === 1 && columnIndex === 1) {
        return <UserList />;
    }
    
    return <RectangularBox rowIndex={rowIndex} columnIndex={columnIndex} />;
};

interface CellProps extends GridChildComponentProps {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
}

const Cell: React.FC<CellProps> = ({ columnIndex, rowIndex, style }) => {

    return (
      <div style={style} >
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
  width = window.innerWidth - 20,
  height = window.innerHeight - 20,
}) => (
  <Grid
    columnCount={columnCount}
    rowCount={rowCount}
    columnWidth={columnWidth}
    rowHeight={rowHeight}
    width={width}
    height={height}
  >
    {Cell}
  </Grid>
);

export default ScrollGrid;