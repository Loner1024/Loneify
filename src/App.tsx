import React, { useState } from 'react'

const App = (): JSX.Element => {
  let [Str, setStr] = useState('Loner')
  setTimeout(() => setStr((): string => (Str += 'Loner')), 1000)
  return <div>{Str}</div>
}

export default App
