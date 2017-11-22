const modelInvite = require('./models/modelInvite');

let savedSocket;
const rooms = {};

module.exports = (io) => {
  io.on('connection', (socket) => {
   console.log('User connecting…');
    socket.on('SOCKET__CONNECT', (data) => { //a
      const roomId = modelInvite.createId(data.ourId, data.theirId, data.eventId);
      let room = rooms[roomId]
      if(!room) {
        console.log('Creating room with id', roomId);
        rooms[roomId] = {
          sockets: new Set([socket])
        }
      } else {
        rooms[roomId].sockets.add(socket)
      }
      console.log('User joined room', roomId);
    })

    socket.on('SEND_MESSAGE', async (data) => { //a
      console.log('MESSAGE', data);
      // console.log('Emitting Polo…');

      const roomId = modelInvite.createId(data.room.ourId, data.room.theirId, data.room.eventId);
      let room = rooms[roomId]
      if(!room) {
        // Send error
      } else {
        const otherSocket = Array.from(room.sockets).find(el => el !== socket);
        console.log(otherSocket);
        otherSocket.emit('ACTION', {
          type: 'MESSAGE_RECEIVED',
          data
        })
      }
    })

     // setInterval(() => {
     //   console.log('Emitting Marco…');
     //   socket.emit('ACTION', {
     //     type: 'SET_NEW_DATE',
     //     data: {
     //       time: new Date()
     //     }
     //   });
     // }, 1000);
     socket.on('GET_MESSAGE', async (data) => {
       console.log('GET-MSG', data);
       socket.emit('ACTION', {
         type: 'GET_MESSAGE',
          message: {
            msg: data,
          }
       })
     })
  })
}
