import React, {useState, useEffect} from 'react';


export default function ChooseVideo({ setVideoName, setVideoFile, setVideoURL }) {

    async function uploadHandler (e) {

        let file = e.target.files[0];
        if (file === undefined) return;
        const fileName = Date.now() + '_' + file.name;

        const customURL = URL.createObjectURL(file);

        setVideoURL(customURL);
        setVideoName(fileName);
        setVideoFile(file);
    }

    return (
        <div className = "inputVideo">
        <label htmlFor = "videoFile">Izaberi video</label>
        <input
            id = "videoFile"
            type="file"
            onChange={uploadHandler}>
        </input>
        </div>
    )
}