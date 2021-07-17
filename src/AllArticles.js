import React, { useEffect, useState, useContext } from 'react';
import { getAllArticles } from './getDatabase.js';
import { Link, useParams } from 'react-router-dom';
import { context } from './newsContext.js';
import Pagination from './Pagination.js';
import {DatePublished, DateCreated, DateUpdated} from './Time.js';
import Publish from './Publish.js';
import Search from './Search.js';

const NEWS_PER_PAGE = 10;    

export default function AllArticles() {

    const { listAllArticles, setListAllArticles, listLoaded, setListLoaded, 
        setShowHomepageBtn, 
        setAllArticlesBtn, setNewArticleBtn, setShowFrontend } = useContext(context);
    const [pageNum, setPageNum] = useState(1);
    const [imgName, setImgName] = useState('');  
    
    useEffect(async function () {
       
        return () => setListLoaded(false);
    }, [])

    useEffect(function () {

        setShowHomepageBtn('inline-block');
        setAllArticlesBtn('none');
        setNewArticleBtn('inline-block');
        setShowFrontend('none'); 
    })


    return (
        <>
            {listLoaded === true ?
                <div className="allArticles">
                    <Search setPageNum = {setPageNum} />
                    <div className = "allArticles-columnNames">
                        <div className = "allArticles-columnNames-title allArticles-columnNames-text">Naslov</div>
                        <div className = "allArticles-columnNames-note allArticles-columnNames-text">Napomena</div>
                        <div className = "allArticles-columnNames-dateCreated allArticles-columnNames-text">Vreme kreiranja</div>
                        <div className = "allArticles-columnNames-dateUpdated allArticles-columnNames-text">Poslednja izmena </div>
                        <div className = "allArticles-columnNames-datePublished allArticles-columnNames-text">Vreme objave</div>
                        <div className = "allArticles-columnNames-publish allArticles-columnNames-text">Objavi</div>
                        <div className = "allArticles-columnNames-delete allArticles-columnNames-text">Izbriši</div>
                    </div>
                    {listAllArticles.map((oneArticle, i) => {
                        const isOnLastPage = (i + 1 > listAllArticles.length - (listAllArticles.length % 10));
                        return ((i + 1) <= pageNum * NEWS_PER_PAGE && (i + 1) > pageNum * NEWS_PER_PAGE - NEWS_PER_PAGE) &&

                                <div key={i} className={`allArticles-item ${isOnLastPage? 'allArticles-item-lastPage' : ''}`}>
                                    <div className="allArticles-item-title allArticles-item-part">
                                        <Link to={`/oneArticle/${oneArticle._id}`}>
                                            <h2 className="allArticles-item-title-text">{oneArticle.title}</h2>
                                        </Link>
                                    </div>
                                    <div className = "allArticles-item-note allArticles-item-part">{oneArticle.note}</div>
                                    <DateCreated timeCreated = {oneArticle.dateCreated}/>
                                    <DateUpdated timeUpdated = {oneArticle.dateUpdated}/>
                                    <DatePublished timePublished = {oneArticle.datePublished} published = {oneArticle.published}/>
                
                                    <Publish id={oneArticle._id} published = {oneArticle.published} />

                                    <div className="allArticles-item-delete allArticles-item-part"> 
                                    {!oneArticle.published && <Link to={`/delete/${oneArticle._id}`}>
                                        <button>Izbriši</button>
                                    </Link>}
                                    </div>
                                </div>
                     
                    })}
                </div>
                :
                <div className="listaVesti loading" style={{
                    fontSize: '5rem',
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>Loading...</div>}
            <Pagination
                isLastPage={pageNum * NEWS_PER_PAGE >= listAllArticles.length ? true : false}
                NEWS_PER_PAGE={NEWS_PER_PAGE}
                pageNum={pageNum}
                setPageNum={setPageNum}
            />
        </>
    )
}