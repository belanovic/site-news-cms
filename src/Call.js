import React, { useContext, useEffect, useState, useRef } from 'react';
import './style/call.css';
import {context} from './newsContext';
import HOST_CALL from './hostCall.js';
import CallTimer from './CallTimer.js';

import io from 'socket.io-client';
const socket = io(HOST_CALL);
 

const iceServers = [  
    {urls: "stun:stun.services.mozilla.org"},
    {urls: "stun:stun.l.google.com:19302"}
  ]

const getVideo = async (video, streamConstraints) => {
    console.log(streamConstraints)
    try {
        const stream = await navigator.mediaDevices.getUserMedia(streamConstraints);
        localStream = stream;
        video.current.srcObject = stream;
        return true;
    } catch(err) {
        console.log("An error has happened" + err);
        return false;
    }
}

function stopVideo(video) {
    const stream = video.current.srcObject;
    const tracks = stream.getTracks();
    
    tracks.forEach(function(track) {
        track.stop();
    });
    video.current.srcObject = null;
}

var streamConstraints;

var callPhase = 'notInCall';
var isCaller = false;
var rtcPeerConnection;
var localStream;
var remoteStream;
var activeRoom;
var activeCaller;

export default function Call({
        callee, makeCall, setMakeCall, setShowOverlay,
        roomAlreadyCreated, setRoomAlreadyCreatedByAnotherSocket,
        connectedCall, setConnectedCall}) {


    const video = useRef(null);
    const remoteVideo = useRef(null);

    const {roomsCall, setRoomsCall} = useContext(context);
    const [showCall, setShowCall] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [showDisconnect, setShowDisconnect] = useState(false);
    const [showCallee, setShowCallee] = useState(false);
    const [showCaller, setShowCaller] = useState(false);
    const [talker, setTalker] = useState('');
    const [showTalker, setShowTalker] = useState(false);
    const [showTimer, setShowTimer] = useState(false);

    const connect = () => {
        socket.emit('join', callee);
    }
    const handleDisconnect = (event) => {
        socket.emit(event, activeRoom);
    }
    const handleAccept = () => {
        socket.emit('accept', activeRoom);
    }
    const handleReject = () => {
        socket.emit('reject', activeRoom);
    }
    
    const onAddStream = (event) => {
        remoteVideo.current.srcObject = event.streams[0];
        remoteStream = event.streams[0];
    }

    const onIceCandidate = async (event) => {
        if(event.candidate) {
            socket.emit('candidate', {
                type: 'candidate',
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.sdpMid,
                candidate: event.candidate.candidate,
                room: activeRoom
            })
        }
    }

    useEffect(() => {
        if(makeCall.start === true) {
            streamConstraints = {
                audio: true,
                video: makeCall.type === 'video'? {
                    width: 260,
                    facingMode: "user",
                    aspectRatio: 1.5
                } : false
                /* video: makeCall.type === 'video'? true : false */
            }
            connect();
            setShowCall(true);
            setShowDisconnect(true);
            setShowCallee(true);
            activeCaller = localStorage.getItem('loggedUsername');
        }
    }, [makeCall])

    useEffect(() => {

        setConnectedCall(socket.connected);

        socket.emit('create', localStorage.getItem('loggedUsername'));

        socket.on('created', (room) => {setRoomAlreadyCreatedByAnotherSocket(false)});

        socket.on('roomAlreadyCreatedByThisSocket', (room) => {
            setRoomAlreadyCreatedByAnotherSocket(false);
        })
        socket.on('roomAlreadyCreatedByAnotherSocket', (room) => {
            setRoomAlreadyCreatedByAnotherSocket(true);
        })
        socket.on('disconnect', () => {
            setConnectedCall(socket.connected);
        })
        socket.on('connect', () => {
            setConnectedCall(socket.connected);
            socket.emit('create', localStorage.getItem('loggedUsername'));
        })
        
        socket.on('roomIsBusy', (room) => {
            setShowCall(false);
            setShowDisconnect(false);
            setShowCallee(false);
            activeCaller = '';
            setMakeCall((prev) => {
                return {...prev, start: false}
            });
            /* setShowOverlay(true) */
            alert(room + ' ' + 'is busy at the moment');
        })

        socket.on('reloadUsers', (roomsActive) => {
            setRoomsCall([...roomsActive])
        })

        socket.on('joined', async (room) => {
            activeRoom = room;
            callPhase = 'joinedRoom';
            const hasVideo = await getVideo(video, streamConstraints);
            if(!hasVideo) {
                socket.emit('leaveRoom', activeRoom);
                setShowCall(false);
                setShowDisconnect(false);
                setShowCallee(false);
                activeCaller = '';
                activeRoom = '';
                callPhase = 'notInCall';
                setMakeCall((prev) => {
                    return {...prev, start: false}
                });
                alert("Couldn't get your media");
            } else {
                setTalker(room);
                isCaller = true;
                socket.emit('calling', activeRoom, activeCaller, streamConstraints);
            }
           
        })
        socket.on('calling', (room, caller, constraints) => {
            
            callPhase = 'calling';
            if(!isCaller) {
                streamConstraints = constraints;
                activeRoom = room;
                activeCaller = caller;
                setTalker(caller);
                setShowCall(true);
                setShowAnswer(true);
                setShowCaller(true);
            }
        })
        socket.on('rejectToCaller', (room) => {
            setMakeCall((prev) => {
                return {...prev, start: false}
            });
            stopVideo(video);
            isCaller = false;
            setShowDisconnect(false);
            setShowCaller(false);
            setTalker('');
            setShowCallee(false);
            setShowCall(false);
            socket.emit('leaveRoom', activeRoom);
        })
        socket.on('rejectToCallee', (room) => {
            setShowCall(false);
            setShowAnswer(false);
            setTalker('');
        })
        socket.on('accept', async (room) => {
            await getVideo(video, streamConstraints);
            
            setShowAnswer(false);
            setShowCaller(false);

            socket.emit('ready', room);
        })

        socket.on('oneDisconnected', (userDisconnected) => {
            if(callPhase !== 'notInCall' && (userDisconnected === activeCaller || userDisconnected === activeRoom)) {
                setMakeCall((prev) => {
                    return {...prev, start: false}
                });
                setShowCall(false);
                setShowAnswer(false);
                setShowCaller(false);
                setTalker('');
                
                if(callPhase === 'inCall') {
                    setShowDisconnect(false);
                    stopVideo(remoteVideo);
                    stopVideo(video);
                    setShowTimer(false);
                    setShowTalker(false);
                }
                socket.emit('leaveRoom', activeRoom);
                activeRoom = '';
                activeCaller = '';
                callPhase = 'notInCall';
                alert('Caller was disconnected');
            }
        })

        socket.on('abort', (room) => {
            if(isCaller) {
                stopVideo(video);
                setMakeCall((prev) => {
                    return {...prev, start: false}
                });
                setShowDisconnect(false);
                setShowCall(false);
                setShowCallee(false);
                socket.emit('leaveRoom', activeRoom);
                isCaller = false;
            } else {
                setShowDisconnect(false);
                setShowCaller(false);
                setShowCall(false);
                setShowAnswer(false);
            }
            callPhase = 'notInCall';
        })

        socket.on('endTalk', (room) => {

            rtcPeerConnection.close();
            stopVideo(remoteVideo);
            stopVideo(video);
            
            setShowTimer(false);
            setShowDisconnect(false);
            setShowCall(false);
            setShowTalker(false);
            
            if(isCaller) {
                setMakeCall((prev) => {
                    return {...prev, start: false}
                });
                setShowCallee(false);
                socket.emit('leaveRoom', activeRoom);
                isCaller = false;
            } else {
                setShowCaller(false);
                setShowAnswer(false);
            }
            callPhase = 'notInCall';
        })

        socket.on('ready', async (event) => {
            callPhase = 'creatingConnection';
            if(isCaller) {
                rtcPeerConnection = new RTCPeerConnection(iceServers);
                rtcPeerConnection.onicecandidate = onIceCandidate;
                rtcPeerConnection.ontrack = onAddStream;
                if(streamConstraints.video === false) {
                    rtcPeerConnection.addTrack(localStream.getTracks()[0], localStream);
                } else if(streamConstraints.video !== false) {
                    rtcPeerConnection.addTrack(localStream.getTracks()[0], localStream);
                    rtcPeerConnection.addTrack(localStream.getTracks()[1], localStream)
                }
                try {
                    const sessionDescription = await rtcPeerConnection.createOffer();
                    rtcPeerConnection.setLocalDescription(sessionDescription);
  

                    socket.emit('offer', {
                        type: 'offer',
                        sdp: sessionDescription,
                        room: activeRoom
                    })
                } catch (err) {
                    console.log(err)
                }
            }
        })
        socket.on('offer', async (event) => {
            callPhase = 'creatingConnection';
            if(!isCaller) {
                rtcPeerConnection = new RTCPeerConnection(iceServers);
                rtcPeerConnection.onicecandidate = onIceCandidate;
                rtcPeerConnection.ontrack = onAddStream;
                
                rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event));
                console.log(streamConstraints + 'pre getUserMedia');
                localStream = await navigator.mediaDevices.getUserMedia(streamConstraints);
                console.log(streamConstraints + 'posle getUserMedia');
                if(streamConstraints.video === false) {
                    rtcPeerConnection.addTrack(localStream.getTracks()[0], localStream);
                } else if(streamConstraints.video !== false) {
                    rtcPeerConnection.addTrack(localStream.getTracks()[0], localStream);
                    rtcPeerConnection.addTrack(localStream.getTracks()[1], localStream)
                }

                try {
                    const sessionDescription = await rtcPeerConnection.createAnswer();
                    rtcPeerConnection.setLocalDescription(sessionDescription);
                    socket.emit('answer', {
                        type: 'answer',
                        sdp: sessionDescription,
                        room: activeRoom
                    })
                    setShowCaller(false);
                    setShowTalker(true);
                    setShowTimer(true);
                    setShowDisconnect(true);
                    callPhase = 'inCall';
    
                } catch (err) {
                    console.log(err)
                }
            }
        })
        socket.on('answer', (event) => {
            rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event));
            setShowCallee(false);
            setShowTalker(true);
            setShowTimer(true);
            
            callPhase = 'inCall';
        })
        socket.on('candidate', (event) => {
            const candidate = new RTCIceCandidate({
                sdpMLineIndex: event.label,
                candidate: event.candidate
            })
            rtcPeerConnection.addIceCandidate(candidate)
        })
        
        /* return () => {
            socket.removeListener('created');
            socket.removeListener('joined');
        }; */
    }, [])

    return (
        <div
          className="call"
          style = {{
              display: showCall? 'block' : 'none'
            }}
        >
            <div  className="call-display">
                <div
                    className = "calling-callee" 
                    style = {{display: showCallee? 'flex' : 'none'}}
                >
                    <div 
                        className = "callee-name"
                    >Calling {callee}...
                    </div>
                </div>
                <div
                    className = "calling-caller" 
                    style = {{display: showCaller? 'flex' : 'none'}}
                >
                    <div 
                        className = "caller-name"
                    >{activeCaller} is calling...
                    </div>
                </div>

                <div 
                    className = "talker"
                    style = {{display: showTalker? 'flex' : 'none'}}
                >
                    <div className = "talker-caption">{talker}</div>
                </div>
                
                <div className = "call-duration">{showTimer? <CallTimer /> : ''}</div>

                <div 
                    className = "disconnect"
                    style = {{display: showDisconnect? 'block' : 'none'}}
                > 
                    <div 
                        className = "disconnect-button"
                        onClick = {() => {
                            let event;
                            if(callPhase === 'joinedRoom') return;
                            if(callPhase === 'calling') {event = 'abort'}
                            if(callPhase === 'inCall') {event = 'endTalk'}
                            handleDisconnect(event);
                        }}
                    >
                        <i  className = "fas fa-phone-slash"></i>
                    </div>
                    <div className = "disconnect-caption" >Disconnect</div>
                </div>
                
                <div 
                    className = "call-answer"
                    style = {{display: showAnswer? 'flex' : 'none'}}
                >
                    <div 
                        className = "accept"
                    >
                        <div  
                            className = "accept-button"
                            onClick = {() => handleAccept()}
                        >
                            <i className = "fas fa-phone"></i>
                        </div>
                        <div className = "accept-caption" >Accept</div>
                    </div>

                    <div 
                        className = "reject"
                        onClick = {() => handleReject()}
                    >
                        <div className = "reject-button">
                            <i className = "fas fa-phone-slash"></i>
                        </div>
                        <div className = "reject-caption" >Reject</div>
                    </div>
                    
                </div>

            </div>
  
            <div className = "video-container">
                <video 
                    ref = {video}
                    muted = {true} 
                    className="video local-video"
                    onLoadedMetadata = {() => video.current.play()}
                >
                </video>
                <video
                    ref = {remoteVideo}
                    className="video remote-video"
                    onLoadedMetadata = {() => remoteVideo.current.play()}
                    muted = {true} 
                >
                </video>
                {/* <audio
                    className="video remote-video"
                    onLoadedMetadata = {() => remoteVideo.current.play()}
                >
                </audio> */}
            </div>
        </div>
    );
}