import React, { useState, useEffect } from 'react';
import DefaultWithPrev from '../../layouts/DefaultWithPrev';
import PostDefault from '../../components/Post/PostDefault/PostDefault';
import axios from 'axios';
import NET from '../../network';
import './posts.scss';

const Posts = () => {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        getAllPosts().then(({data}) => {
            setPosts(data)
        })

        document.title = 'Blog - всі дописи'
    }, [])

    const getAllPosts = () => {
        return axios.get(`${NET.APP_URL}/posts`)
    }

    return (
        <DefaultWithPrev>
            <div className='page page_top'>
                <div className='page__content'>
                    <div className='block'>
                        <div className='block__header'>
                            Усі дописи {posts && posts.length}
                            {!posts && <div className='loader'></div>}
                        </div>
                        <div className='block__content'>
                            <div className='posts'>
                                {posts && posts.map(post => (
                                    <PostDefault key={post.id} post={post}/>
                                ))}
                                {posts && !posts.length && <div className='block__message'>Немає дописів</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultWithPrev>
    )
}

export default Posts;