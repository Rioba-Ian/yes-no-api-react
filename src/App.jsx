import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchData() {
    fetch('https://yesno.wtf/api')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`You've gotten an HTTP error: ${res.status}`)
        }
        return res.json()
      })
      .then((actualData) => {
        setData(actualData)
        setError(null)
        console.log(actualData)
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }


  useEffect(() => {
    fetchData()
  }, [])

  function handleChange() {
    setLoading(true)
    fetchData()
  }

  return (
    <div className="">
      <h1>What's it gonna be?</h1>
      {loading && <div>A moment please ...</div>}
      {error && (
        <div className="">
          {`There seems to be a problem with fetching the data -${error}`}
        </div>
      )}

      <div className="">
        {data && <h2>{data.answer}</h2>}
        {data && <img src={data.image} alt="" />}
      </div>

      <div className="">
        <button className='refresh-page' onClick={handleChange}>Refresh</button>
      </div>
    </div>
  )
}

export default App;