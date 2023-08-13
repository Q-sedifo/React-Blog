import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AuthMiddleware = ({ children }) => {
    const { auth } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth) navigate('/')
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default AuthMiddleware;