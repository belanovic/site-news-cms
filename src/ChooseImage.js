import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';

const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 620,
    useWebWorker: true
}

export default function ChooseImage({ setImgName, setImgFile, setImgURL }) {

    async function uploadHandler(e) {

        let file = e.target.files[0];
        if (file === undefined) return;
        const fileName = Date.now() + '_' + file.name;
        const compressedFile = await imageCompression(file, options);

        /*   console.log(file.size/1024 + ' KB');
          console.log(compressedFile.size/1024 + ' KB'); */

        file = compressedFile;

        const customURL = URL.createObjectURL(file);
        setImgURL(customURL);
        console.log(customURL)

        /* if (!isNewArticle && changeImgCounter > 0) {
            const currentImgRef = storage.ref('site-news-images/' + currentImgName);
            const deletedImage = await currentImgRef.delete();
        }  */

        setImgName(fileName);
        setImgFile(file);
    }

    return (
        <div>
            <input
                type="file"
                onChange={uploadHandler}>
            </input>
        </div>
    )
}