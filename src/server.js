import http from 'http';
import SocketIO from 'socket.io';
import express from 'express';

const app = express();

app.set("view engine", "pug"); // 뷰 엔진을 pug로 지정
app.set("views", __dirname + "/views"); //express에서 템플릿이 어디에 있는지 지정
app.use("/public", express.static(__dirname + "/public")); //public url를 생성해서 유저에게 파일을 공유
app.get("/" , (_, res) => res.render("home")); // home.pug를 render 해주는 route handler
app.get("/*", (_, res) => res.redirect("/"));


const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", socket => {
     // socket.onAny(event => console.log(`Socket Event: ${event}`));
     socket.on("enter_room", (roomName, done) => {
          socket.join(roomName);
          setTimeout(_ => {
               done("server is done"); //서버에서 호출하고 클라이언트에서 실행
          }, 5000);
     });
})

httpServer.listen(3000, _ => {
     console.log(`Listening on http://localhost:3000 `);
});


// const sockets = [];
// wss.on("connection", socket => {
//      sockets.push(socket);
//      socket["nickname"] = "Anonymous";

//      console.log("Connected to Browser ✅");
//      socket.on("close", _ => console.log("Disconnected from the Browser ❌"));
     
//      socket.on("message", msg => {
//           msg = msg.toString("utf8");
//           const message = JSON.parse(msg);
//           switch (message.type) {
//                case "new_message":
//                     sockets.forEach(aSocket => aSocket.send(`${socket.nickname}: ${message.payload}`));
//                case "nickname":
//                     socket["nickname"] = message.payload;
//           }
//      })
// });