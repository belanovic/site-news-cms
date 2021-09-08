import React, {useState, useContext, useEffect } from 'react';
import { context } from './newsContext';
import ImgCropper from './ImgCropper.js';
import GenericThumb from './GenericThumb.js';
import './style/image.css';
import Line from './Line'

export default function Photo({ imgURL, setImgURL, setImgName, setImgFile,
    imgURL2, setImgURL2, setImgName2, setImgFile2,
    tabPhotoVisibility, imgDescription, inputHandler, cathegory }) {

    const { articleImgLoaded, setArticleImgLoaded } = useContext(context);

    const [filter, setFilter] = useState({
        URL: 'imgURL',
        filter: 'none'

    });
    const [filter2, setFilter2] = useState({
        URL: 'imgURL',
        filter: 'none'

    });

    useEffect(() => {
        console.log(filter);
    })

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
                <Line />
                <div className="article-photo-wide">
                    <ImgCropper
                        setImgURL={setImgURL}
                        setImgFile={setImgFile}
                        setImgName={setImgName}
                        ratio={16 / 9}
                        filter = {filter}
                        setFilter = {setFilter}
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
                                style = {{filter: filter.filter}}
                            >
                            </img>}
                    </div>

                </div>
                <Line />
                <div className="article-photo-square">
                    <ImgCropper
                        setImgURL={setImgURL2}
                        setImgFile={setImgFile2}
                        setImgName={setImgName2}
                        ratio={1 / 1}
                        filter = {filter2}
                        setFilter = {setFilter2}
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
                                style = {{filter: filter2.filter}}
                            >
                            </img>}
                    </div>
                </div>
                <Line />
            </div>
        </div>
    )
}