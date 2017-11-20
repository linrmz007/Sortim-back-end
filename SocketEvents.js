module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connecting…');
    socket.on('SOCKET__CONNECT', async (data) => {
      // sockets[data.id] = socket
      // store the socket binded to the user id in some array
      console.log('User connected to socket.');
    })

    socket.on('SEND_MESSAGE', async (data) => {
      console.log('MESSAGE', data);
      // retrieve the socket for the recipient user_id and emit to it
      // sockets[data.user_id].emit()
    })

    setInterval(() => {
      console.log('Emitting marco…');
      socket.emit('ACTION', {
        type: 'SET_NEW_DATE',
        data: {
          time: new Date()
        }
      });
    }, 1000);
  })
}
