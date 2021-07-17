import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { context } from './newsContext.js';
import { deleteArticle, getAllArticles } from './getDatabase.js';
import Title from './Title.js';
import Subtitle from './Subtitle.js';
import Textarea from './Textarea.js';
import Photo from './Photo.js';
import firebase from './firebase.js';
import {removeImageDB} from './handleImageDB';
import {removeVideoDB} from './handleVideoDB';

const storage = firebase.storage();

export default function Delete() {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [imgURL, setImgURL] = useState('');
    const [imgName, setImgName] = useState('');
    const [videoURL, setVideoURL] = useState('');
    const [videoName, setVideoName] = useState('');
    const { id } = useParams();
    const { listAllArticles, setListAllArticles,
        listLoaded, setListLoaded,
        articleImgLoaded, setArticleImgLoaded,
        /* articleVideoLoaded, setArticleVideoLoaded, */
        articleDataLoaded, setArticleDataLoaded,
        showCmsOverlay, setShowCmsOverlay
    } = useContext(context);

    let contentLoaded = articleDataLoaded === true && articleImgLoaded === true;

    const findSelectedArticle = () => {
        const selectedArticle = listAllArticles.find((prom) => prom._id === id);
        setTitle(selectedArticle.title);
        setSubtitle(selectedArticle.subtitle);
        setText(selectedArticle.text);
        setImgURL(selectedArticle.imgURL);
        setImgName(selectedArticle.imgName);
        setVideoURL(selectedArticle.videoURL);
        setVideoName(selectedArticle.videoName);
        setArticleDataLoaded(true);
    }

    async function handleDelete() {
        try {
            const promiseResolveD = setShowCmsOverlay('block');
            const articleDeleted = await deleteArticle(id);
            console.log('deleted article: ' + articleDeleted);
            const deletedImage = await removeImageDB(imgName);
            console.log('deleted image: ' + deletedImage);
            const deletedVideo = await removeVideoDB(videoName);
            console.log('deleted video: ' + deletedVideo);

            const allNews = await getAllArticles();
            const promiseResolveA = await setListAllArticles(allNews);
            const promiseResolveB = await setListLoaded(true);
            window.location.href = '/allArticles';
            return articleDeleted
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        findSelectedArticle();
        return () => {
            setArticleImgLoaded(false);
            /* setArticleVideoLoaded(false); */
            setArticleDataLoaded(false);
        }
    }, [])

    return (
        <div className="delete">
            <div className="delete-parts" style={{
                display: contentLoaded ? 'block' : 'none'
            }}>
                <h1 className="deleteTitle">{title}</h1>
                <h3 className="deleteSubtitle">{subtitle}</h3>
                <div className="deleteText">{text}</div>
                <Photo
                    imgURL={imgURL}
                />
                {title !== '' && text !== '' && imgURL !== '' ?
     
                        <button className="btn" onClick={handleDelete}>Delete</button>

                    :
                    <div></div>}
            </div>
            <div className="loadingArticle" style={{
                display: contentLoaded === true ? 'none' : 'block',
                fontSize: '5rem',
                fontWeight: 'bold',
                textAlign: 'center'
            }}>Loading...</div>
            <Link to='/allArticles'>
                <button>Lista vesti</button>
            </Link>
            <Link to="/" style={{ textDecoration: 'none' }}><div className="homepageBtn">Homepage</div></Link>
        </div>
    )
}