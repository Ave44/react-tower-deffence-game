// const createRoom = () => {
//     const roomName = document.getElementById('create').value
//     console.log(roomName)

//     window.addEventListener("load", function (event) {
//         socket = io.connect('http://' + location.host);

//         socket.on('connect', function () {
//             console.log('Nawiązano połączenie przez Socket.IO' + roomName);
//             socket.emit("test", "czesc");
//         });
//     });
// }

window.addEventListener("load", function (event) {
    socket = io.connect('http://' + location.host);

    socket.on('connect', function (login) {
        console.log('Nawiązano połączenie przez Socket.IO');
        socket.emit("test", `Urzytkownik ${login} dołączył do czatu`);

        socket.on('test', (msg) => {
            console.log(msg)
            showMessage(msg)
        })

        socket.on('disconnect', () => {
            console.log('Urzytkownik opuścił czat')
            showMessage('Urzytkownik opuścił czat')
        });
    });
});
