const express = require('express');
const app = express();



const port = process.env.PORT || 3000

app.use(express.static('public'))

const server = app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})


// import socket.io
let io = require('socket.io')(server)

io.on('connection',(socket)=>{
    console.log(`New Connection: ${socket.id}`)
    // Recieve Event from app.js
    socket.on('comment',(data)=>{
        // console.log(data)
        data.time = Date()
        socket.broadcast.emit('comment', data)
    })
    

    socket.on('typing', (data) =>{
        socket.broadcast.emit('typing', data)
    })
})












