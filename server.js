const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Nastaví statickou složku
app.use(express.static(path.join(__dirname, 'public')));

//přidávání nových uživatelů 
let users = [];

//kód, pro přihlášení 
const passwd = 'heslo';

//přihlášení
io.on('connection', (socket) => {
    socket.on('login message', req => {   
        let res = {}    

        //jestliže se bude heslo shodovat 
        if (req.code === passwd) {
            console.log(req.nickname);
            console.log(req.sex);
            users.push(req.nickname);
        
            res = {'status': 200, 'success': `New user has logged in: ${req.nickname} with sex :${req.sex}`, 'nick': req.nickname, 'sex': req.sex}
        //jestli ne    
        } else {
            res = {'status': 400, 'error': 'Invalid password', 'nick': req.nickname, 'sex': req.sex}
        }
        //
        io.emit('login message', res);
        
    });

    


//zjištění data a času
    socket.on('chat message', msg => {
      let d = new Date();  
      msg['time'] = `${d.toLocaleDateString()}, ${d.toLocaleTimeString()}`;
      io.emit('chat message', msg);
    });


  
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));