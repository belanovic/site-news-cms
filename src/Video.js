import React, { useContext, useEffect } from 'react';
import { context } from './newsContext';
import ChooseVideo from './ChooseVideo';

export default function Video({ videoURL, setVideoName, setVideoFile, setVideoURL }) {
    /* console.log(videoURL) */
    /* const {setArticleVideoLoaded} = useContext(context); */

    useEffect(() => {
        console.log('iz video komponente: ' + videoURL)
    }, [])
    return (
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
    )
}