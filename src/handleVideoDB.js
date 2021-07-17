import firebase from './firebase.js';

const storage = firebase.storage();

export async function uploadVideoDB (videoName, videoFile) {
    try {
        const ref8 = storage.ref('site-news-images/' + videoName);
        const snapshot = await ref8.put(videoFile);
        const videoURL = await ref8.getDownloadURL();
        return videoURL
    } catch(err) {
        return err
    }
}

export async function removeVideoDB(videoName) {
    try {
        const videoRef = await storage.ref('site-news-images/' + videoName);
        const promiseResolve = await videoRef.delete();
        return 'Videoe deleted'
    } catch(err) {
        return err
    }
}