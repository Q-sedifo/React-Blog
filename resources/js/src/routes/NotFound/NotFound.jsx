import React from 'react';
import DefaultWithPrev from '../../layouts/DefaultWithPrev';
import './NotFound.scss';
import svg from '../../icons/robot.svg';

const NotFound = () => {
    return (
        <DefaultWithPrev>
            <div className='not-found'>
                <h1>Сторінка не знайдена</h1>
                <img src={svg} />
            </div>
        </DefaultWithPrev>
    )
}

export default NotFound;