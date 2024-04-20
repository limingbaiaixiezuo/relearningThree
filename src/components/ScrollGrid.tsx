import React from 'react';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';

interface CellProps extends GridChildComponentProps {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
}

const Cell: React.FC<CellProps> = ({ columnIndex, rowIndex, style }) => (
  <div style={style}>
    Item {rowIndex},{columnIndex}
  </div>
);

interface ScrollGridProps {
    columnCount?: number;
    columnWidth?: number;
    height?: number;
    rowCount?: number;
    rowHeight?: number;
    width?: number;
    data: number;
}

const ScrollGrid: React.FC<ScrollGridProps> = ({
    columnCount = 1000,
    columnWidth = 100,
    height = window.innerHeight,
    rowCount = 1000,
    rowHeight = 35,
    width = window.innerWidth,
    data=1000*100
  }) => (
    <Grid
      columnCount={columnCount}
      columnWidth={columnWidth}
      height={height}
      rowCount={rowCount}
      rowHeight={rowHeight}
      width={width}
    >
      {({ columnIndex, rowIndex, style }) => (
        <Cell data={data} columnIndex={columnIndex} rowIndex={rowIndex} style={style} />
      )}
    </Grid>
  );

export default ScrollGrid;