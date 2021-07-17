import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AllArticles from './AllArticles.js';
import Article from './Article.js';
import { context } from './newsContext.js';


export default function Homepage() {

    const { setShowHomepageBtn, setAllArticlesBtn, setNewArticleBtn, setShowFrontend } = useContext(context);

    useEffect(() => {
        setShowHomepageBtn('none');
        setAllArticlesBtn('none');
        setNewArticleBtn('none');
        setShowFrontend('block');
    })

    return (
        <div className="homepage">
            <div className="homepage-links">
                <div className="homepage-allArticlesBtn">
                    <Link to={`/allArticles`}>
                        <div
                            className="homepage-allArticlesBtn-text"
                        >List of all articles</div>
                    </Link>
                </div>
                <div className="homepage-newArticleBtn">
                    <Link to="/oneArticle/new">
                        <div
                            className="homepage-newArticleBtn-text"
                        >Create new article</div>
                    </Link>
                </div>
                <div className="homepage-frontpage-order">
                    <Link to="/order">
                        <div
                            className="homepage-frontpage-order-text"
                        >Set the frontpage</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}