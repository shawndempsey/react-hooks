// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

const useLocalStorageState = (key, initialValue) => {
  const [value, setValue] = React.useState(() => {
    const initial = window.localStorage.getItem(key) || initialValue
    if (typeof initial === 'object') {
      return JSON.parse(initial)
    }
    return initial
  })

  React.useEffect(() => {
    if (typeof value === 'object') {
      window.localStorage.setItem(key, JSON.stringify(value))
    } else {
      window.localStorage.setItem(key, value)
    }
  }, [value])

  return [value, setValue]
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName
  const [value, setValue] = useLocalStorageState('value', initialName)

  function handleChange(event) {
    setValue(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={value} onChange={handleChange} id="name" />
      </form>
      {value ? <strong>Hello {value}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
