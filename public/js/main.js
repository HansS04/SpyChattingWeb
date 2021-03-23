const socket = io();

const login = document.getElementById('login');
const transmission = document.getElementById('transmission');
transmission.style.display = 'none';


/* Login */
/*Zde jsou vypsány konstanty s ID od jednotlivých elementů*/ 
const nickname = document.getElementById('nickname');
const sex = document.getElementById('sex');
const code = document.getElementById('passwd');
const submit = document.getElementById('submit');
/*Měnění hesla */


let m = Math.floor(Math.random() * 10);
console.log(m);
const img = document.getElementById('code');
img.src = `img/heslo${m}.png`;
let vvv;
if (m === 0){
  vvv = '5uzd5';
}
if (m === 1){
    vvv = 'b4n19';
  }
  if (m === 2){
    vvv = 'zbycn';
  }
  if (m === 3){
    vvv = 'bvnqr';
  }
  if (m === 4){
    vvv = '66feq';
  }
  if (m === 5){
    vvv = '4788f';
  }
  if (m === 6){
    vvv = 'hfhkm';
  }
  if (m === 7){
    vvv = 'xj4pr';
  }
  if (m === 8){
    vvv = '6836b';
  }
  if (m === 9){
    vvv = 'y3vfd';
  }
  if (m === 10){
    vvv = '4ehtv';
  }
 
console.log("heslo:"+ vvv)


 /* Zde je událost pro to, když se stiskne tlačítko pro přihlášení */
submit.addEventListener('click', function(event){
 event.preventDefault();
 /*Jestliže bude mít nickname a heslo nějakou hodnotu, tak je vyšlou na server */
    if (nickname.value && code.value) {
      socket.emit('login message', {'nickname': nickname.value, 'code': code.value, 'sex': sex.value, 'vvv': vvv});
      code.value = '';
    }
});
/* úprava stránky na chat */
socket.on('login message', function (msg) {
   if (msg.status === 200) {
       if (msg.nick == nickname.value) {
           login.style.display = 'none';
           transmission.style.display = '';
           document.querySelector('h1').innerText = "SpyChattingWeb";
           document.querySelector('title').innerText = nickname.value;
       }
       alert(msg.success);       
   } 
   if (msg.status === 400 && msg.nick == nickname.value) {
       alert(msg.error);
   }
});

/* Chat */

const message = document.getElementById('message');
const send = document.getElementById('send');
const chatBox = document.getElementById('chatbox');

//třída pro jednotlivé zprávy
class ChatMessage {
    constructor(message, nick='Anonymous', time='Eternity', sex='something', img='wrong') {
        this.message = message;
        this.nick = nick;
        this.time = time;
        this.sex = sex;
        this.img = img;
   }
    
   //vygeneruje to správu
    render(parent){ 
        if (this.sex === "man" || this.sex === "Man" || this.sex === "MAn" || this.sex === "MAN"){
            this.img = "man.png";
        }
        if (this.sex === "woman" || this.sex === "Woman" || this.sex === "WOman" || this.sex === "WOMan" ||this.sex === "WOMAn" || this.sex === "WOMAN"  ){
            this.img = "woman.png";
        } 
//do konzole jsem si vypsal jednotlive udaje o zpravach
     console.log("jméno: " + this.nick);
     console.log("čas zprávy: " + this.time);
     console.log("pohlaví: " + this.sex);
     console.log("avatar: " + this.img);
     console.log("");
     console.log("Dalsi zprava");

     
            //vytvoření jednotlivých zpráv v Id chetboxu
            let mes  = `
            <div class="media" >
                <img src="img/avatar-${this.img}" alt="${this.nick}" class="mr-3 mt-3 rounded-circle" style="width:60px;">
                <div class="media-body">
                <h4>${this.nick} <i id='time'>Send: ${this.time}</i></h4>
                <p>${this.message}</p>
                </div>
            </div>`;
            parent.innerHTML += mes;
   
    }
    
}

send.addEventListener('click', function(e){
    e.preventDefault();
    if (message.value) {
      socket.emit('chat message', {'message': message.value, 'nick': nickname.value, 'sex':sex.value , 'vvv':vvv, 'code': code.value,});
      message.value = '';
    }
});

//
socket.on('chat message', function (msg) {
    let chatMessage = new ChatMessage(msg.message, msg.nick, msg.time, msg.sex, msg.img);
    chatMessage.render(chatBox);
  
});



