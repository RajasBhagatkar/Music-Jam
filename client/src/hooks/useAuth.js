import { useEffect, useState } from 'preact/hooks'
import React from 'react'
import axios from '../API/axios';
import { route } from 'preact-router';

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [expiresIn, setExpiresIn] = useState("");

    useEffect(() => {
        axios.post('/login', {
            code
        }).then(res => {
            localStorage.setItem("refreshToken", res.data.refreshToken)
            setRefreshToken(res.data.refreshToken)
            setAccessToken(res.data.accessToken)
            setExpiresIn(res.data.expiresIn)
            window.history.pushState({}, null, '/')

        }).catch(err => {
            console.log("if error occured");
            window.location = '/'
        })
    }, [code])


    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const timeOut = setInterval(() => {
            console.log("hi");


            axios.post('/refresh', {
                refreshToken
            }).then((res) => {
                setAccessToken(res.data.accessToken)
                setExpiresIn(res.data.expiresIn)

            }).catch(err => {
                console.log("client error on refresh");

            })
        }, (expiresIn - 60) * 1000);

        return () => clearInterval(timeOut);

    }, [refreshToken, expiresIn])



    return accessToken;

}
