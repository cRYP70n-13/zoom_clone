const socket = io('/');
const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video');
myVideo.muted = true

const peer = new Peer(undefined, {
	path: '/peerjs',
	host: '/',
	port: 5000
});

let myVideoStream
navigator.mediaDevices.getUserMedia({
	video: true,
	audio: true
}).then(stream => {
	myVideoStream = stream;
	addVideoStream(myVideo, stream)
})

peer.on('open', id => {
	socket.emit("join-room", ROOM_ID, id);
})


socket.on('user-connected', (userId) => {
	connectToNewUser(userId);
})

const connectToNewUser = (userId) => {
	console.log(`cRYP70N is here motherfuckers`);
}

const addVideoStream = (video, stream) => {
	video.srcObject = stream;
	video.addEventListener('loadedmetadata', () => {
		video.play();
	})
	videoGrid.append(video);
}