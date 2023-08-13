import React, { useState } from 'react';
import DefaultWithPrev from '../../layouts/DefaultWithPrev';
import PostDefault from '../../components/Post/PostDefault/PostDefault';
import NET from '../../network';
import axios from 'axios';
import { HiSearch } from 'react-icons/hi';
import './Search.scss';

const Search = () => {
    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(null)

    let searchDelay

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

            setPosts(null)
        }, 1000)
    } 

    return (
        <DefaultWithPrev>
            <div className='page page_top'>
                <div className='page__content'>
                    <div className='block'>
                        <div className='block__header'>
                            Пошук
                            {loading && <div className='loader'></div>}
                        </div>
                        <div className='block__content'>
                            <div className='search'>
                                <div className='search__tools'>
                                    <div className='box-icon'><HiSearch/></div>
                                    <input className='search__field' type='text' placeholder='Знайти' onChange={(e) => searchPosts(e)} />
                                </div>
                                <div className='search__list'>
                                    {posts && posts.map(post => (
                                        <PostDefault key={post.id} post={post} />
                                    ))}
                                    {posts && !posts.length && <div className='block__message'>Нічого не знайдено</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultWithPrev>
    )
}  

export default Search;