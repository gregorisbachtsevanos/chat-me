const socket = io()
const form = document.querySelector('#form')
const input = document.querySelector('#input')
const messages = document.querySelector('#messages')
const messageTemplate = document.querySelector('#messageTemplate')

socket.on("connect", () => {
    console.log(socket.id);
});
socket.on('message', msg => {
    console.log(msg)
    // const html = Mustache.render(messageTemplate, { msg })
    // messages.insertAdjacentHTML('beforeend', html)
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let msg = input.value
    input.value = ''
    socket.emit('sendMsg', msg)
})