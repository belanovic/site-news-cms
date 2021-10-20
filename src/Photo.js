import React, {useState, useContext, useEffect } from 'react';
import { context } from './newsContext';
import ImgCropper from './ImgCropper.js';
import GenericThumb from './GenericThumb.js';
import './style/image.css';
import Line from './Line'

export default function Photo({ imgURL, setImgURL, setImgName, setImgFile,
      imgURL2, setImgURL2, setImgName2, setImgFile2, imgFilter, setImgFilter,
      imgFilter2, setImgFilter2, tabPhotoVisibility, imgDescription, 
      inputHandler, cathegory }) {

    /* const { articleImgLoaded1, setArticleImgLoaded1, articleImgLoaded2, setArticleImgLoaded2 } = useContext(context); */

    const [filterStyle1, setFilterStyle1] = useState('none');
    const [filterStyle2, setFilterStyle2] = useState('none');



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
                        filterObj = {imgFilter}
                        setFilterObj = {setImgFilter}

                        filterStyle = {filterStyle1} 
                        setFilterStyle = {setFilterStyle1}
                    />
                    <div  className="article-photo-img-container">
                        {imgURL === 'generic' ?
                            <GenericThumb 
                                className="article-photo-img"
                                shape = {'wide'} 
                                cathegory={cathegory} 
                            />
                            :
                            <img
                                className="article-photo-img"
                                src={imgURL}
                                alt="fotka"
                              /*   onLoad={() => {
                                    setArticleImgLoaded1(true);
                                }} */
                                style = {{filter: filterStyle1}}
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
                        filterObj = {imgFilter2}
                        setFilterObj = {setImgFilter2}

                        filterStyle = {filterStyle2}
                        setFilterStyle = {setFilterStyle2}
                    />
                    <div className="article-photo-img-container">
                        {imgURL2 === 'generic' ?
                            <GenericThumb 
                                className="article-photo-img"
                                shape = {'square'} 
                                cathegory={cathegory} 
                            />
                            :
                            <img
                                className="article-photo-img"
                                src={imgURL2}
                                alt="fotka"
                               /*  onLoad={() => {
                                    setArticleImgLoaded2(true);
                                }} */
                                style = {{filter: filterStyle2 }}
                            >
                            </img>}
                    </div>
                </div>
                <Line />
            </div>
        </div>
    )
}