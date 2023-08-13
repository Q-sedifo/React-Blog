import React, { useContext } from 'react';
import { MenuContext } from '../context/MenuProvider';

const useMenu = () => {
    const value = useContext(MenuContext)

    return value
}

export default useMenu;