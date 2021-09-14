import React, { useContext, useEffect } from 'react';
import { context } from './newsContext';
import ChooseVideo from './ChooseVideo';
import './style/video.css';

export default function Video({ videoURL, setVideoName, inputHandler,
    setVideoFile, setVideoURL, tabVideoVisibility, videoDescription }) {
 /*    useEffect(() => {
        console.log('iz video komponente: ' + videoURL)
    }, []) */
    return (
        <div className="article-video" style={{ display: tabVideoVisibility }}>
            <div className="videoDescription">
                <label htmlFor="videoDescription">Opis video-snimka</label>
                <input
                    id="videoDescription"
                    name="videoDescription"
                    type="text"
                    value={videoDescription}
                    onChange={inputHandler}
                ></input>
            </div>
            <div className="video-container">
                <video
                    className="video"
                    controls
                    /* onLoadStart = {() => {
                        setArticleVideoLoaded(true);
                    }} */
                    key={videoURL}
                >
                    <source src={videoURL} /* type="video/mp4" */ />
                </video>
                <ChooseVideo
                    setVideoURL={setVideoURL}
                    setVideoName={setVideoName}
                    setVideoFile={setVideoFile}
                />
            </div>
        </div>
    )
}