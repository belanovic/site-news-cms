import firebase from './firebase.js';

const storage = firebase.storage();

export async function uploadImageDB (imgName, imgFile, folder) {
    try {
        const ref8 = storage.ref(`site-news-images/${folder}` + imgName); 
        const snapshot = await ref8.put(imgFile);
        const photoURL = await ref8.getDownloadURL();
        return photoURL
    } catch(err) {
        return err
    }
}

export async function removeImageDB(imgName, folder) {
    try {
        const imgRef = await storage.ref(`site-news-images/${folder}` + imgName);
        const promiseResolve = await imgRef.delete();
        return 'Image deleted'
    } catch(err) {
        return err
    }
}