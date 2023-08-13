import React, { useState, useMemo } from 'react';

export const ThemeContext = React.createContext()

const ThemeProvider = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(false)
    const app = document.documentElement

    React.useEffect(() => {
        const theme = localStorage.getItem('dark-theme')
       
        if (theme) {
            localStorage.setItem('dark-theme', true)
            app.setAttribute('data-theme', 'dark')
            setDarkTheme(true)
        }

    }, [])

    const toggleTheme = () => {
        setDarkTheme(!darkTheme)

        if (darkTheme) {
            localStorage.removeItem('dark-theme')
            app.removeAttribute('data-theme')
            return
        }

        localStorage.setItem('dark-theme', true)
        app.setAttribute('data-theme', 'dark')
    }

    const value = useMemo(() => ({ darkTheme, toggleTheme }), [darkTheme])

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;



