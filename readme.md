websocket is peer <-> server <-> peer, chat, messaging

webrtc is peer to peer , UDP, Good for audio video transfer

SDP- session description protocol

- it describe codec information, media type, audio type, sessoin connection

ICE-Candidata

- ice candidate is public ip address and port
- STUN(Session Traversal Utilities for NAT.) server provides ice candidates
- peer to peer connection are established by stern/stun server

sdp offer, icecandidate create and sent to the other peer, once receving by other peer sdp answer, icecandidate is returned


