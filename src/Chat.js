import React, { useContext, useEffect, useState, useRef } from 'react';
import './style/chat.css';
import io from 'socket.io-client';
import {nanoid} from 'nanoid';
import {context} from './newsContext';
import dateFormat from './dateFormat';
import imageCompression from 'browser-image-compression';
import shortenSentence from './shortenSentence';
import HOST_CHAT from './hostChat.js';
import Call from './Call';

const soundCheck = new Audio('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-sounds%2F590274__mrfossy__sfx-stickerripper-cluckbuttons-06.wav?alt=media&token=7e31eb83-1283-46ea-bfa3-302cba453d70')
const soundUncheck = new Audio('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-sounds%2F589940__mrfossy__sfx-squelch-slayer-impulse-72.wav?alt=media&token=95b7f193-a27b-4467-9b41-5b65a92a52d1')
const soundSendMessage = new Audio('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-sounds%2F589135__mrfossy__sfx-simplesnaps-singles-01.wav?alt=media&token=8c219a05-5cf3-4b84-9df6-6d48c17b45a5')
const soundReceiveMessage = new Audio('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-sounds%2F588847__mrfossy__sfx-monosjam-impulse-76.wav?alt=media&token=4d50d39d-e655-48b4-be7a-0cf341bac3bf')

const soundPlay = (sound) => {
      sound.play();
      sound.currentTime = 0;
}

const socket = io(HOST_CHAT);

const profileImgURLLarge = localStorage.getItem('profileImgURLLarge');
const profileImgURLSmall = localStorage.getItem('profileImgURLSmall');

