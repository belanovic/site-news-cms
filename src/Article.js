import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { context } from './newsContext.js';
import { getArticle, getAllArticles, postArticle, 
        updateArticle, getFrontpageNews, 
        updateArticlePosition } from './getDatabase.js';
import PositionPublish from './PositionPublish.js';
import Title from './Title.js';
import Subtitle from './Subtitle.js';
import Textarea from './Textarea.js';
import ChooseImage from './ChooseImage.js';
import ChooseVideo from './ChooseVideo';
import Tags from './Tags.js';
import Photo from './Photo.js';
import Video from './Video.js';
import firebase from './firebase.js';
import { uploadImageDB, removeImageDB } from './handleImageDB';
import { uploadVideoDB, removeVideoDB } from './handleVideoDB';
import {publishTwit} from './getDatabase';
import TextEditor from './TextEditor.js';
import Line from './Line';
import Note from './Note';
import Scraper from './Scraper';
import Twitter from './Twitter';
import './style/article.css';
import './style/article-navigation.css';


const storage = firebase.storage();

export default function Article({ setShowCmsOverlay, isNew }) {

    const [tabPublishVisibility, setTabPublishVisibility] = useState('none')
    const [tabTextVisibility, setTabTextVisibility] = useState('block')
    const [tabPhotoVisibility, setTabPhotoVisibility] = useState('none')
    const [tabVideoVisibility, setTabVideoVisibility] = useState('none')
    const [tabSocialVisibility, setTabSocialVisibility] = useState('none')
    const [activeTab, setActiveTab] = useState(1);

    const [frontpageNews, setFrontpageNews] = useState('');
    const [published, setPublished] = useState(false);
    const [alreadyPublished, setAlreadyPublished] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [IdArticleToChangePosition, setIdArticleToChangePosition] = useState('');
    const [position, setPosition] = useState(0);
    const [category, setCategory] = useState('politics');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [initialText, setInitialText] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [twit, setTwit] = useState('');
    const [sendTwit, setSendTwit] = useState(true);
    const [paragraphs, setParagraphs] = useState([]);
    const [author, setAuthor] = useState(localStorage.getItem('loggedFirstName') +  ' ' + localStorage.getItem('loggedLastName'));
    const [source, setSource] = useState('Vesti');
    const [tagsArr, setTagsArr] = useState(['vesti']);
    const [note, setNote] = useState('');

    const [imgDescription, setImgDescription] = useState('');
    const [deployedImgName, setDeployedImgName] = useState('');
    const [imgName, setImgName] = useState('generic');
    const [deployedImgURL, setDeployedImgURL] = useState('');
    const [imgURL, setImgURL] = useState('generic');
    const [imgFile, setImgFile] = useState('');

    const [videoDescription, setVideoDescription] = useState('');
    const [deployedVideoName, setDeployedVideoName] = useState('');
    const [videoName, setVideoName] = useState('none');
    const [deployedVideoURL, setDeployedVideoURL] = useState('none');
    const [videoURL, setVideoURL] = useState('none');
    const [videoFile, setVideoFile] = useState('none');

    const { id } = useParams();
    const [isNewArticle, setIsNewArticle] = useState(true);
    const { listAllArticles, setListAllArticles,
        listLoaded, setListLoaded,setShowMenu,
        articleImgLoaded, setArticleImgLoaded,
        setActiveLink, articleDataLoaded, setArticleDataLoaded,
        setNewArticleBtn, setShowFrontend
    } = useContext(context);

    let contentLoaded = articleDataLoaded === true && (articleImgLoaded === true || imgURL === 'generic');

    function findNewLine() {
        const pasusi = text.split('\n')
        const elementsP = pasusi.map((prom, i) => prom);
        setParagraphs(elementsP);
    }

    async function findSelectedArticle() {

        if (id === 'new') {
            setShowCmsOverlay('block');
            setIsNewArticle(true);
            setArticleDataLoaded(true);
            /* setArticleVideoLoaded(true); */
            setArticleImgLoaded(true);
            return
        }
        const selectedArticle = await getArticle(id);
        setIsNewArticle(false);
        setTitle(selectedArticle.title);
        setNote(selectedArticle.note);
        setSubtitle(selectedArticle.subtitle);
        setText(selectedArticle.text);
        setInitialText(selectedArticle.text);
        setParagraphs(selectedArticle.paragraphs);
        setSource(selectedArticle.source);
        setAuthor(selectedArticle.author);
        setTagsArr(selectedArticle.tagsArr);

        setImgDescription(selectedArticle.imgDescription);
        setDeployedImgURL(selectedArticle.imgURL);
        setImgURL(selectedArticle.imgURL);
        setDeployedImgName(selectedArticle.imgName);
        setImgName(selectedArticle.imgName);

        setVideoDescription(selectedArticle.videoDescription);
        setDeployedVideoURL(selectedArticle.videoURL);
        setVideoURL(selectedArticle.videoURL);
        setDeployedVideoName(selectedArticle.videoName);
        setVideoName(selectedArticle.videoName);

        setCategory(selectedArticle.category);
        setPosition(selectedArticle.position);
        setCurrentPosition(selectedArticle.position);
        setPublished(selectedArticle.published);
        setAlreadyPublished(selectedArticle.published);
        setArticleDataLoaded(true);
    }
    async function handleSave() {
        if (title.length === 0 || text.length === 0) {
            return;
        }
        setShowCmsOverlay('block');
        const vest = {
            id: id,
            category: category,
            published: published,
            position: position,
            title: title,
            note: note,
            subtitle: subtitle,
            text: text,
            paragraphs: paragraphs,
            imgName: imgName,
            imgDescription: imgDescription,
            videoName: videoName,
            videoDescription: videoDescription,
            source: source,
            author: author,
            tagsArr: tagsArr
        }
        if (id === 'new') {
            try {
                let photoURL;
                if(imgURL === 'generic') {
                    photoURL = 'generic'
                } else { 
                    photoURL = await uploadImageDB(imgName, imgFile);
                }

                if (videoName !== 'none') {
                    const videoURL = await uploadVideoDB(videoName, videoFile);
                    vest.videoURL = videoURL;
                }
                vest.imgURL = photoURL;
                vest.dateCreated = new Date();
                vest.dateUpdated = new Date();
                if (published) {
                    vest.datePublished = new Date();
                }
                let response = await postArticle(vest);
                let deployedArticle = await response.text(response);
                if(sendTwit) {
                    const r = await publishTwit(twit);
                }
                const allNews = await getAllArticles();
                const promiseResolveA = await setListAllArticles(allNews);
                const promiseResolveB = await setListLoaded(true);

                if (IdArticleToChangePosition !== '') {
                    let changedPositionArticle = await updateArticlePosition(IdArticleToChangePosition, currentPosition);
                    console.log('changed position artuicle' + changedPositionArticle)
                }

                window.location.href = '/allArticles';
                setShowCmsOverlay('block');
                return deployedArticle
            } catch (err) {
                console.log(err);
            }

        } else {
            try {
                if (deployedImgName !== imgName) {
                    const photoURL = await uploadImageDB(imgName, imgFile);
                    const deletionMsg = await removeImageDB(deployedImgName);
                    vest.imgURL = photoURL;
                }
                if (deployedVideoName !== videoName) {
                    const videoURL = await uploadVideoDB(videoName, videoFile);
                    const deletionMsg = await removeVideoDB(deployedVideoName);
                    vest.videoURL = videoURL;
                }

                vest.dateUpdated = new Date();

                if (published === true && alreadyPublished === false) {
                    vest.datePublished = new Date()
                }
                let response = await updateArticle(vest);
                let updatedArticle = await response.json();
                if (IdArticleToChangePosition !== '') {
                    let changedPositionArticle = await updateArticlePosition(IdArticleToChangePosition, currentPosition);
                    console.log('changed position artuicle' + changedPositionArticle)
                }
                const allNews = await getAllArticles();
                if(sendTwit) {
                    const r = await publishTwit(twit);
                }
                const promiseResolveA = await setListAllArticles(allNews);
                const promiseResolveB = await setListLoaded(true);
                window.location.href = '/allArticles';
                setShowCmsOverlay('block');
                return updatedArticle
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleSelect = (e) => {
        const option = e.target.value;
        console.log(option);
        setCategory(option);
    }
    const inputHandler = (e) => {
        const name = e.target.name;
        console.log(name);
        const value = e.target.value;
        if (name === 'source') {
            setSource(value);
            return
        }
        if (name === 'author') {
            setAuthor(value);
            return
        }
        if (name === 'imgDescription') {
            setImgDescription(value);
            return
        }
        if (name === 'videoDescription') {
            setVideoDescription(value);
            return
        }
    }
    const handleClickTab = (tab) => {
        setActiveTab(tab);
        const arr = [setTabPublishVisibility, setTabTextVisibility,
            setTabPhotoVisibility, setTabVideoVisibility, setTabSocialVisibility];

        arr.forEach((prom, i) => {
            if (tab === i) {
                prom('block')
            } else {
                prom('none');
            }
        })
    }
    useEffect(() => {
        findSelectedArticle();
        setShowCmsOverlay('none');
        return () => {
            setArticleImgLoaded(false);
            /*  setArticleVideoLoaded(false); */
            setArticleDataLoaded(false);
        }
    }, [])

    useEffect(() => {
        findNewLine();
    }, [text])

    useEffect(async () => {
        const n = await getFrontpageNews();
        /* n.forEach((prom) => {
            console.log(prom.position + ' ' + prom.title);
        }) */
        setFrontpageNews(n);

    }, [])
    useEffect(async () => {
        const n = await getFrontpageNews();
    }, [text])

   useEffect(function () {
        setActiveLink('article');
    })

    useEffect(() => {
        setNewArticleBtn('inline-block');
        setShowMenu('block');
        setShowFrontend('none');
    })

    return (
        <div className="article" style={{
            display: contentLoaded ? 'block' : 'none'
        }}>

            <div className="article-navigation">
                <div className="save">
                    {title !== '' && text !== '' ?
                        <button className="saveBtn" onClick={handleSave}>Save</button>
                        :
                        ''}
                </div>
                <div className="article-navigation-tabs">
                    <div
                        className={`article-navigation-tab ${activeTab === 1 ? 'active-tab' : ''}`}
                        onClick={() => { handleClickTab(1) }}
                    >Tekst</div>

                    <div
                        className={`article-navigation-tab ${activeTab === 2 ? 'active-tab' : ''}`}
                        onClick={() => { handleClickTab(2) }}
                    >Fotografija</div>

                    <div
                        className={`article-navigation-tab ${activeTab === 3 ? 'active-tab' : ''}`}
                        onClick={() => { handleClickTab(3) }}
                    >Video</div>
                </div>
                <div className="fake-article-navigation-element"></div>

            </div>

            <div className="article-content" style={{ display: tabTextVisibility }}>
                <div className="article-content-container">
                    <div className="article-text" >
                        <TextEditor
                            text={text}
                            setText={setText}
                            initialText={initialText}
                        />
                    </div>

                    <div className="article-info">
                        <Title
                            title={title}
                            setTitle={setTitle}
                        />
                        <Subtitle
                            subtitle={subtitle}
                            setSubtitle={setSubtitle}
                        />
                        <Twitter 
                            subtitle = {subtitle} 
                            twit = {twit} 
                            setTwit = {setTwit} 
                            sendTwit = {sendTwit}
                            setSendTwit = {setSendTwit}
                        />
                        <div className="cathegories">
                            <label htmlFor="cathegories">Rubrike</label>
                            <select id="cathegories" value={category} onChange={handleSelect}>
                                <option value="politics">Politics</option>
                                <option value="business">Business</option>
                                <option value="technology">Technology</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="sports">Sports</option>
                            </select>
                        </div>
                        <Line />
                        <div className="source">
                            <label htmlFor="source">Izvor</label>
                            <input
                                id="source"
                                name="source"
                                type="text"
                                value={source}
                                onChange={inputHandler}
                            ></input>
                        </div>
                        <Line />
                        <div className="source">
                            <label htmlFor="author">Autor</label>
                            <input
                                id="author"
                                name="author"
                                type="text"
                                value={author}
                                onChange={inputHandler}
                            ></input>
                        </div>
                        <Line />
                        <Tags tagsArr={tagsArr} setTagsArr={setTagsArr} />
                        <Line />
                        <Note note={note} setNote={setNote} />
                        <Line />
                        <PositionPublish
                            frontpageNews = {frontpageNews} 
                            setPosition = {setPosition} 
                            published = {published} 
                            setPublished = {setPublished}
                            position = {position}
                            setIdArticleToChangePosition = {setIdArticleToChangePosition}
                            currentPosition = {currentPosition}
                        />
                        <Line />
                        <Scraper setTitle={setTitle} setSubtitle={setSubtitle} setInitialText={setInitialText} />
                        <Line />
                    </div>
                </div>
            </div>

            <Photo
                tabPhotoVisibility={tabPhotoVisibility}
                imgDescription={imgDescription}
                inputHandler={inputHandler} 
                imgURL={imgURL} 
                setImgURL={setImgURL}
                setImgName={setImgName}
                setImgFile={setImgFile}
                cathegory = {category}
            />
            <Video
                videoURL={videoURL}
                setVideoURL={setVideoURL}
                setVideoName={setVideoName}
                setVideoFile={setVideoFile}
                value={videoDescription}
                onChange={inputHandler}
                tabVideoVisibility = {tabVideoVisibility}
            />

            <div className="loadingArticle" style={{
                display: contentLoaded === true || isNewArticle === true ? 'none' : 'block',
                fontSize: '5rem',
                fontWeight: 'bold',
                textAlign: 'center',
                pointerEvents: 'none'
            }}>Loading...</div>

        </div>
    )
}