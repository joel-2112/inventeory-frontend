import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p className='text-red-300'>this is a red paragraph</p>
      this is the app
    </div>
  )
}

export default App
