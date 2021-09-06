import React, { useContext } from 'react';
import { context } from './newsContext';
import ImgCropper from './ImgCropper.js';
import GenericThumb from './GenericThumb.js';
import './style/image.css';

export default function Photo({ imgURL, setImgURL, setImgName, setImgFile,
    imgURL2, setImgURL2, setImgName2, setImgFile2,
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
                <div className="article-photo-wide">
                    <ImgCropper
                        setImgURL={setImgURL}
                        setImgFile={setImgFile}
                        setImgName={setImgName}
                        ratio={16 / 9}
                    />
                    <div>
                        {imgURL === 'generic' ?
                            <GenericThumb className={`generic-thumb ${cathegory}`} cathegory={cathegory} />
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

                </div>
                <div className="article-photo-square">
                    <ImgCropper
                        setImgURL={setImgURL2}
                        setImgFile={setImgFile2}
                        setImgName={setImgName2}
                        ratio={1 / 1}
                    />
                    <div>
                        {imgURL2 === 'generic' ?
                            <GenericThumb className={`generic-thumb ${cathegory}`} cathegory={cathegory} />
                            :
                            <img
                                className="article-photo-img"
                                src={imgURL2}
                                alt="fotka"
                            /*              onLoad={() => {
                                             setArticleImgLoaded(true);
                                         }} */
                            >
                            </img>}
                    </div>
                </div>
            </div>
        </div>
    )
}