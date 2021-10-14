import react, { useContext, useEffect, useState } from 'react';
import {context} from './newsContext';
import './style/profile.css';
import ChooseImage from './ChooseImage.js';
import {uploadImageDB, removeImageDB} from './handleImageDB.js';
import {updateProfileImg} from './getUser';

export default function Profile() {

    const {setIsLoggedIn, loggedUser} = useContext(context);

    const [deployedImgNameLarge, setDeployedImgNameLarge] = useState('');
    const [profileImgNameLarge, setProfileImgNameLarge] = useState('generic');
    const [profileImgURLLarge, setProfileImgURLLarge] = useState('generic');
    const [profileImgFileLarge, setprofileImgFileLarge] = useState('');

    const [deployedImgNameSmall, setDeployedImgNameSmall] = useState('');
    const [profileImgNameSmall, setProfileImgNameSmall] = useState('generic');
    const [profileImgURLSmall, setProfileImgURLSmall] = useState('generic');
    const [profileImgFileSmall, setprofileImgFileSmall] = useState('');

    const handleSave = async () => {

        let updatedUser;
        let photoURLLarge;
        let photoURLSmall;

        if(profileImgURLLarge === 'generic') {
            photoURLLarge = 'generic';
            updatedUser = await updateProfileImg(localStorage.getItem('loggedUsername'), localStorage.getItem('loggedEmail'), photoURLLarge, profileImgNameLarge, 'large' )
            if(deployedImgNameLarge !== 'generic') {
                const deletionMsg = await removeImageDB(deployedImgNameLarge, 'profile/');
                console.log(deletionMsg)
            }
            
        } else { 
            photoURLLarge = await uploadImageDB(profileImgNameLarge, profileImgFileLarge, 'profile/');
            updatedUser = await updateProfileImg(localStorage.getItem('loggedUsername'), localStorage.getItem('loggedEmail'), photoURLLarge, profileImgNameLarge, 'large'  )
            
            if(deployedImgNameLarge !== 'generic') {

                const deletionMsg = await removeImageDB(deployedImgNameLarge, 'profile/');
            }

            setDeployedImgNameLarge(updatedUser[1].profileImgNameLarge);
            localStorage.setItem('profileImgURLLarge', updatedUser[1].profileImgURLLarge);
            setProfileImgURLLarge(localStorage.getItem('profileImgURLLarge'));
        }


        if(profileImgURLSmall === 'generic') {
            photoURLSmall = 'generic';
            updatedUser = await updateProfileImg(localStorage.getItem('loggedUsername'), localStorage.getItem('loggedEmail'), photoURLSmall, profileImgNameSmall, 'small' )
            if(deployedImgNameSmall !== 'generic') {
                const deletionMsg = await removeImageDB(deployedImgNameSmall, 'profile/');
            }
            
        } else { 
            photoURLSmall = await uploadImageDB(profileImgNameSmall, profileImgFileSmall, 'profile/');
            updatedUser = await updateProfileImg(localStorage.getItem('loggedUsername'), localStorage.getItem('loggedEmail'), photoURLSmall, profileImgNameSmall, 'small'  )

            if(deployedImgNameSmall !== 'generic') { 
                const deletionMsg = await removeImageDB(deployedImgNameSmall, 'profile/');
            }

            setDeployedImgNameSmall(updatedUser[1].profileImgNameSmall);
            localStorage.setItem('profileImgURLSmall', updatedUser[1].profileImgURLSmall);
            setProfileImgURLSmall(localStorage.getItem('profileImgURLSmall'));
        }
    }

    const handleSignOut = (e) => {
        e.preventDefault();
        localStorage.setItem('x-auth-token', 'none');
        localStorage.setItem('loggedUsername', null);
        window.location.href = '/';
        setIsLoggedIn(false);
    }

    useEffect(() => {
        setProfileImgURLLarge(localStorage.getItem('profileImgURLLarge'));
        setProfileImgNameLarge(localStorage.getItem('profileImgNameLarge'));
        setDeployedImgNameLarge(localStorage.getItem('profileImgNameLarge'));

        setProfileImgURLSmall(localStorage.getItem('profileImgURLSmall'));
        setProfileImgNameSmall(localStorage.getItem('profileImgNameSmall'));
        setDeployedImgNameSmall(localStorage.getItem('profileImgNameSmall'));

    }, [])



    return (
        <div className = "profile">
            <ChooseImage 
                setProfileImgNameLarge = {setProfileImgNameLarge} 
                setprofileImgFileLarge = {setprofileImgFileLarge} 
                setProfileImgURLLarge = {setProfileImgURLLarge} 
                widthLarge = {299}
                
                setProfileImgNameSmall = {setProfileImgNameSmall} 
                setprofileImgFileSmall = {setprofileImgFileSmall} 
                setProfileImgURLSmall = {setProfileImgURLSmall} 
                widthSmall = {50}
            />
            {profileImgURLLarge === 'generic'?
                    <i className="fas fa-user-edit"></i> 
                    : 
                    <img src = {profileImgURLLarge}></img>}
            <button onClick = {() => handleSave()}>Sačuvaj</button>
            <div className = "profile-element">
                <div className = "profile-element-description">Korisničko ime</div>
                <div className = "profile-element-username data">{localStorage.getItem('loggedUsername')}</div>
            </div>
            <div className = "profile-element">
                <div className = "profile-element-description">Ime</div>
                <div className = "profile-element-firstname data">{localStorage.getItem('loggedFirstName')}</div>
            </div>
            <div className = "profile-element">
                <div className = "profile-element-description">Prezime</div>
                <div className = "profile-element-lastname data">{localStorage.getItem('loggedLastName')}</div>
            </div>
            <div className = "profile-element">
                <div className = "profile-element-description">email</div>
                <div className = "profile-element-email data">{localStorage.getItem('loggedEmail')}</div>
            </div>
            <button 
                className = "profile-signOut"
                onClick = {(e) => handleSignOut(e)}
            >Odjavi se</button>
        </div>
    )
}