import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NET from '../../network';
import Default from '../../layouts/Default'; 
import MostPopularPosts from '../../components/MostPopularPosts/MostPopularPosts';
import LastPosts from '../../components/LastPosts/LastPosts';
import LastComments from '../../components/LastComments/LastComments';
import './Home.scss';

const Home = () => {
    const [host, setHost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        document.title = 'Blog - головна';

        axios.get(NET.APP_URL + '/host').then(({data}) => {
            setHost(data)
            setLoading(false)
        })
    }, [])

    return (
        <Default>
            <div className='page'>
                <div className='page__preview' 
                    style={host && { backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 70%, var(--bg-color-rgba) 100%), url(/public/uploads/host/${host.background})` }}
                >
                    {host && (<>
                        <div 
                            className='avatar' 
                            style={{ backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, var(--bg-color-rgba) 100%), url(/public/uploads/host/${host.avatar})` }}
                        ></div>
                        <h1>{host.nickname}</h1>
                    </>)}
                </div>
                <div className='page__content'>
                    <div className='page__flex'>
                        <div className='page__left-bar'>
                            <div className='block'>
                                <div className='block__header'>
                                    Інформація про мене
                                    {loading && <div className='loader'></div>}
                                </div>
                                <div className='block__content'>
                                    {host && (<>
                                        <div>{host.first_name} {host.last_name} ({host.nickname})</div>
                                        <div>{host.description}</div>
                                    </>)}
                                </div>
                            </div>
                            <MostPopularPosts/>
                        </div>
                        <div className='page__right-bar'>
                            <LastComments/>
                        </div>
                    </div>
                    <LastPosts/>
                </div>
            </div>
        </Default>
    )
}

export default Home;