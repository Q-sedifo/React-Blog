import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NET from '../../network';
import { CSSTransition } from 'react-transition-group';
import { AiOutlineSend } from 'react-icons/ai';
import { GrClear } from 'react-icons/gr'; 
import userSvg from '../../icons/user.svg';
import './PostComments.scss';

const PostComments = ({ postId }) => {
    const [comments, setComments] = useState(null)
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState([])
    const [commentData, setCommentData] = useState({
        name: '',
        content: ''
    })

    useEffect(() => {
        getPostComments()
    }, [])

    const getPostComments = () => {
        axios.get(`${NET.APP_URL}/comments/${postId}`).then(({data}) => {
            setComments(data)
            setLoading(false)
        })
    }

    const clearForm = () => {
        setCommentData({
            name: '',
            content: ''
        })

        document.querySelector('textarea').style.height = 'auto'
    }

    const addComment = () => {
        setLoading(true)

        axios.post(`${NET.APP_URL}/posts/${postId}/comments`, commentData).then(response => {
            clearForm()
            getPostComments()
        })
        .catch(({response}) => {
            const errors = response.data.errors
            setErrors(errors) 

            setTimeout(() => setErrors([]), 5000)
        })
        .finally(() => setLoading(false))
    }

    const contentProcessor = (e) => {
        const textarea = e.target
        setCommentData({ ...commentData, content: textarea.value })

        textarea.style.height = 'auto'
        textarea.style.height = `${e.target.scrollHeight}px`
    }

    return (
        <div className='block'>
            <div className='block__header'>
                Коментарі {comments && comments.length}
                {loading && <div className='loader'></div>}
            </div>
            <div className='block__content post-comments'>
                <div className='comment-form'>
                    <CSSTransition in={errors.name ? true : false} timeout={200} classNames='appearance' unmountOnExit>
                        <div className='form__error'>{errors.name}</div>
                    </CSSTransition>
                    <input type='text' placeholder="Ім'я..." className='comment-form__name' 
                        onChange={ e => setCommentData({ ...commentData, name: e.target.value }) }
                        value={commentData.name} 
                    />
                    <CSSTransition in={errors.content ? true : false} timeout={200} classNames='appearance' unmountOnExit>
                        <div className='form__error'>{errors.content}</div>
                    </CSSTransition>
                    <textarea placeholder='Коментар...' className='comment-form__content'
                        value={commentData.content}
                        onChange={ e => contentProcessor(e) }
                    >
                    </textarea>
                    <div className='comment-form__actions'>
                        <button type='button' onClick={addComment}><div className='box-icon'><AiOutlineSend/></div></button>
                        {commentData.name && commentData.content && (
                            <button type='button' onClick={clearForm}><div className='box-icon'><GrClear/></div></button>
                        )}
                    </div>
                </div>
                <div className='post-comments__list'>
                    {comments && comments.map(comment => (
                        <div className='post-comments__item post-comment' key={comment.id}>
                            <div className='post-comment__header'>
                                <div className='post-comment__avatar'><img src={userSvg}/></div>
                                <div className='post-comment__name'>{comment.name}</div>
                            </div>
                            <div className='post-comment__info'>{comment.created_at}</div>
                            <div className='post-comment__content'>{comment.content}</div>
                        </div>
                    ))}
                </div>
                {comments && !comments.length && <div className='block__message'>Поки немає коментарів</div>}
            </div>
        </div>
    )
}

export default PostComments;