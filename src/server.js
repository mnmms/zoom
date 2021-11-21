import http from 'http';
import WebSocket from 'ws';
import express from 'express';

const app = express();

app.set("view engine", "pug"); // 뷰 엔진을 pug로 지정
app.set("views", __dirname + "/views"); //express에서 템플릿이 어디에 있는지 지정
app.use("/public", express.static(__dirname + "/public")); //public url를 생성해서 유저에게 파일을 공유
app.get("/" , (_, res) => res.render("home")); // home.pug를 render 해주는 route handler
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000 and ws://localhost:3000`);
// app.listen(3000, handleListen);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", socket => {
     sockets.push(socket);
     socket["nickname"] = "Anonymous";
     console.log("Connected to Browser ✅");
     socket.on("close", _ => console.log("Disconnected from the Browser ❌"));
     
     socket.on("message", msg => {
          msg = msg.toString("utf8");
          const message = JSON.parse(msg);
          switch (message.type) {
               case "new_message":
                    sockets.forEach(aSocket => aSocket.send(`${socket.nickname}: ${message.payload}`));
               case "nickname":
                    socket["nickname"] = message.payload;
          }
     })

     // socket.on("message", msg => {
     //      msg = msg.toString("utf8");
     //      const parseMsg = JSON.parse(msg);
     //      console.log(parseMsg);
     //      sockets.forEach(aSocket => aSocket.send(msg));

     //      if(parseMsg.type === "nickname") {
     //           sockets.forEach(aSocket => aSocket.send(parseMsg.payload));
     //      } else if(parseMsg.type === "new_message") {
     //           // sockets.forEach(aSocket => aSocket.send(parseMsg.payload));
     //      }
     // })
});

server.listen(3000, handleListen);