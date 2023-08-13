import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NET from '../../network';
import useAuth from '../../hooks/useAuth';
import { CSSTransition } from 'react-transition-group';
import './LoginForm.scss';

const LoginForm = () => {
    const navigate = useNavigate()
    const { setAuth } = useAuth()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const loginHost = (e) => {
        e.preventDefault()

        setLoading(true)

        axios.post(NET.APP_URL + '/loginAuth', loginForm)
            .then(({data}) => {
                setAuth(data)
                setLoading(false)
                navigate(-1)
            })
            .catch(({response}) => {
                const error = response.data.message
                setLoading(false)
                setError(error)
            })
    }

    return (
        <form className='form login-form' onSubmit={(e) => loginHost(e)}>
            <div className='form__header'>
                Вхід {loading && <div className='loader'></div>}
            </div>
            <CSSTransition in={error ? true : false} timeout={200} classNames='appearance' unmountOnExit>
                <div className='form__error'>{error}</div>
            </CSSTransition>
            <div className='form__section'> 
                <input type='text' placeholder='Email' 
                    onInput={e => setLoginForm({ ...loginForm, email: e.target.value })}
                />
            </div>
            <div className='form__section'>
                <input type='password' placeholder='Пароль' 
                    onInput={e => setLoginForm({ ...loginForm, password: e.target.value })}
                />
            </div>
            <button type='submit'>Увійти</button>
        </form>
    )
}

export default LoginForm;