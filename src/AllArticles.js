import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { context } from './newsContext.js';
import Pagination from './Pagination.js';
import {DatePublished, DateCreated, DateUpdated} from './Time.js';
import Publish from './Publish.js';
import Cathegory from './Cathegory.js';
import Search from './Search.js';
import './style/all-articles.css'; 
import './style/all-articles-item.css';
import {alphabet} from './cirilizatorDecirilizator.js';
import FindLabel from './FindLabel.js'

const NEWS_PER_PAGE = 10; 

export default function AllArticles() {

    const { listAllArticles, setListAllArticles, listLoaded, setListLoaded, setIsLoggedIn,
        setActiveLink, activeCriteria, setActiveCriteria,setNewArticleBtn, checkStorageToken,
        setShowFrontend, setShowMenu, setShowCalendar, setShowCmsOverlay} = useContext(context);
    const [pageNum, setPageNum] = useState(1);
    const [findVisible, setFindVisible] = useState(false);

    const sortArticles = () => {
        setListAllArticles((prev) => {

            if(activeCriteria[0] === 'title') {
                prev.sort((a, b) => {
                    return  activeCriteria[1] === 'down'? alphabet.indexOf(a.title.split('')[0].toLowerCase()) - alphabet.indexOf(b.title.split('')[0].toLowerCase()) :
                                                          alphabet.indexOf(b.title.split('')[0].toLowerCase()) - alphabet.indexOf(a.title.split('')[0].toLowerCase())
                })
                return [...prev]
            }
            prev.sort((a, b) => {
                return activeCriteria[1] === 'down'? new Date(b[activeCriteria[0]]).getTime() - new Date(a[activeCriteria[0]]).getTime() :
                                                     new Date(a[activeCriteria[0]]).getTime() - new Date(b[activeCriteria[0]]).getTime()
            })
            return [...prev]
        })
    }
    
    useEffect(async function () {
        setShowCmsOverlay('none');
        return () => {
            setListLoaded(false)
        };
    }, [])


    useEffect(function () {

    setActiveLink('allArticles');
    })

    useEffect(() => sortArticles(), [activeCriteria])
    useEffect(() => {

        setNewArticleBtn('inline-block');
        setShowMenu('block');
        setShowFrontend('none');
    })

    useEffect(() => {
        console.log('from All articles');
    }, [])

     return (
        <>
                <div className="allArticles">
                    <FindLabel setFindVisible = {setFindVisible} />
                    <div className = {`find ${findVisible && 'show'}`}>
                        <Search option = 'title' />
                        <Cathegory setPageNum = {setPageNum} sortArticles = {sortArticles} />
                        <Search option = "tag" />
                        
                    </div>
                    <div className = "allArticles-columnNames" onClick = {() => setShowCalendar(false)}>
                        <div 
                            className = "allArticles-columnNames-title allArticles-columnNames-text">
                                <i className= {`fas fa-arrow-down ${activeCriteria[2] === 1? 'activeArrow' : ''}`} 
                                   onClick = {() => setActiveCriteria(['title', 'down', 1])}>
                                </i>
                                <span>Naslov</span>
                                <i className= {`fas fa-arrow-up ${activeCriteria[2] === 2? 'activeArrow' : ''}`}
                                   onClick = {() => setActiveCriteria(['title', 'up', 2])}>
                                </i>
                        </div>
                        <div className = "allArticles-columnNames-info">
                            <div 
                                className = "allArticles-columnNames-note allArticles-columnNames-text">
                                    <span>Napomena</span>
                            </div>
                            <div 
                                className = "allArticles-columnNames-dateUpdated allArticles-columnNames-text" >
                                    <i className= {`fas fa-arrow-down ${activeCriteria[2] === 3? 'activeArrow' : ''}`}
                                    onClick = {() => setActiveCriteria(['dateUpdated', 'down', 3])}></i>
                                    <span>Izmena</span>
                                    <i className= {`fas fa-arrow-up ${activeCriteria[2] === 4? 'activeArrow' : ''}`} 
                                    onClick = {() => setActiveCriteria(['dateUpdated', 'up', 4])}></i>
                            </div>
                            <div 
                                className = "allArticles-columnNames-dateCreated allArticles-columnNames-text">
                                    <i className= {`fas fa-arrow-down ${activeCriteria[2] === 5? 'activeArrow' : ''}`}
                                    onClick = {() => setActiveCriteria(['dateCreated', 'down', 5])}></i>
                                    <span>Kreirano</span>
                                    <i className= {`fas fa-arrow-up ${activeCriteria[2] === 6? 'activeArrow' : ''}`}
                                    onClick = {() => setActiveCriteria(['dateCreated', 'up', 6])}></i>
                            </div>
                            <div 
                                className = "allArticles-columnNames-datePublished allArticles-columnNames-text">
                                    <i className= {`fas fa-arrow-down ${activeCriteria[2] === 7? 'activeArrow' : ''}`}
                                    onClick = {() => setActiveCriteria(['datePublished', 'down', 7])}></i>
                                    <span>Objavljeno</span>
                                    <i className= {`fas fa-arrow-up ${activeCriteria[2] === 8? 'activeArrow' : ''}`}
                                    onClick = {() => setActiveCriteria(['datePublished', 'up', 8])}></i>
                            </div>
                            <div 
                                className = "allArticles-columnNames-publish allArticles-columnNames-text">
                                    <span>Objavi</span>
                            </div>
                            <div 
                                className = "allArticles-columnNames-delete allArticles-columnNames-text">
                                    <span>Izbriši</span>
                            </div>
                        </div>
                    </div>
                    {listAllArticles.map((oneArticle, i) => {
                        const isOnLastPage = (i + 1 > listAllArticles.length - (listAllArticles.length % 10));
                        return ((i + 1) <= pageNum * NEWS_PER_PAGE && (i + 1) > pageNum * NEWS_PER_PAGE - NEWS_PER_PAGE) &&

                                <div key={i} className={`allArticles-item ${isOnLastPage? 'allArticles-item-lastPage' : ''}`} onClick = {() => setShowCalendar(false)}>
                                    <div className="allArticles-item-title allArticles-item-part">
                                        <Link to={`/oneArticle/${oneArticle._id}`}>
                                            <h2 
                                                className="allArticles-item-title-text"
                                                onClick = {() => {
                                                    setShowCmsOverlay('block');
                                                    setIsLoggedIn(checkStorageToken())
                                                }}
                                            >{oneArticle.title}
                                            </h2>
                                        </Link>
                                    </div>
                                    <div className = "allArticles-item-info">
                                        <div className = "allArticles-item-note allArticles-item-part">{oneArticle.note}</div>
                                        <DateUpdated timeUpdated = {oneArticle.dateUpdated}/>
                                        <DateCreated timeCreated = {oneArticle.dateCreated}/>
                                        <DatePublished timePublished = {oneArticle.datePublished} published = {oneArticle.published}/>
                    
                                        <Publish id={oneArticle._id} published = {oneArticle.published} />

                                        <div className="allArticles-item-delete allArticles-item-part"> 
                                        {!oneArticle.published && <Link to={`/delete/${oneArticle._id}`}>
                                            <button>Izbriši</button>
                                        </Link>}
                                        </div>
                                    </div>
                                </div>
                     
                    })}
                </div>
            <Pagination
                isLastPage={pageNum * NEWS_PER_PAGE >= listAllArticles.length ? true : false}
                NEWS_PER_PAGE={NEWS_PER_PAGE}
                pageNum={pageNum}
                setPageNum={setPageNum}
            />
        </>
    )
}