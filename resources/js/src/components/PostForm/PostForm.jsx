import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import NET from '../../network';
import axios from 'axios';
import './PostForm.scss';
import { FaCloudUploadAlt } from 'react-icons/fa';

const PostForm = (props) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [selectedImage, setSelectedImage] = useState(null)
    const [postData, setPostData] = useState({
        title: useRef(),
        description: useRef(),
        image: null
    })
    
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
        setSelectedImage(fileReader.result)
    }

    const selectImage = (e) => {
        const file = e.target.files[0]

        fileReader.readAsDataURL(file)
        setPostData({ ...postData, image: file })
    }

    const handleForm = (e) => {
        e.preventDefault()

        setLoading(true)
 
        const formData = new FormData()
        formData.append('title', postData.title.current.value)
        formData.append('description', postData.description.current.value)
        // If post image loaded then upload with request
        postData.image && formData.append('image', postData.image)

        if (props.post) {
            formData.append('_method', 'PUT');
            
            axios.post(`${NET.APP_URL}/posts/${props.post.id}`, formData)
                .then((response) => {
                    navigate('/posts/manage')
                })
                .catch(({response}) => {
                    const errors = response.data.errors
                    setErrors(errors)
                })
                .finally(() => setLoading(false))
            return
        }

        axios.post(NET.APP_URL + '/posts', formData)
            .then(response => {
                // navigate('/posts/manage')
                console.log(response)
            })
            .catch(({response}) => {
                const errors = response.data.errors
                setErrors(errors)
            })
            .finally(() => setLoading(false))
    }
    
    return (
        <form className='form post-form' onSubmit={(e) => handleForm(e)}>
            <div className='form__header'>
                {props.post ? 'Редагування' : 'Додавання'} допису 
                {loading && <div className='loader'></div>}
            </div>
            <CSSTransition in={errors.image ? true : false} timeout={200} classNames='appearance' unmountOnExit>
                <div className='form__error'>{errors.image}</div>
            </CSSTransition>
            <div className='form__section'>
                <div className='post-form__preview-section'>
                    <label className='post-form__preview' htmlFor='preview' 
                        style={props.post && { backgroundImage: `url(/public/uploads/posts/prev_${props.post.image})` }}
                    >
                        <div className='box-icon'><FaCloudUploadAlt/></div>
                    </label>
                    {selectedImage && (
                        <label className='post-form__preview'
                            style={{ backgroundImage: `url(${selectedImage})`}}
                        >
                        </label>
                    )}
                    <input id='preview' type='file' accept='image/*,.jpeg,.jpg,.png,.gif' onChange={(e) => selectImage(e)} />
                </div>
            </div>
            <CSSTransition in={errors.title ? true : false} timeout={200} classNames='appearance' unmountOnExit>
                <div className='form__error'>{errors.title}</div>
            </CSSTransition>
            <div className='form__section'> 
                <input type='text' placeholder='Заголовок' defaultValue={props.post && props.post.title} ref={postData.title} />
            </div>
            <CSSTransition in={errors.description ? true : false} timeout={200} classNames='appearance' unmountOnExit>
                <div className='form__error'>{errors.description}</div>
            </CSSTransition>
            <div className='form__section'>
                <textarea type='text' placeholder='Опис' defaultValue={props.post && props.post.description} ref={postData.description}></textarea>
            </div>
            <button type='submit'>{props.post ? 'Змінити' : 'Додати'}</button>
        </form>
    )
}

export default PostForm;