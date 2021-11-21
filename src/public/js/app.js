const socket = new WebSocket(`ws://${window.location.host}`);

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");

socket.addEventListener("open", _ => {
     console.log("Connected to Server ✅");
})

socket.addEventListener("message", msg => {
     // console.log(`New message: '${msg.data}'`);
     const li = document.createElement("li");
     li.innerText = msg.data;
     messageList.appendChild(li);
})

socket.addEventListener("close", _ => {
     console.log("Disconnected to Server ❌");
})

const makeMessage = (type, payload) => { // type: new_message or nickname
     const msg = {type, payload};
     return JSON.stringify(msg);
}

const handleMsgSubmit = event => {
     event.preventDefault();
     const input = messageForm.querySelector("input");
     socket.send(makeMessage("new_message", input.value)); // send to the socket server
     input.value  = "";
}

const handleNickSubmit = event => {
     event.preventDefault();
     const input = nickForm.querySelector("input");
     socket.send(makeMessage("nickname", input.value));
     input.value  = "";
}


messageForm.addEventListener("submit", handleMsgSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
