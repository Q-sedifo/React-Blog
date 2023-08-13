import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NET from '../../network';
import axios from 'axios';
import { IoMdPerson } from 'react-icons/io';
import './LastComments.scss';

const LastComments = () => {
    const [comments, setComments] = useState(null)

    useEffect(() => {
        getLastComments().then(({data}) => {
            setComments(data)
        })
    }, [])

    const getLastComments = () => {
        return axios.get(`${NET.APP_URL}/comments/last`)
    }

    return (
        <div className='block'>
            <div className='block__header'>
                Останні коментарі
                {!comments && <div className='loader'></div>}
            </div>
            <div className='block__content last-comments'>
                {comments && comments.map(comment => (
                    <Link to={`posts/${comment.post.id}`} className='last-comments__item' key={comment.id}>
                        <div className='last-comments__content'>
                            <div className='last-comments__name'>
                                <div className='box-icon'><IoMdPerson/></div>
                                {comment.name}
                            </div>
                            <div className='last-comments__text'>{comment.content}</div>
                        </div>
                        <div className='last-comments__preview' 
                            style={{ backgroundImage: `url(/public/uploads/posts/prev_${comment.post.image})` }}
                        ></div>
                    </Link>
                ))}
                {comments && !comments.length && <div className='block__message'>Немає коментарів</div>}
            </div>
        </div>
    )
}

export default LastComments;