import React from 'react';
import { useGrid } from '../config/grid';

interface RectangularBoxProps {
    rowIndex: number;
    columnIndex: number;
}

const RectangularBox: React.FC<RectangularBoxProps> = ({ rowIndex, columnIndex }) => {
    const { columnWidth, rowHeight, padding } = useGrid();

    return (
        <div style={{
            width: columnWidth,
            height: rowHeight,
            border: '2px solid lightgrey',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding,
            backgroundColor: 'lightblue',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '24px'
        }}>
            {`Row ${rowIndex}, Column ${columnIndex}`}
        </div>
    );
};

export default RectangularBox;