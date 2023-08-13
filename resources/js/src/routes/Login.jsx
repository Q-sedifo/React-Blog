import React, { useEffect } from 'react';
import DefaultWithPrev from '../layouts/DefaultWithPrev';
import GuestMiddleware from '../middlewares/GuestMiddleware';
import LoginForm from '../components/LoginForm/LoginForm';

const Login = () => {
    useEffect(() => {
        document.title = 'Blog - вхід'
    }, [])

    return (
        <GuestMiddleware>
            <DefaultWithPrev>
                <div className='page page_top'>
                    <div className='page__content'>
                        <div className='block'>
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </DefaultWithPrev>
        </GuestMiddleware>
    )
}

export default Login;