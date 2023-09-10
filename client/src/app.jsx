import { useState } from 'preact/hooks'
import './app.css'
import { Login } from './Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import Router from 'preact-router'
import Dashboard from './pages/Dashboard'
import LocalSongs from './pages/LocalSongs'

// if code present then successfull
// else error is present then unsuccessfull
// const code = 

export function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      {/* <Login path="/" /> */}
      <Dashboard path="/" />
      <LocalSongs path="/play-local" />
    </Router>
  )
}
