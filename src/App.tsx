// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import ScrollGrid from './components/ScrollGrid'
import './App.less'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="container">
      <ScrollGrid data={0} />
    </div>
  )
}

export default App
