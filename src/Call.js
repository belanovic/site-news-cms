import React, { useContext, useEffect, useState, useRef } from 'react';
import './style/call.css';
import io from 'socket.io-client';
import {context} from './newsContext';
import HOST_CALL from './hostCall.js';

const socket = io(HOST_CALL);

const iceServers = [
    {urls: "stun:stun.services.mozilla.org"},
    {urls: "stun:stun.l.google.com:19302"}
  ]

const streamConstraints = {
    video: false,
    audio: true,
    /* video: {
        width: 260,
        facingMode: "user"
    } */ 
}

var isCaller = false;
var rtcPeerConnection;
var localStream;
var remoteStream;
var activeRoom;

export default function Call() {

    
    
  

    const video = useRef(null);
    const remoteVideo = useRef(null);

    /* const {activeRoom, setActiveRoom} = useContext(context); */

    const [roomInput, setRoomInput] = useState(localStorage.getItem('loggedUsername'));
    const [showAnswer, setShowAnswer] = useState(false);
    /* const [isCaller, setIsCaller] = useState(false); */
    /* const [localStream, setLocalStream] = useState(''); */
    /* const [remoteStream, setRemoteStream] = useState(''); */
    /* const [rtcPeerConnection, setRtcPeerConnection] = useState('') */

    
    const getVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(streamConstraints);
            /* setLocalStream(stream); */
            localStream = stream;
            video.current.srcObject = stream;
        } catch(err) {
            console.log("An error has happened" + err);
        }
    }

    const handleClickConnect = () => {
        if(roomInput.trim() === '') {
            alert('Enter room name');
            return;
        }
        
        socket.emit('join', roomInput);
    }
    const handleClickEnd = () => {
        socket.emit('end', roomInput);
    }

    const handleClickAnswer = () => {
        socket.emit('accept', roomInput);
    }
    const handleClickReject = () => {
        socket.emit('reject', roomInput);
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
        socket.emit('create', roomInput);
        
        socket.on('joined', (room) => {
            getVideo();
            console.log(room);
            /* setActiveRoom(room); */
            activeRoom = room;
            /* setIsCaller(true); */
            isCaller = true;
            socket.emit('calling', room);
        })
        socket.on('calling', (room) => {
            setShowAnswer(true);
        })
        socket.on('accept', (room) => {
            getVideo();
            console.log(room);
            isCaller = false;
           /*  setActiveRoom(room); */
            activeRoom = room;
            socket.emit('ready', room);
        })
        socket.on('full', (room) => {
            alert('room is full')
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
        })
        return () => {
            socket.removeListener('created');
            socket.removeListener('joined');
            socket.removeListener('full');
            
            socket.emit('leave', activeRoom);
        };
    }, [])


    return (
        <div
          className="call"
        >
            <div  className="call-rooms">
                <input
                    className="call-rooms-input"
                    value = {roomInput}
                    onChange = {(e) => setRoomInput(e.target.value)}
                    onKeyPress = {(e) => {
                        if(e.code === 'NumpadEnter' || e.code === 'Enter')
                            handleClickConnect()
                    }}
                ></input>
                <button
                    className="call-rooms-button"
                    onClick = {() => handleClickConnect()}
                >Enter room
                </button>
                <div 
                    className = "call-answer"
                    style = {{display: showAnswer? 'block' : 'none'}}
                >
                        <button 
                            className = "answer-button"
                            onClick = {() => handleClickAnswer()}
                        >Answer
                        </button>
                        <button 
                            className = "reject-button"
                            onClick = {() => handleClickReject()}
                        >Reject
                        </button>
                </div>
                <button onClick = {() => handleClickEnd()}>Disconnect</button>
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