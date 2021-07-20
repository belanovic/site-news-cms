import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { context } from './newsContext.js';
import './style/header.css';

export default function Header() {

       const { showHomepageBtn, allArticlesBtn, showOrderBtn,
            newArticleBtn, showFrontend, setFormVisible, 
            activeLink,
            loggedIn, loggedUser, loggedUsername } = useContext(context);

    return (
        <header className="header">
            <div className="header-links">
                <div className="header-links-frontend" style = {{display: showFrontend}} >
                    <a href = 'https://site-news-frontend.netlify.app/' target = "_blanc">
                        <div className="header-links-frontend-title">
                            <i className="fab fa-react"></i>
                            <span>Vesti</span>
                        </div>
                    </a>
                </div>
                <div
                    className="header-homepageBtn"
                    style={{ display: showHomepageBtn }}
                >
                    <Link to="/">
                        <div
                            className="header-homepageBtn-text"
                        ><i class="fas fa-home"></i>Homepage</div>
                    </Link>
                </div>
 
                <div
                    className={`header-allArticlesBtn ${activeLink === 'allArticles' && 'activeLink'}`}
                    style={{ display: allArticlesBtn }}
                >
                    <Link to={`/allArticles`}>
                        <div
                            className="header-allArticlesBtn-text"
                        ><i class="fas fa-list-ul"></i>All articles</div>
                    </Link>
                </div>
                <div
                    className={`header-orderBtn ${activeLink === 'order' && 'activeLink'}`}
                    style={{ display: showOrderBtn }}
                >
                    <Link to={`/order`}>
                        <div
                            className="header-orderBtn-text"
                        ><i class="fas fa-stream"></i>Order articles</div>
                    </Link>
                </div>

            </div>

            <div className="header-title">
                <Link to="/">
                        <div
                            className="header-title-text"
                        >CMS</div>
                </Link>
            </div>

            <div className = "right-box">
                <div
                    className={`header-newArticleBtn ${activeLink === 'article' && 'activeLink'}`}
                    style={{ display: newArticleBtn }}
                >
                    <Link to="/oneArticle/new">
                        
                        <div
                            className="header-newArticleBtn-text"
                        ><i class="fas fa-feather-alt"></i>New article</div>
                    </Link>
                </div>
                <div className="login">
                    <Link to = "/form"><i className="fas fa-user-edit" onClick = {() => setFormVisible(prev => !prev)}></i></Link>
                    <div className = "login-info">
                        <div className = "login-info-title">User logged in:</div>
                        <div className = "login-info-username">{loggedUser.username === ''? loggedUser.username : localStorage.getItem('loggedUsername')}</div>
                    </div>
                </div>
            </div>

        </header>
    )
}