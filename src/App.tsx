import React, { useState } from 'react'

const App = (): JSX.Element => {
  const [Counter, setCounter] = useState(0)
  setTimeout(() => setCounter(Counter + 1), 1000)
  return <div>{Counter}</div>
}

export default App
