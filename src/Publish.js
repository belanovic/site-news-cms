import React, { useContext, useEffect } from 'react';
import {publishArticle, getAllArticles} from './getDatabase.js';
import { context } from './newsContext';

export default function Publish({ id, published }) {
    const {listAllArticles, setListAllArticles, setListLoaded,
            showCmsOverlay, setShowCmsOverlay
            } = useContext(context);
    async function handleClick(e) {
       try {
           setShowCmsOverlay('block');
           const publishedArticle = await publishArticle(id);
           const allNews = await getAllArticles();
           const promiseResolveA = await setListAllArticles(allNews);
           const promiseResolveB = await setListLoaded(true);
           /* window.location.href = '/allArticles'; */
           setShowCmsOverlay('none');
           console.log(publishedArticle)
           return publishedArticle
       } catch(err) {
           console.log(err)
       }
    }

    return (
        <div className="allArticles-item-publish allArticles-item-part">
            <button 
                onClick = {handleClick}
                style = {{display: !published? 'block' : 'none' }}
            >Objavi</button>
        </div>
    )
}