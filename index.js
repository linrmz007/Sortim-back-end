'use strict';
//express
const express = require('express');
const app = express();
//socketIO
const Server = require('http').Server;
const server = Server(app);
const io = require('socket.io')(server);
const socketEvents = require('./socketEvents');
//express
const bodyParser = require('body-parser');
const router = require('./router');
const cors = require('cors');
require('./db');
const corsOptions = {origin:'http://localhost:3000'};

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors(corsOptions))
app.use(router);

socketEvents(io);
app.listen(3001, function () {
    console.log('server running at localhost:3001');
  })
