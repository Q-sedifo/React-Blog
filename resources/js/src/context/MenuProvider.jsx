import React, { useState, useMemo } from 'react';

export const MenuContext = React.createContext()

const MenuProvider = ({ children }) => {
    const [menuActive, setMenuActive] = useState(false)

    const toggleMenu = () => {
        document.body.classList.toggle('scroll-off')
        setMenuActive(!menuActive)
    }

    const value = useMemo(() => ({ menuActive, toggleMenu }), [menuActive])

    return (
        <MenuContext.Provider value={value}>
            {children}
        </MenuContext.Provider>
    )
}

export default MenuProvider;



