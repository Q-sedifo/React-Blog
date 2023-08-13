import React from 'react';
import cn from 'classnames';
import useMenu from '../../hooks/useMenu';
import NavMenu from '../NavMenu/NavMenu';
import './Menu.scss';

const Menu = () => {
    const { menuActive, toggleMenu } = useMenu()

    return (
        <div className={cn('mobile-menu', {
            'mobile-menu_active': menuActive
        })}>
            <div className='mobile-menu__widget'></div>
            <div className='mobile-menu__nav-menu' onClick={toggleMenu}>
                <NavMenu/>
            </div>
        </div>
    )
}

export default Menu;