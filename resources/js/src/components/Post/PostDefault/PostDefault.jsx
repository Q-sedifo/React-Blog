import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineFieldTime } from 'react-icons/ai';
import './PostDefault.scss';

const PostDefault = (props) => {
    const post = props.post

    return (
        <Link to={`/posts/${post.id}`}>
            <div className='post-default'>
                <div className='post-default__preview' style={{ backgroundImage: `url(/public/uploads/posts/prev_${post.image})` }}></div>
                <div className='post-default__content'>
                    <div className='post-default__header'>{post.title}</div>
                    <div className='post-default__info'>
                        <div className='box-icon'><AiOutlineFieldTime/></div>
                        {post.created_at}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PostDefault;