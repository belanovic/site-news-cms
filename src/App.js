import React, { useState, useRef, useContext, useEffect } from 'react';
import Header from './Header';
import Homepage from './Homepage.js';
import AllArticles from './AllArticles.js';
import Article from './Article.js';
import Delete from './Delete.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { context } from './newsContext';
import Footer from './Footer'; 
import Form from './Form.js';
import Profile from './Profile';
import Order from './Order.js';
import SearchDate from './SearchDate';
import Proba from './Proba.js';

export default function App() {

    const cmsOverlay = useRef(null);
    const { showCmsOverlay, setShowCmsOverlay, 
            isLoggedIn, isNewArticle, 
            setIsLoggedIn } = useContext(context);

            useEffect(() => {
                console.log('from App');
            }, [])

    return (<>
        {isLoggedIn ?
            <div 
                className="cms"
            >
                <div className="cmsOverlay" ref={cmsOverlay} style={{ display: showCmsOverlay }}></div>
                <Header showHomepageBtn={false} showFrontend={false} allArticlesBtn={false} newArticleBtn={false} />
                {/* <Proba /> */}
                <Switch>
                    <Route exact path="/"> 
                        <Homepage /> 
                    </Route>
                    <Route path="/profile"><Profile /></Route>
                    <Route path="/order"><Order /></Route>
                    <Route path="/search-date"><SearchDate /></Route> 
                    <Route path='/allArticles'>  
                        <AllArticles />
                    </Route>
                    <Route path='/oneArticle/:id'>
                        <Article key = 'notNew' setShowCmsOverlay={setShowCmsOverlay} />
                    </Route>
                    <Route path='/oneArticleNew/:id'>
                        <Article key = 'new' setShowCmsOverlay={setShowCmsOverlay} />
                    </Route>
                    <Route path='/delete/:id'>
                        <Delete /> 
                    </Route>
                </Switch>
                <Footer />
            </div>
            :
            <Form />
        }
    </>
    )
}