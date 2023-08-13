import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import useMenu from '../../hooks/useMenu';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiMoonLine, RiMoonFill } from 'react-icons/ri';
import { HiSearch } from 'react-icons/hi';
import { RxExit } from 'react-icons/rx';
import { ImArrowLeft2 } from 'react-icons/im';
import NavMenu from '../NavMenu/NavMenu';
import cn from 'classnames';
import axios from 'axios';
import NET from '../../network';
import './Header.scss';

const Header = (props) => {
    const [headerActive, setHeaderActive] = useState(false)
    const navigate = useNavigate()
    const { auth, setAuth } = useAuth()
    const { darkTheme, toggleTheme } = useTheme()
    const { toggleMenu } = useMenu()

    const exit = () => {
        axios.get(NET.APP_URL + '/logout').then(response => {
            setAuth(null)
            navigate('/')
        })
    }

    document.onscroll = () => {
        if (window.pageYOffset > 1) {
            setHeaderActive(true)
            return
        }

        setHeaderActive(false)
    }

    return (
        <header className={cn('header', {
            header_active: headerActive || props.anim
        })}>
            <div className='container header__container'>
                <div className='header__section'>
                    {props.prev && (
                        <div className='box-icon' onClick={() => navigate(-1)}>
                            <ImArrowLeft2/>
                        </div>
                    )}
                    {auth && (<>
                        <Link to='/profile'><div className='header__avatar' style={{ backgroundImage: `url(/public/uploads/host/${auth.avatar})` }}></div></Link>
                        {auth.nickname}
                    </>)}
                </div>
                <div className='header__section'>
                    <div className='header__nav-menu'>
                        <NavMenu/>
                    </div>
                </div>
                <div className='header__section'>
                    {auth && (
                        <div className='box-icon' onClick={exit}>
                            <RxExit/>
                        </div>
                    )}
                    <div className='box-icon'>
                        <Link to='/search'>
                            <HiSearch/>
                        </Link>
                    </div>
                    <div className='box-icon' onClick={toggleTheme}>
                        {darkTheme ? <RiMoonLine/> : <RiMoonFill/>}
                    </div>
                    <div className='box-icon menu-btn' onClick={toggleMenu}>
                        <GiHamburgerMenu/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;