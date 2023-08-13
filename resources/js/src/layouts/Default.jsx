import React from 'react';
import Header from '../components/Header/Header';
import Menu from '../components/Menu/Menu';

const Default = ({ children }) => {
    return (
        <>
            <Header />
            <Menu />
            <div className='container'>
                {children}
            </div>
        </>
    )
}

export default Default;