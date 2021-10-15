const socket = new WebSocket(`ws://${window.location.host}`);

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#msg");
// const nicknameForm = document.querySelector("#nickname");

socket.addEventListener("open", _ => {
     console.log("Connected to Server ✅");
})

socket.addEventListener("message", msg => {
     console.log(`New message: '${msg.data}'`);
})

socket.addEventListener("close", _ => {
     console.log("Disconnected to Server ❌");
})


const handleMsgSubmit = event => {
     event.preventDefault();
     const input = messageForm.querySelector("input");
     socket.send(input.value);
     input.value  = "";
}


messageForm.addEventListener("submit", handleMsgSubmit);
// nicknameForm.addEventListener("submit", handleNickSubmit);
