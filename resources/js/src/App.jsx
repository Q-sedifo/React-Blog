import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import ThemeProvider from './context/ThemeProvider';
import MenuProvider from './context/MenuProvider';
import useMenu from './hooks/useMenu';
import cn from 'classnames';
import './App.scss';

import Home from './routes/Home/Home';
import ManagePosts from './routes/ManagePosts/ManagePosts';
import Post from './routes/Post/Post';
import Posts from './routes/Posts/Posts';
import Edit from './routes/Edit/Edit';
import Login from './routes/Login';
import Add from './routes/Add/Add';
import Search from './routes/Search/Search';
import Profile from './routes/Profile/Profile';
import NotFound from './routes/NotFound/NotFound';

const App = () => {
    const { menuActive, toggleMenu } = useMenu()

    return (
        <div className='app'>
            <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route exact path='/posts/:postId' element={<Post/>} />
                <Route exact path='/posts' element={<Posts/>} />
                <Route exact path='/posts/edit/:postId' element={<Edit/>} />
                <Route exact path='/posts/manage' element={<ManagePosts/>} />
                <Route exact path='/profile' element={<Profile/>} /> 
                <Route exact path='/add' element={<Add/>} />    
                <Route exact path='/login' element={<Login/>} />
                <Route exact path='/search' element={<Search/>} />
                <Route path='*' element={<NotFound/>} />    
            </Routes>

            {/* Cover block for menu */}
            <div className={cn('cover', {
                cover_active: menuActive
            })} onClick={toggleMenu}></div>
        </div>
    )
}

export default App;

if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById('root'))

    Index.render(
        // <React.StrictMode>
            <BrowserRouter>
                <AuthProvider>
                    <ThemeProvider>
                        <MenuProvider>
                            <App />
                        </MenuProvider>
                    </ThemeProvider>
                </AuthProvider>
            </BrowserRouter>
        // </React.StrictMode>
    )
}

// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/public/sw-handmade.js')
            .then(registration => {
                console.log('ServiceWorkerRegistered')
            })
    })
}
