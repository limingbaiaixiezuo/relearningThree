import { useState, useEffect } from 'react';

export function useGrid() {
  const [grid, setGrid] = useState({
    columnCount: 100,
    rowCount: 100,
    columnWidth: 800,
    rowHeight: 560,
    padding: 10,
    width: window.innerWidth - 10 -10,
    height: window.innerHeight - 10 - 10,
  });

  useEffect(() => {
    const handleResize = () => {
      setGrid(prevGrid => ({
        ...prevGrid,
        width: Number(window.innerWidth) - prevGrid.padding * 2,
        height: Number(window.innerHeight) - prevGrid.padding * 2,
      }));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return grid;
}

// import { useRef, useEffect } from 'react';

// export function useGrid() {
//   const gridRef = useRef({
//     columnCount: 100,
//     rowCount: 100,
//     columnWidth: 400,
//     rowHeight: 260,
//     padding: 10,
//     width: window.innerWidth - 10 - 10,
//     height: window.innerHeight - 10 - 10,
//   });

//   useEffect(() => {
//     const handleResize = () => {
//       gridRef.current.width = window.innerWidth - gridRef.current.padding * 2;
//       gridRef.current.height = window.innerHeight - gridRef.current.padding * 2;
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return gridRef.current;
// }