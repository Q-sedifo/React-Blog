import React, { useState, useEffect, useMemo } from 'react';
import NET from '../network';
import axios from 'axios';

export const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)
    // const authStorage = 'host'

    useEffect(() => {
        // Checking for authorization
        axios.get(NET.APP_URL + '/checkAuth')
            .then(({data}) => {
                setAuth(data)
            })
            .catch(({response}) => {
                const error = response.data.message
                console.log(error)
                // throw new Error(error);
            })
    }, [])

    const value = useMemo(() => ({ auth, setAuth }), [auth])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;