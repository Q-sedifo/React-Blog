import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DefaultWithPrev from '../../layouts/DefaultWithPrev';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import PostForm from '../../components/PostForm/PostForm';
import NET from '../../network';
import axios from 'axios';

const Edit = () => {
    const navigate = useNavigate()
    const { postId } = useParams() 
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${NET.APP_URL}/posts/${postId}`)
            .then(({data}) => {
                setPost(data)
                setLoading(false)
            })
            .catch(error => navigate(-1))

        document.title = 'Blog - редагування допису'
    }, [])

    return (
        <AuthMiddleware>
            <DefaultWithPrev>
                <div className='page page_top'>
                    <div className='page__content'>
                        <div className='block'>
                            <div className='block__content'>
                                <PostForm post={post} />
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultWithPrev>
        </AuthMiddleware>
    )
}

export default Edit;