import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';


export default function ChooseImage({ 
    setProfileImgNameLarge, setprofileImgFileLarge, setProfileImgURLLarge, widthLarge, 
    setProfileImgNameSmall, setprofileImgFileSmall, setProfileImgURLSmall, widthSmall
        }) {

    const optionsLarge = {
        maxSizeMB: 1,
        maxWidthOrHeight: widthLarge,
        useWebWorker: true
    }
    const optionsSmall = {
        maxSizeMB: 1,
        maxWidthOrHeight: widthSmall,
        useWebWorker: true
    }

    async function uploadHandler(e) {

        let file = e.target.files[0];
        if (file === undefined) return;
        const fileNameLarge = Date.now() + '_' + file.name + '_large';
        const fileNameSmall = Date.now() + '_' + file.name + '_small';
        const compressedFileLarge = await imageCompression(file, optionsLarge);
        const compressedFileSmall = await imageCompression(file, optionsSmall);

        /*   console.log(file.size/1024 + ' KB');
          console.log(compressedFile.size/1024 + ' KB'); */

        const fileLarge = compressedFileLarge;
        const fileSmall= compressedFileSmall;

        const customURLLarge = URL.createObjectURL(fileLarge);
        setProfileImgURLLarge(customURLLarge);

        setProfileImgNameLarge(fileNameLarge);
        setprofileImgFileLarge(fileLarge);
        
        
        const customURLSmall = URL.createObjectURL(fileSmall);
        setProfileImgURLSmall(customURLSmall);


        setProfileImgNameSmall(fileNameSmall);
        setprofileImgFileSmall(fileSmall);
    }

    return (
        <div className = "inputImage">
            <input
                type="file"
                onChange={uploadHandler}>
            </input>
        </div>
    )
}