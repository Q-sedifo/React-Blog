import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import { ImHome } from 'react-icons/im';
import { BsFillPersonFill } from 'react-icons/bs';
import { HiViewGridAdd } from 'react-icons/hi';
import { TbListDetails } from 'react-icons/tb';
import { IoMdListBox } from 'react-icons/io';

const NavMenu = () => {
    const { auth } = useAuth()

    return (
        <>
            <NavLink to='/'>
                <ImHome/>
                Головна
            </NavLink>
            <NavLink to='/posts'>
                <IoMdListBox/>
                Дописи
            </NavLink>
            {!auth && (<>
                <NavLink to='/login'>
                    <BsFillPersonFill/>
                    Вхід
                </NavLink>
            </>)}
            {auth && (<>
                <NavLink to='/add'>
                    <HiViewGridAdd/>
                    Додати
                </NavLink>
                <NavLink to='/posts/manage'>
                    <TbListDetails/>
                    Управління
                </NavLink>
            </>)}
        </>
    )
}

export default NavMenu;