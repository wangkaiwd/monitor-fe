import { useEffect, useState } from 'react'

function App () {
  const [count, setCount] = useState(1)

  const onClick = () => {
    throw Error('error')
    setCount(count + 1)
  }
  useEffect(() => {
    throw Error('react error')
  }, [])
  useEffect(() => {
    setTimeout(() => {
      throw Error('error')
    })
  }, [])
  return <div onClick={onClick}>{count}</div>
}

export default App
