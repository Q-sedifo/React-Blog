import React, { useState, useEffect } from 'react';
import DefaultWithPrev from '../../layouts/DefaultWithPrev';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import PostForm from '../../components/PostForm/PostForm';

const Add = () => {

    useEffect(() => {
        document.title = 'Blog - додавання допису'
    }, [])

    return (
        <AuthMiddleware>
            <DefaultWithPrev>
                <div className='page page_top'>
                    <div className='page__content'>
                        <div className='block'>
                            <PostForm />
                        </div>
                    </div>
                </div>
            </DefaultWithPrev>
        </AuthMiddleware>
    )
}

export default Add;