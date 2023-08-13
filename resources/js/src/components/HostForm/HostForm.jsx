import React, { useState, useRef } from 'react';
import NET from '../../network';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import './HostForm.scss';

const HostForm = ({ host }) => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [errors, setErrors] = useState([])
    const [selectedAvatar, setSelectedAvatar] = useState(null)
    const [selectedBackground, setSelectedBackground] = useState(null)
    const [hostData, setHostData] = useState({
        first_name: useRef(),
        last_name: useRef(),
        nickname: useRef(),
        email: useRef(),
        description: useRef(),
        avatar: null,
        background: null
    })

    const handleForm = (e) => {
        e.preventDefault()

        setLoading(true)

        const formData = new FormData()
        formData.append('first_name', hostData.first_name.current.value)
        formData.append('last_name', hostData.last_name.current.value)
        formData.append('nickname', hostData.nickname.current.value)
        formData.append('email', hostData.email.current.value)
        formData.append('description', hostData.description.current.value)
        // If host image loaded then upload with request
        hostData.avatar && formData.append('avatar', hostData.avatar)
        hostData.background && formData.append('background', hostData.background)

        // Put method
        formData.append('_method', 'PUT');

        axios.post(`${NET.APP_URL}/host`, formData)
            .then(response => {
                setSuccess('Дані успішно оновлені')
                setTimeout(() => setSuccess(null), 5000)
            })
            .catch(({response}) => {
                const errors = response.data.errors
                setErrors(errors)
            })
            .finally(() => setLoading(false))
    }

    const avatarReader = new FileReader()
    const backgroundReader = new FileReader()
    avatarReader.onloadend = () => {
        setSelectedAvatar(avatarReader.result)
    }
    backgroundReader.onloadend = () => {
        setSelectedBackground(backgroundReader.result)
    }

    const selectAvatar = (e) => {
        const file = e.target.files[0]
        avatarReader.readAsDataURL(file)
        setHostData({ ...hostData, avatar: file })
    } 

    const selectBackground = (e) => {
        const file = e.target.files[0]
        backgroundReader.readAsDataURL(file)
        setHostData({ ...hostData, background: file })
    } 

    return (
        <form className='form host-form'>
            {success && <div>{success}</div>}
            <div className='form__header'>
                Профіль
                {loading && <div className='loader'></div>}
            </div>
            <div className='form__section_row'>
                <label htmlFor='avatar' className='host-form__image-field' style={{ backgroundImage: `url(/public/uploads/host/${host.avatar})`}}>
                    <div className='box-icon'><FaCloudUploadAlt/></div>
                    Аватар
                </label>
                <div className='host-form__avatar' style={{ backgroundImage: `url(${selectedAvatar})`}}></div>
                <input type='file' id='avatar' onChange={ e => selectAvatar(e) } />
            </div>
            <CSSTransition in={errors.background ? true : false} timeout={200} classNames='appearance' unmountOnExit>
                <div className='form__error'>{errors.background}</div>
            </CSSTransition>
            <div className='form__section_row'>
                <label htmlFor='background' className='host-form__image-field' style={{ backgroundImage: `url(/public/uploads/host/${host.background})`}}>
                    <div className='box-icon'><FaCloudUploadAlt/></div>
                    Фон
                </label>
                <div className='host-form__background' style={{ backgroundImage: `url(${selectedBackground})`}}></div>
                <input type='file' id='background' onChange={ e => selectBackground(e) } />
            </div>
            <CSSTransition in={errors.first_name ? true : false} timeout={200} classNames='appearance' unmountOnExit>
                <div className='form__error'>{errors.first_name}</div>
            </CSSTransition>
            <CSSTransition in={errors.last_name ? true : false} timeout={200} classNames='appearance' unmountOnExit>
                <div className='form__error'>{errors.last_name}</div>
            </CSSTransition>
            <div className='form__section_row'>
                <input type='text' placeholder="Ім'я" defaultValue={host.first_name} ref={hostData.first_name} />
                <input type='text' placeholder='Прізвище' defaultValue={host.last_name} ref={hostData.last_name} />
            </div>
            <CSSTransition in={errors.nickname ? true : false} timeout={200} classNames='appearance' unmountOnExit>
                <div className='form__error'>{errors.nickname}</div>
            </CSSTransition>
            <CSSTransition in={errors.email ? true : false} timeout={200} classNames='appearance' unmountOnExit>
                <div className='form__error'>{errors.email}</div>
            </CSSTransition>
            <div className='form__section_row'>
                <input type='text' placeholder='Нікнейм' defaultValue={host.nickname} ref={hostData.nickname} />
                <input type='text' placeholder='Email' defaultValue={host.email} ref={hostData.email} />
            </div>
            <CSSTransition in={errors.description ? true : false} timeout={200} classNames='appearance' unmountOnExit>
                <div className='form__error'>{errors.description}</div>
            </CSSTransition>
            <div className='form__section_row'>
                <textarea placeholder='Опис' defaultValue={host.description} ref={hostData.description}></textarea>
            </div>
            <button type='button' onClick={ e => handleForm(e) }>Зберегти</button>
        </form>
    )
}

export default HostForm;