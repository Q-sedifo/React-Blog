import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NET from '../../network';
import axios from 'axios';
import { AiOutlineFieldTime } from 'react-icons/ai';
import './LastPosts.scss';
import PostDefault from '../Post/PostDefault/PostDefault';

const LastPosts = () => {
    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(NET.APP_URL + '/posts/last')
            .then(({data}) => {
                setPosts(data)
                setLoading(false)
            })
    }, [])

    return (
        <div className='block'>
            <div className='block__header'>
                Останні дописи
                {loading && <div className='loader'></div>}
            </div>
            <div className='block__content'>
                {posts && (
                    <div className='last-posts'>
                        {posts.map(post => (
                            <PostDefault key={post.id} post={post} />
                        ))}
                    </div>
                )}
                {posts && !posts.length && (
                    <div className='block__message'>Немає дописів :(</div>
                )}
            </div>
        </div>
    )
}

export default LastPosts;