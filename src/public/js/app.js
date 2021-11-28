const socket = io(); //socket.io를 실행하는 서버를 자동 추적

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

const backendDone = msg => {
     console.log(`The backend says: ${msg}`);
}

const handleRoomSubmit = event => {
     event.preventDefault();
     const input = form.querySelector("input");
     socket.emit("enter_room", input.value, backendDone);
     input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);