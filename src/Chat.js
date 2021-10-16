import React, { useContext, useEffect, useState, useRef } from 'react';
import './style/chat.css';
import io from 'socket.io-client';
import {nanoid} from 'nanoid';
import {context} from './newsContext';
import dateFormat from './dateFormat';
import imageCompression from 'browser-image-compression';
import shortenSentence from './shortenSentence';
import HOST_CHAT from './hostChat.js';

const soundCheck = new Audio('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-sounds%2F590274__mrfossy__sfx-stickerripper-cluckbuttons-06.wav?alt=media&token=7e31eb83-1283-46ea-bfa3-302cba453d70')
const soundUncheck = new Audio('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-sounds%2F589940__mrfossy__sfx-squelch-slayer-impulse-72.wav?alt=media&token=95b7f193-a27b-4467-9b41-5b65a92a52d1')
const soundSendMessage = new Audio('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-sounds%2F589135__mrfossy__sfx-simplesnaps-singles-01.wav?alt=media&token=8c219a05-5cf3-4b84-9df6-6d48c17b45a5')
const soundReceiveMessage = new Audio('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-sounds%2F588847__mrfossy__sfx-monosjam-impulse-76.wav?alt=media&token=4d50d39d-e655-48b4-be7a-0cf341bac3bf')

const soundPlay = (sound) => {
      sound.play();
      sound.currentTime = 0;
}

const socket = io(HOST_CHAT);
const usernameLoggedIn = localStorage.getItem('loggedUsername');

const profileImgURLLarge = localStorage.getItem('profileImgURLLarge')
const profileImgURLSmall = localStorage.getItem('profileImgURLSmall')

export default function Chat() {

    const {loggedUser} = useContext(context);
    const chatMessages = useRef(null);
    const inputText = useRef(null);

    const [text, setText] = useState('')
    const [messages, setMessages] = useState([]);

    const [messageToReply, setMessageToReply] = useState('');
    const [messageToReplyIndex, setMessageToReplyIndex] = useState('');
    const [displayMessageToReply, setDisplayMessageToReply] = useState(false);

    const sendMessageClick = () => {
        if(text === '') return;
        const payload = {
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
        setMessageToReply(messages[messageToReplyIndex]);
        inputText.current.focus()
    }

    const handleCheck = (i) => {
        setMessages((prev) => {

            const youAlreadyChecked = prev[i].checked.some(prom => prom === usernameLoggedIn);
            if(youAlreadyChecked) {
                const indexUsername = prev[i].checked.findIndex((prom) => prom === usernameLoggedIn);
                prev[i].checked.splice(indexUsername, 1);
                const payload = {
                    date: messages[i].milliseconds,
                    checked: prev[i].checked
                }
                socket.emit('check', payload);
                soundPlay(soundUncheck);
                return [...prev];
            }

            prev[i].checked.push(usernameLoggedIn);
            const updatedChecked = prev[i].checked;

            const payload = {
                date: messages[i].milliseconds,
                checked: updatedChecked
            }
            socket.emit('check', payload);
            soundPlay(soundCheck);
            return [...prev];
        })
    }

    useEffect(prom => handleReply(), [messageToReplyIndex]);

    useEffect(() => {

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
        return () => {
            socket.removeListener('message')
        }
    }, [])

    useEffect(() => {
        chatMessages.current.scrollTop = 1000000;
    }, [messages])

    return (
        <div
            className="chat"
        >
            <div
                className = "chat-messages"
                ref = {chatMessages}
            >
                {messages && messages.map((msg, i) => {
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
                                </div>}
                            <div
                                key = {i}
                                className = "one-message-content"
                            >       <div className = "message-replied">
                                        <div className = "message-replied-username">
                                            <i className="fas fa-reply"></i>
                                            {msg.messageToReply && msg.messageToReply.username}
                                        </div>
                                        <div className = "message-replied-text">
                                            {msg.messageToReply && shortenSentence( msg.messageToReply.text, 30)}
                                        </div>
                                    </div>
                                    <div className = "chat-username">
                                        {msg.username}
                                    </div>
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