const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", _ => {
     console.log("Connected to Server ✅");
})

socket.addEventListener("message", msg => {
     console.log(`New message: '${msg.data}'`);
})

socket.addEventListener("close", _ => {
     console.log("Disconnected to Server ❌");
})

setTimeout(_ => socket.send("Hello from the Browser!"), 7000);