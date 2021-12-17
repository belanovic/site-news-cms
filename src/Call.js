import React, { useContext, useEffect, useState, useRef } from 'react';
import './style/call.css';
import {context} from './newsContext';
import HOST_CALL from './hostCall.js';

import io from 'socket.io-client';
const socket = io(HOST_CALL);
socket.emit('create', localStorage.getItem('loggedUsername'));

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
        /* setLocalStream(stream); */
        localStream = stream;
        video.current.srcObject = stream;
    } catch(err) {
        console.log("An error haaaaaaaaaaaaaaaaaaaaaaaaas happened" + err);
    }
}

var isCaller = false;
var rtcPeerConnection;
var localStream;
var remoteStream;
var activeRoom;
var caller;

export default function Call({
        callee, showCall, setShowCall, 
        makeCall, setMakeCall}) {
    
    
    const video = useRef(null);
    const remoteVideo = useRef(null);

    const {usersOnline, setUsersOnline} = useContext(context);
    const [showAnswer, setShowAnswer] = useState(false);

    const connect = () => {
        socket.emit('join', callee);
    }
    const handleEnd = () => {
        socket.emit('end', callee);
    }

    const handleAnswer = () => {
        socket.emit('accept', caller);
    }
    const handleReject = () => {
        socket.emit('reject', caller);
    }
    
    const onAddStream = (event) => {
        remoteVideo.current.srcObject = event.streams[0];
        remoteStream = event.streams[0];
        console.log('on Add stream lsdjflksdjkf sdlkfj lsdkfj ')
    }

    const onIceCandidate = (event) => {
        
        if(event.candidate) {
            console.log('evo ga kandidat')
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
        }
    }, [makeCall])

    useEffect(() => {
        
        socket.on('full', (room) => {
            alert(room + ' ' + 'is busy at the moment');
        })
        socket.on('joined', (room) => {
            getVideo(video, streamConstraints);
            console.log(room);
            /* setActiveRoom(room); */
            activeRoom = room;
            /* setIsCaller(true); */
            isCaller = true;
            socket.emit('calling', room);
        })
        socket.on('calling', (room) => {
            caller = room;
            console.log('callling...')       
            setShowCall(true);
            setShowAnswer(true);
        })
        socket.on('accept', (room) => {
            getVideo(video, streamConstraints);
            console.log(room);
            isCaller = false;
           /*  setActiveRoom(room); */
            activeRoom = room;
            socket.emit('ready', room);
        })
        socket.on('ready', async (event) => {
            console.log(isCaller)
            if(isCaller) {
                console.log('evo me meemmem ready')
                rtcPeerConnection = new RTCPeerConnection(iceServers);
                rtcPeerConnection.onicecandidate = onIceCandidate;
                rtcPeerConnection.ontrack = onAddStream;
                console.log('lokalni strim ' + localStream);
          
                rtcPeerConnection.addTrack(localStream.getTracks()[0], localStream);
                /* rtcPeerConnection.addTrack(localStream.getTracks()[1], localStream) */
                try {
                    const sessionDescription = await rtcPeerConnection.createOffer();
                    console.log(sessionDescription)
                    rtcPeerConnection.setLocalDescription(sessionDescription);
                    console.log('evo me opoet sldkjflkasjdf lsadfj ')

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
            console.log('evo me on offer')
            if(!isCaller) {
                console.log('evo me meemmem offer')
                rtcPeerConnection = new RTCPeerConnection(iceServers);
                rtcPeerConnection.onicecandidate = onIceCandidate;
                rtcPeerConnection.ontrack = onAddStream;
                console.log('lokalni strim ' + localStream);
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
                } catch (err) {
                    console.log(err)
                }
            }
        })
        socket.on('answer', (event) => {
            console.log('evo me on answer')
            rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event));
        })
        socket.on('candidate', (event) => {
            const candidate = new RTCIceCandidate({
                sdpMLineIndex: event.label,
                candidate: event.candidate
            })
            rtcPeerConnection.addIceCandidate(candidate)
            console.log('evo me on candidate')
        })
        socket.on('end', (room) => {
             rtcPeerConnection.close();
             stopVideo(video);
             stopVideo(remoteVideo);
        })
        socket.on('reject', (room) => {
            socket.emit('leaveRoom', activeRoom);
            stopVideo(video);
        })
        socket.on('reloadUsers', (usersServer) => {
            console.log(usersServer)
            setUsersOnline([...usersServer])
        })
        socket.on('leftCall', (usersServer) => {
            setUsersOnline([...usersServer])
        })

        
       /*  socket.on('end', (room) => {
             rtcPeerConnection.close();
        }) */
        return () => {
            socket.removeListener('created');
            socket.removeListener('joined');
            socket.removeListener('full');
            
            socket.emit('leaveRoom', activeRoom);
        };
    }, [])

    return (
        <div
          className="call-test"
          style = {{display: showCall? 'block' : 'none'}}
        >
            <div  className="call-rooms">
                <div className = "callee">Calling {callee}</div>
                <div 
                    className = "call-answer"
                    style = {{display: showAnswer? 'block' : 'none'}}
                >
                        <button 
                            className = "answer-button"
                            onClick = {() => handleAnswer()}
                        >Answer
                        </button>
                        <button 
                            className = "reject-button"
                            onClick = {() => handleReject()}
                        >Reject
                        </button>
                </div>
                <button onClick = {() => handleEnd()}>Disconnect</button>
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