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
            width: columnWidth - padding * 4,
            height: rowHeight - padding * 4,
            border: '4px solid yellow',
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