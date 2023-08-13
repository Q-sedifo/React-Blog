import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NET from '../../network';
import axios from 'axios';
import './MostPopularPosts.scss';

const MostPopularPosts = () => {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        axios.get(NET.APP_URL + '/posts/popular')
            .then(({data}) => {
                setPosts(data)
                setLoading(false)
            })
            .catch(reponse => {
                console.log(reponse)
            })
    }, [])

    return (
        <div className='block'>
            <div className='block__header'>
                Популярні дописи
                {loading && <div className='loader'></div>}
            </div>
            <div className='block__content'>
                <div className='post-popular'>
                    {posts && posts.map(post => (
                        <Link to={`posts/${post.id}`} key={post.id} className='post-popular__item'>
                            <div className='post-popular__widgets-line'>
                                <div className='box-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"/></svg>    
                                </div>
                                {post.views}
                            </div>
                            <div className='post-popular__preview' style={{ backgroundImage: `url(/public/uploads/posts/prev_${post.image})` }}></div>
                            <div className='post-popular__title'>{post.title}</div>
                        </Link>
                    ))}
                    {posts && posts.length == 0 && (
                        <div className='block__message'>Немає дописів :(</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MostPopularPosts;