export default function Chat() {
    
    const {roomsCall, setRoomsCall} = useContext(context);

    const [showOverlay, setShowOverlay] = useState(false);
    const [overlayMessage, setOverlayMessage] = useState('');

    const chatMessages = useRef(null);
    const inputText = useRef(null);

    const [roomInput, setRoomInput] = useState('');
    const [rooms, setRooms] = useState(['main', 'second']);
    const [activeRoom, setActiveRoom] = useState(0);

    const [usernameLoggedIn, setUsernameLoggedIn] = useState('');
    const [text, setText] = useState('')
    const [messages, setMessages] = useState([]);

    const [messageToReply, setMessageToReply] = useState('');
    const [messageToReplyIndex, setMessageToReplyIndex] = useState('');
    const [displayMessageToReply, setDisplayMessageToReply] = useState(false);

    const [callee, setCallee] = useState('');
    const [makeCall, setMakeCall] = useState({start: false, type: ''});

    const [connectedChat, setConnectedChat] = useState(false);
    const [connectedCall, setConnectedCall] = useState(false);
    const [roomAlreadyCreatedByAnotherSocket, setRoomAlreadyCreatedByAnotherSocket] = useState(false);


    const handleClickCall = (usernameToCall, callType) => {
        if(!roomsCall.some(prom => prom === usernameToCall)) {
            alert(usernameToCall + ' ' + 'is not logged innnnn');
            return
        }
        setCallee(usernameToCall);
        setMakeCall({start: true, type: callType});
    }

    const addRoom = () => {
        const hasSameRoom = rooms.some(prom => roomInput === prom);
        if(hasSameRoom) return;
        setRooms(prev => {
            setRoomInput('');
            return [...prev, roomInput];
        })
    }

    const handleClickRoom = (i) => {
        setActiveRoom(i);
    }

    const sendMessageClick = () => {
        if(text === '') return;
        const payload = {
            room: rooms[activeRoom],
            initialRooms: rooms,
            text: text,
            messageToReply: messageToReply,
            username: usernameLoggedIn,
            checked: [],
            milliseconds: new Date().getTime(),
            profileImgURLLarge: profileImgURLLarge,
            profileImgURLSmall: profileImgURLSmall
        }
        soundPlay(soundSendMessage);
        socket.emit('message', payload);
        setText('');
        setMessageToReplyIndex('');
        
    }
    const sendMessagePress = (e) => {
        if(e.code !== 'NumpadEnter' && e.code !== 'Enter' ) return;
        const payload = {
            room: rooms[activeRoom],
            text: text,
            messageToReply: messageToReply,
            username: usernameLoggedIn,
            checked: [],
            milliseconds: new Date().getTime(),
            profileImgURLLarge: profileImgURLLarge,
            profileImgURLSmall: profileImgURLSmall
        }
        soundPlay(soundSendMessage);
        socket.emit('message', payload);
        setText('');
        setMessageToReplyIndex('');
    }

    const handleChange = (e) => {
          const value = e.target.value;
          setText(value);
    }

    const handleClickReply = (i) => {
        setMessageToReplyIndex((prev) => {
            if(prev === i) {
                setDisplayMessageToReply(false);
                setMessageToReply('');
                return '';
            }
            setText('');
            return i;
        })
    }

    const handleReply = (i) => {
        console.log(messages[i]);
        if(messageToReplyIndex === '') {
            setDisplayMessageToReply(false);
            setMessageToReply('');
            setText('');
            return;
        }
        setDisplayMessageToReply(true);
        setMessageToReply(messages[messageToReplyIndex].milliseconds);
        inputText.current.focus()
    }

    const handleCheck = (i) => {
        setMessages((prev) => {
            /* console.log(prev); */
            const youAlreadyChecked = prev[i].checked.some(prom => prom === usernameLoggedIn);
            if(youAlreadyChecked) {
                const indexUsername = prev[i].checked.findIndex((prom) => prom === usernameLoggedIn);
                prev[i].checked.splice(indexUsername, 1);
                const payload = {
                    date: messages[i].milliseconds,
                    checked: prev[i].checked,
                    _id: messages[i]._id
                }
                console.log(payload)
                socket.emit('check', payload);
                soundPlay(soundUncheck);
                return [...prev];
            }

            prev[i].checked.push(usernameLoggedIn);
            const updatedChecked = prev[i].checked;

            const payload = {
                date: messages[i].milliseconds,
                checked: updatedChecked,
                _id: messages[i]._id
            }
            console.log(payload)
            socket.emit('check', payload);
            soundPlay(soundCheck);
            return [...prev];
        })
    }

    useEffect(prom => handleReply(), [messageToReplyIndex]);
    useEffect(prom => setUsernameLoggedIn(localStorage.getItem('loggedUsername')), []);
    useEffect(() => {
        setShowOverlay(roomAlreadyCreatedByAnotherSocket);
        setOverlayMessage('You have already connected to the chat server. Close connected tab and reload this page')
    }, [roomAlreadyCreatedByAnotherSocket])

    useEffect(() => {
        
        setConnectedChat(socket.connected);

        socket.on('disconnect', () => {
            setConnectedChat(socket.connected);
        })
        socket.on('connect', () => {
            setConnectedChat(socket.connected);
        })

        socket.emit('requestMessagesDB');

        socket.on('message', (payload) => {
            console.log(chatMessages.current);
            soundPlay(soundReceiveMessage);
            setMessages((prev) => {
                return [...prev, payload ]
            })
            chatMessages.current.scrollTop = 1000000;
        })
        socket.on('check', (payload) => {
            setMessages((prev) => {
                const {date, checked} = payload;
                /* console.log(date + " " + checked) */
                const mappedMessages = prev.map((prom) => {
                    if(prom.milliseconds === date) {
                        prom.checked = checked;
                    }
                    return prom
                })
                return mappedMessages;
            })
        })
        socket.on('messagesDB', (messagesDB) => {
            setMessages(messagesDB);
            chatMessages.current.scrollTop = 1000000;
        })
    
        return () => {
            socket.removeListener('message');
            socket.removeListener('check');
            socket.removeListener('messagesDB');
        }
    }, [])

/*     useEffect(() => {
       roomsCall.some(prom => )
    }, [roomsCall]) */

    return (
        <div
            className="chat"
            style = {{background: connectedChat? 'green' : 'black'}}
        >
            <div 
                className = "chat-overlay" 
                style = {{display: showOverlay? 'block' : 'none'}}
            >
                <div className = "overlay-message" >{overlayMessage}</div>
            </div>
            <Call
                callee = {callee}
                makeCall = {makeCall}
                setMakeCall = {setMakeCall}
                connectedCall = {connectedCall}
                setConnectedCall = {setConnectedCall}
                roomAlreadyCreatedByAnotherSocket = {roomAlreadyCreatedByAnotherSocket}
                setRoomAlreadyCreatedByAnotherSocket = {setRoomAlreadyCreatedByAnotherSocket} 
                setShowOverlay = {setShowOverlay}
                overlayMessage = {overlayMessage}
                setOverlayMessage = {setOverlayMessage}                 
            />
            <div className = "chat-rooms">
                <input
                    type ="text"
                    className = "room-input"
                    value = {roomInput}
                    onChange = {(e) => setRoomInput(e.target.value)}
                    onKeyPress = {(e) => {
                        if(e.code === 'NumpadEnter' || e.code === 'Enter')
                            addRoom()
                    }}
                >
                </input>
                <button
                    className = "add-room"
                    onClick = {addRoom}
                >
                    Add room
                </button>
                <div>{rooms.map((prom, i) => 
                    <div
                        key = {i}
                        className = {`room ${i === activeRoom? 'active-room' : ''}`}
                        onClick = {() => handleClickRoom(i)}
                    >
                    {prom}
                    </div>
                )}</div>
            </div>
            <div
                className = "chat-messages"
                ref = {chatMessages}
            >
                {messages && messages.map((msg, i) => {
                    let messageToReplyFound;
                    if(msg.messageToReply) {
                        messageToReplyFound = messages.find((prom) => prom.milliseconds === msg.messageToReply)
                    }
                    return (
                        <div className ={`one-message ${msg.username === usernameLoggedIn? 'my-message' : 'their-message'}`} key = {i}>
                            {msg.username === usernameLoggedIn? 
                                '' 
                                    : 
                                <div 
                                    className = "chat-image"
                                >
                                    {profileImgURLSmall === 'generic'? 
                                        <i className="fas fa-user"></i> 
                                        : 
                                        <img src = {msg.profileImgURLSmall}></img>}
                                    <div 
                                        className="light"
                                        style = {{display: roomsCall.some(prom => prom === msg.username)? 'block' : 'none'}}
                                    ></div>
                                    <div 
                                        className = "chat-profile"
                                    >
                                        <div className = "chat-profile-content">
                                            {profileImgURLLarge === 'generic'? 
                                                <i className="fas fa-user"></i> 
                                                : 
                                                <img src = {msg.profileImgURLLarge}></img>}
                                            <div className = "chat-profile-name">{msg.username}</div>
                                            <div className = "call-icons">
                                                <div className = "audio-icon">
                                                    {roomsCall.some(prom => prom === msg.username)?

                                                        <i 
                                                            className="fas fa-phone-alt"                                                           
                                                            onClick = {() => {
                                                                if(makeCall.start === true) {return}
                                                                handleClickCall(msg.username, 'audio');
                                                            }}
                                                        ></i>
                                                        :
                                                        <i className="fas fa-phone-slash"></i>
                                                    }
                                                </div>
                                                <div className = "video-icon">
                                                    {roomsCall.some(prom => prom === msg.username)?
                                                    
                                                        <i 
                                                            className="fas fa-video"
                                                            onClick = {() => {
                                                                if(makeCall.start === true) {return}
                                                                handleClickCall(msg.username, 'video');
                                                            }}
                                                        ></i>
                                                        :
                                                        <i className="fas fa-phone-slash"></i>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                            <div
                                key = {i}
                                className = "one-message-content"
                            >       <div 
                                        className = "message-replied"
                                        style = {{display: messageToReplyFound? 'block' : 'none'}}
                                    >
                                        <div className = "message-replied-username">
                                            <i className="fas fa-reply"></i>
                                            {messageToReplyFound && messageToReplyFound.username}
                                        </div>
                                        <div className = "message-replied-text">
                                            {messageToReplyFound && shortenSentence( messageToReplyFound.text, 30)}
                                        </div>
                                    </div>
                                    {msg.username === usernameLoggedIn? 
                                        ''
                                        :
                                        <div className = "chat-username">{msg.username}</div>                                        
                                    }
                                    <div 
                                        className = "one-message-text"
                                    >{msg.text}
                                    </div>
                                    <div className = "date-reply">
                                        <div 
                                            className = "date"
                                        >
                                            {dateFormat(msg.milliseconds, /* 'month', 'dayMonth', 'year', 'comma',  */'clock')}
                                        </div>
                                        <div className = "reply">
                                            <i 
                                                className= {`fas fa-reply ${displayMessageToReply && i === messageToReplyIndex? 'active' : ''}`}
                                                onClick = {() => handleClickReply(i)}
                                            ></i>
                                        </div>
                                    </div>

                                   
                            </div>
                            <div className="check">
                                <div 
                                    className = "check-count"
                                    style = {{display: msg.checked.length > 0? 'block' : 'none'}}
                                >{msg.checked.length}
                                </div>
                                <i 
                                    className= {`fas fa-check-double ${msg.checked.length > 0? 'checked' : 'notChecked'}`}
                                    onClick = {() => handleCheck(i)}
                                >

                                </i>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className = "chat-write">
                <div 
                    className = "messageToReply"
                    style = {{display: displayMessageToReply? 'block' : 'none'}}
                >
                    <span>Reply to: {messageToReply && messageToReply.username} </span> <span>{shortenSentence(messageToReply && messageToReply.text, 25)}</span>
                </div>
                <input
                    type = "text"
                    className = "chat-input"
                    ref = {inputText}
                    value = {text}
                    onChange = {handleChange}
                    onKeyPress = {(e) => sendMessagePress(e)}
                ></input>
                <button
                    className = "chat-send"
                    onClick = {() => sendMessageClick()}
                >Pošalji
                </button>
            </div>
        </div>        
    );
}