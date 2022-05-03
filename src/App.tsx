import React, { Fragment, useState } from 'react'

type EventHandle = {}

const App = (): JSX.Element => {
  let [counter, setCounter] = useState(0)
  const increaseByOne = () => setCounter((counter += 1))
  const setZero = () => setCounter(0)
  return (
    <div>
      <Display counter={counter} />
      <Button onclick={increaseByOne} text="plus" />
      <Button onclick={setZero} text="zero" />
    </div>
  )
}

const Display = ({ counter }: { counter: number }): JSX.Element => (
  <div>{counter}</div>
)

const Button = ({
  onclick,
  text,
}: {
  onclick: React.MouseEventHandler
  text: string
}): JSX.Element => {
  return <button onClick={onclick}>{text}</button>
}

export default App
