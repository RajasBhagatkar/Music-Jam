import React from 'react'
import Home from './Home'
import { Login } from '../Login'

const code = new URLSearchParams(window.location.search).get('code')
const error = new URLSearchParams(window.location.search).get('error')
// access_denied

const Dashboard = () => {
    console.log(error)
    return (
        <>
            {/* either way only single is going to be true */}
            {code ? <Home code={code} /> : error ? <h1 className='d-flex justify-content-center align-items-center' style={{ minHeight: "100vh" }}>{error}</h1> : <Login />}
        </>

    )
}

export default Dashboard