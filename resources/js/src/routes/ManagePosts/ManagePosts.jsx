import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DefaultWithPrev from '../../layouts/DefaultWithPrev';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import NET from '../../network';
import axios from 'axios';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { MdEdit, MdClose } from 'react-icons/md';
import { HiSearch } from 'react-icons/hi';
import { BiLinkExternal } from 'react-icons/bi';
import { GoComment } from 'react-icons/go';
import './ManagePosts.scss';

const ManagePosts = () => {
    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(true)
    const [postLoading, setPostLoading] = useState(null)
    let searchDelay

    useEffect(() => {
        document.title = 'Blog - керування дописами'

        getAllPosts().then(data => {
            setPosts(data)
            setLoading(false)
        })
    }, [])

    const getAllPosts = () => {
        const promise = axios.get(NET.APP_URL + '/posts')
        const posts = promise.then(({data}) => data)
        return posts
    }

    const deletePost = (id) => {
        setPostLoading(id)

        axios.delete(`${NET.APP_URL}/posts/${id}`)
            .then(response => {
                setPostLoading(null)
                setPosts(posts.filter(post => post.id !== id))
            })
    }

    const searchPosts = (e) => {
        const value = e.target.value

        clearTimeout(searchDelay)
        searchDelay = setTimeout(() => {
            if (value) {
                setLoading(true)
                axios.get(`${NET.APP_URL}/posts/search/${value}`)
                    .then(({data}) => {
                        setPosts(data)
                        setLoading(false)
                    })
                return
            }

            // If search input is empty -> return all posts
            setLoading(true)
            
            getAllPosts().then(data => {
                setPosts(data)
                setLoading(false)
            })
        }, 1000)
    } 

    return (
        <AuthMiddleware>
            <DefaultWithPrev>
                <div className='page page_top'>
                    <div className='page__content'>
                        <div className='block'>
                            <div className='block__header'>
                                Керування дописами {posts && posts.length}
                                {loading && <div className='loader'></div>}
                            </div>
                            <div className='block__content'>
                                {posts && (<div className='posts-manage'>
                                    <div className='posts-manage__search'>
                                        <div className='box-icon'><HiSearch/></div>
                                        <input type='text' placeholder='Знайти допис' onChange={(e) => searchPosts(e)} />
                                    </div>
                                    <div className='posts-manage__list'>
                                        {posts.map(post => (
                                            <div key={post.id} className='posts-manage__item'>
                                                <div className='posts-manage__section'>
                                                    <div className='posts-manage__id'>#{post.id}</div>
                                                    <div className='posts-manage__title'>{post.title}</div>
                                                </div>
                                                <div className='posts-manage__section'>
                                                    <div className='posts-manage__views'>
                                                        <div className='box-icon'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"/></svg>    
                                                        </div>
                                                        {post.views}
                                                        <div className='box-icon'><GoComment/></div>
                                                        {post.comments_count}
                                                    </div>
                                                    <div className='posts-manage__preview' 
                                                        style={{ backgroundImage: `url(/public/uploads/posts/prev_${post.image})` }}
                                                    ></div>
                                                </div>
                                                <div className='posts-manage__section'>
                                                    <div className='posts-manage__date'>
                                                        <div className='box-icon'><AiOutlineFieldTime/></div>
                                                        {post.created_at}
                                                    </div>
                                                    <div className='posts-manage__actions'>
                                                        {postLoading === post.id && <div className='loader'></div>}
                                                        <Link to={`/posts/${post.id}`}>
                                                            <button><div className='box-icon'><BiLinkExternal/></div></button>
                                                        </Link>
                                                        <Link to={`/posts/edit/${post.id}`}>
                                                            <button><div className='box-icon'><MdEdit/></div></button>
                                                        </Link>
                                                        <button onClick={() => deletePost(post.id)}><div className='box-icon'><MdClose/></div></button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {posts && !posts.length && <div className='block__message'>Нічого не знайдено</div>}
                                    </div>
                                </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultWithPrev>
        </AuthMiddleware>
    )
}

export default ManagePosts;