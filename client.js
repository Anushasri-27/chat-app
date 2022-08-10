const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3');

//emit an event
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }

}

//to take input from user
const name = prompt("Enter your name to join");

socket.emit('new-user-joined', name);

//when a new user joins the chat
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'left')
});



form.addEventListener('submit', (e) => {
    e.preventDefault(); //prevent your page from reloding again and again
    const message = messageInput.value;
    append(`you: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value =' ';
});


socket.on('receive', data => {
    append(`${data.name} : ${data.message}`,'left')
});

//listen to leave event
socket.on('left', name => {
    append(`${name} left the chat `, 'left')
})