import React from 'react';
import Header from '../components/Header/Header';
import Menu from '../components/Menu/Menu';

const DefaultWithPrev = ({ children }) => {
    return (
        <>
            <Header prev={true} anim={true} />
            <Menu />
            <div className='container'>
                {children}
            </div>
        </>
    )
}

export default DefaultWithPrev;