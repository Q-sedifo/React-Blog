import React, { useState, useEffect } from 'react';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import DefaultWithPrev from '../../layouts/DefaultWithPrev';
import HostForm from '../../components/HostForm/HostForm';
import NET from '../../network';
import './Profile.scss';

const Profile = () => {
    const [host, setHost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getHost().then(({data}) => {
            setHost(data)
            setLoading(false)
        })

        document.title = 'Blog - профіль'
    }, [])

    const getHost = () => {
        return axios.get(`${NET.APP_URL}/host`)
    }

    return (
        <AuthMiddleware>
            <DefaultWithPrev>
                <div className='page page_top'>
                    <div className='page__content'>
                        <div className='block'>
                            <div className='block__header'>
                                {loading && <div className='loader'></div>}
                            </div>
                            <div className='block__content'>
                                {host && <HostForm host={host} />}
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultWithPrev>
        </AuthMiddleware>
    )
}

export default Profile;