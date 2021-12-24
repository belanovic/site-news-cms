import React, { useState, useEffect } from 'react';

const context = React.createContext();


function Provider(props) {

    const [listAllArticles, setListAllArticles] = useState([]);
    const [listLoaded, setListLoaded] = useState(true);
  /*   const [articleDataLoaded, setArticleDataLoaded] = useState(false);
    const [articleImgLoaded1, setArticleImgLoaded1] = useState(false);
    const [articleImgLoaded2, setArticleImgLoaded2] = useState(false); */
    /* const [articleVideoLoaded, setArticleVideoLoaded] = useState(false); */
    const [showCmsOverlay, setShowCmsOverlay] = useState('none');

    const [newArticleBtn, setNewArticleBtn] = useState('none');
    const [showMenu, setShowMenu] = useState('none');
    const [activeLink, setActiveLink] = useState('none');
    const [showFrontend, setShowFrontend] = useState('none');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [defaultCathegory, setDefaultCathegory] = useState('allArticles');
    const [activeCriteria, setActiveCriteria] = useState(['dateUpdated', 'down', 3]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [activeRoom, setActiveRoom] = useState('');
    const [roomsCall, setRoomsCall] = useState([]);


    const defaultFilter = [{
        blur: 0,
        brightness: 100,
        contrast: 100,
        grayscale: 0,
        huRotate: 0,
        invert: 0,
        opacity: 100,
        saturate: 100,
        sepia: 0
    }]

    const checkStorageToken = () => {
        const storageToken = localStorage.getItem('x-auth-token');
        return storageToken === 'none' || storageToken === null || storageToken === undefined ?
            false : true
    }

 /*    const checkStorageToken = () => {
        setIsLoggedIn((prev) => {
            const storageToken = localStorage.getItem('x-auth-token');
            return storageToken === 'none' || storageToken === null || storageToken === undefined ?
                false : true
        })
    }
 */
    useEffect(() => {
        setIsLoggedIn(checkStorageToken());
    })

    /*   useEffect(() => {
  
          console.log('User is logged in? ' + isLoggedIn)
          console.log('in local storage ' + localStorage.getItem('x-auth-token'))
      }, [isLoggedIn]) */

    /*  useEffect(async () => {
         const n = listAllArticles;
         n.sort((a, b) => a.position - b.position);
         console.log(n)
     }, [listAllArticles]) */

     useEffect(() => {
        console.log('from news context');
        console.log(isLoggedIn);
    }, [isLoggedIn])

    return (
        <context.Provider value={{
            listAllArticles,
            setListAllArticles,
            listLoaded,
            setListLoaded,
            /* articleDataLoaded,
            setArticleDataLoaded,
            articleImgLoaded1,
            setArticleImgLoaded1,
            articleImgLoaded2,
            setArticleImgLoaded2, */
            showCmsOverlay,
            setShowCmsOverlay,
            newArticleBtn,
            setNewArticleBtn,
            activeLink,
            setActiveLink,
            showFrontend,
            setShowFrontend,
            isLoggedIn,
            setIsLoggedIn,
            defaultCathegory,
            setDefaultCathegory,
            activeCriteria,
            setActiveCriteria,
            showMenu,
            setShowMenu,
            showCalendar,
            setShowCalendar,
            defaultFilter,
            checkStorageToken,
            activeRoom,
            setActiveRoom,
            roomsCall,
            setRoomsCall
        }}>
            {props.children}
        </context.Provider>
    )
}

export { context, Provider };

