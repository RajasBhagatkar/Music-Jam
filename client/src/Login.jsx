import { useEffect } from 'preact/hooks'
import React from 'react'
import { Container } from 'react-bootstrap'
import axios from './API/axios'



export const Login = () => {

    return (
        <>
            <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: "100vh" }}>
                <div>
                    <a href={`${import.meta.env.VITE_BACKEND_URI}/login`} className='btn btn-success btn-lg'>Login With Spotify</a>
                </div>
            </Container>
        </>
    )
}
// https://developer.spotify.com/documentation/web-api/tutorials/code-flow