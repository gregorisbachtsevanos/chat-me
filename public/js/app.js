const socket = io()
// const form = document.querySelector('#form')
// const input = document.querySelector('#input')
// const messages = document.querySelector('#messages')
// const messageTemplate = document.querySelector('#messageTemplate')


    socket.on("connect", () => {
        socket.emit('user_connect', {user, socketId:socket.id})
    });
    
    socket.on('msg', (msg) =>{
        console.log(msg)
    })