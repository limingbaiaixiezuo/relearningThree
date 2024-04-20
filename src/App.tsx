// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useGrid } from './config/grid';
import ScrollGrid from './components/ScrollGrid'
import './App.less'

function App() {
  // const [count, setCount] = useState(0)
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
}

export default App
