import React, { useContext } from 'react';
import { context } from './newsContext';
import ImgCropper from './ImgCropper.js';
import GenericThumb from './GenericThumb.js';
import './style/image.css';

export default function Photo({ imgURL, setImgURL, setImgName, setImgFile,
    tabPhotoVisibility, imgDescription, inputHandler, cathegory }) {

    const { articleImgLoaded, setArticleImgLoaded } = useContext(context);

    return (
        <div className="article-photo" style={{ display: tabPhotoVisibility }}>
            <div className="imgDescription">
                <label htmlFor="imgDescription">Opis fotografije</label>
                <input
                    id="imgDescription" 
                    name="imgDescription"
                    type="text"
                    value={imgDescription}
                    onChange={inputHandler}
                ></input>
            </div>

            <div className="article-photo-container">
                <div>
                    {imgURL === 'generic'?
                    <GenericThumb className = {`generic-thumb ${cathegory}`} cathegory = {cathegory}/>
                    :
                    <img
                        className="article-photo-img"
                        src={imgURL}
                        alt="fotka"
                        onLoad={() => {
                            setArticleImgLoaded(true);
                        }}
                    >
                    </img>}
                </div>
                <ImgCropper
                    setImgURL={setImgURL}
                    setImgFile={setImgFile}
                    setImgName={setImgName}
                />
            </div>
        </div>
    )
}