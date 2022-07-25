let localStream;
let remoteStream;
let peerConnection;
// let app_id = "";

// let token = null;
// let uid = String(Math.floor(Math.random * 10000));
// let client;
// let channel;

const server = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

let init = async () => {
  // agoraRTM
  //   client = await AgoraRTM.createInstance(app_id);
  //   await client.login({ uid, token });
  //   channel = client.createChannel("main");
  //   await channel.join();
  //   channel.on("MemberJoined", handleUserJoined);

  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  document.getElementById("user-1").srcObject = localStream;
};

function handleUserJoined() {
  console.log("new user Joined");
}

let createOffer = async () => {
  peerConnection = new RTCPeerConnection(server);
  remoteStream = new MediaStream();
  document.getElementById("user-2").srcObject = remoteStream;

  // local tracks added to peer connection
  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  // when remote peer add track and adding to localStream
  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      localStream.addTrack(track);
    });
  };

  // ICECandidata,   tigger once peerConnection.setLocalDescription is set up
  peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
      console.log("NEW ICECandidate:", event.candidate);
    }
  };

  /* Initiates the creation of an SDP offer for the purpose of starting a new WebRTC connection to a remote peer */
  let offer = await peerConnection.createOffer();
  /* once offer is create and setLocalDescription is created, 
   request will be made to a stun server and ICECandidate will be created, 
   simply trigger peerConnectino.onicecandidate */
  await peerConnection.setLocalDescription(offer);
};

init();
