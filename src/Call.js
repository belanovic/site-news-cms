import React, { useContext, useEffect, useState, useRef } from 'react';
import './style/call.css';
import {context} from './newsContext';
import HOST_CALL from './hostCall.js';

import io from 'socket.io-client';
const socket = io(HOST_CALL);


const iceServers = [  
    {urls: "stun:stun.services.mozilla.org"},
    {urls: "stun:stun.l.google.com:19302"}
  ]

const streamConstraints = {  
    video: true,
    audio: false,
    /* video: {
        width: 260,
        facingMode: "user"
    } */ 
}

function stopVideo(video) {
    const stream = video.current.srcObject;
    const tracks = stream.getTracks();
    
    tracks.forEach(function(track) {
        track.stop();
    });
    video.current.srcObject = null;
    }

const getVideo = async (video, streamConstraints) => {
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

var callPhase = 'notInCall';
var isCaller = false;
var rtcPeerConnection;
var localStream;
var remoteStream;
var activeRoom;
var activeCaller;

export default function Call({
        callee, makeCall, setMakeCall, anotherSocketAlreadyInRoom, setAnotherSocketAlreadyInRoom,
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
        if(makeCall === true) {
            connect();
            setShowCall(true);
            setShowDisconnect(true);
            setShowCallee(true);
            activeCaller = localStorage.getItem('loggedUsername');
        }
    }, [makeCall])

    useEffect(() => {

        setConnectedCall(socket.connected);

        socket.emit('create', localStorage.getItem('loggedUsername'))

        socket.on('created', (room) => {setAnotherSocketAlreadyInRoom(false)});

        socket.on('socketAlreadyInRoom', (room) => {
            setAnotherSocketAlreadyInRoom(false);
        })
        socket.on('anotherSocketAlreadyInRoom', (room) => {
            setAnotherSocketAlreadyInRoom(true);
        })

        socket.on('disconnect', () => {
            setConnectedCall(socket.connected);
        })
        socket.on('connect', () => {
            setConnectedCall(socket.connected);
            socket.emit('create', localStorage.getItem('loggedUsername'));
        })
        
        socket.on('roomIsBusy', (room) => {
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
                setMakeCall(false);
                alert("Couldn't get your media");
            } else {
                setTalker(room);
                isCaller = true;
                socket.emit('calling', activeRoom, activeCaller);
            }
           
        })
        socket.on('calling', (room, caller) => {
            callPhase = 'calling';
            if(!isCaller) {
                activeRoom = room;
                activeCaller = caller;
                setTalker(caller);
                setShowCall(true);
                setShowAnswer(true);
                setShowCaller(true);
            }
        })
        socket.on('rejectToCaller', (room) => {
            setMakeCall(false);
            stopVideo(video);
            setShowDisconnect(false);
            setShowCaller(false);
            setShowCall(false);
            socket.emit('leaveRoom', activeRoom);
        })
        socket.on('rejectToCallee', (room) => {
            setShowCall(false);
            setShowAnswer(false);
            setShowCaller(true);
        })
        socket.on('accept', async (room) => {
            await getVideo(video, streamConstraints);
            setShowDisconnect(true);
            setShowAnswer(false);
            socket.emit('ready', room);
        })

        socket.on('oneDisconnected', (userDisconnected) => {

            if(callPhase !== 'notInCall' && userDisconnected === activeCaller) {
                activeRoom = '';
                activeCaller = '';
                setTalker('');
                setShowCall(false);
                setShowAnswer(false);
                setShowCaller(false);
 
                if(callPhase === 'inCall') {
                    setShowDisconnect(false);
                    stopVideo(remoteVideo);
                    stopVideo(video);
                }
                callPhase = 'notInCall';
                alert('Caller was disconnected');
            }
        })

        socket.on('abort', (room) => {
            if(isCaller) {
                stopVideo(video);
                setMakeCall(false);
                setShowDisconnect(false);
                setShowCall(false);
                socket.emit('leaveRoom', activeRoom);
                isCaller = false;
            } else {
                setShowDisconnect(false);
                setShowCaller(false);
                setShowCall(false);
            }
            callPhase = 'notInCall';
        })

        socket.on('endTalk', (room) => {

            rtcPeerConnection.close();
            stopVideo(remoteVideo);
            stopVideo(video);

            if(isCaller) {
                setMakeCall(false);
                setShowDisconnect(false);
                setShowCall(false);
                socket.emit('leaveRoom', activeRoom);
                isCaller = false;
            } else {
                setShowDisconnect(false);
                setShowCaller(false);
                setShowCall(false);
            }
            callPhase = 'notInCall';
        })

        socket.on('ready', async (event) => {
            callPhase = 'creatingConnection';
            if(isCaller) {
                rtcPeerConnection = new RTCPeerConnection(iceServers);
                rtcPeerConnection.onicecandidate = onIceCandidate;
                rtcPeerConnection.ontrack = onAddStream;
                rtcPeerConnection.addTrack(localStream.getTracks()[0], localStream);
                /* rtcPeerConnection.addTrack(localStream.getTracks()[1], localStream) */
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
                
                rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event))
                localStream = await navigator.mediaDevices.getUserMedia(streamConstraints);
                rtcPeerConnection.addTrack(localStream.getTracks()[0], localStream);
                /* rtcPeerConnection.addTrack(localStream.getTracks()[1], localStream); */

                try {
                    const sessionDescription = await rtcPeerConnection.createAnswer();
                    rtcPeerConnection.setLocalDescription(sessionDescription);
                    socket.emit('answer', {
                        type: 'answer',
                        sdp: sessionDescription,
                        room: activeRoom
                    })
                    callPhase = 'inCall';
    
                } catch (err) {
                    console.log(err)
                }
            }
        })
        socket.on('answer', (event) => {
            rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event));
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
                    style = {{display: showCallee? 'block' : 'none'}}
                >Calling {callee}...
                </div>
                <div 
                    className = "calling-caller"
                    style = {{display: showCaller? 'block' : 'none'}}
                >{activeCaller} is calling
                </div>

                <div className = "talker">{talker}</div>
                <div className = "duration"></div>
                <button 
                    onClick = {() => {
                        let event;
                        if(callPhase === 'joinedRoom') return;
                        if(callPhase === 'calling') {event = 'abort'}
                        if(callPhase === 'inCall') {event = 'endTalk'}
                        handleDisconnect(event);
                    }}
                    style = {{display: showDisconnect? 'block' : 'none'}}
                >Disconnect
                </button>
   
                <div 
                    className = "call-answer"
                    style = {{display: showAnswer? 'block' : 'none'}}
                >
                        <button 
                            className = "accept-button"
                            onClick = {() => handleAccept()}
                        >Answer
                        </button>
                        <button 
                            className = "reject-button"
                            onClick = {() => handleReject()}
                        >Reject
                        </button>
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