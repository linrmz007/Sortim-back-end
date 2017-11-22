const uuid= require('uuid/v4');

// const rooms = {
//   '12312312': {
//     users: []
//   }
// };

module.exports = (io) => {
    io.on('connection', (socket) => {
     console.log('User connecting…');
      socket.on('SOCKET__CONNECT', async (data) => {
      //let room = rooms[data.eventId]
      console.log('THIS data', data);
        console.log('User connected to socket.');
      })

     socket.on('SEND_MESSAGE', async (data) => {
       console.log('MESSAGE', data);
       console.log('Emitting Polo…');
       socket.emit('ACTION', {
         type: 'SEND_MESSAGE',
         message: {
           msg: data,
         }
       })
       // retrieve the socket for the recipient user_id and emit to it
       // sockets[data.user_id].emit()
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

  generateId = () => {
    return uuid();
  }



  // module.exports = (io) => {
  //     io.on('connection', (socket) => {
  //      console.log('User connecting…');
  //       socket.on('SOCKET__CONNECT', async (data) => { //a
  //         //let room = rooms[generateId(data.id1, data.id2, data.eventId)]
  //         //room.sockets.append(socket) // WARNING: only if socket is not there, Set?
  //         console.log('User connected to socket.');
  //       })
  //
  //      socket.on('SEND_MESSAGE', async (data) => { //a
  //        console.log('MESSAGE', data);
  //        console.log('Emitting Polo…');
  //        //rooms[].sockets.find(s => s !== socket)
  //        .emit('ACTION', {
  //          type: 'SEND_MESSAGE',
  //          message: {
  //            msg: data,
  //          }
  //        })
  //        // retrieve the socket for the recipient user_id and emit to it
  //        // sockets[data.user_id].emit()
  //      })
  //
  //        // setInterval(() => {
  //        //   console.log('Emitting Marco…');
  //        //   socket.emit('ACTION', {
  //        //     type: 'SET_NEW_DATE',
  //        //     data: {
  //        //       time: new Date()
  //        //     }
  //        //   });
  //        // }, 1000);
  //        socket.on('GET_MESSAGE', async (data) => {
  //          console.log('GET-MSG', data);
  //          socket.emit('ACTION', {
  //            type: 'GET_MESSAGE',
  //             message: {
  //               msg: data,
  //             }
  //          })
  //        })
  //     })
  //   }
