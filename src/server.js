import express from 'express';

const app = express();

app.set("view engine", "pug"); // 뷰 엔진을 pug로 지정
app.set("views", __dirname + "/views"); //express에서 템플릿이 어디에 있는지 지정
app.use("/public", express.static(__dirname + "/public")); //public url를 생성해서 유저에게 파일을 공유
app.get("/" , (req, res) => res.render("home")); // home.pug를 render 해주는 route handler
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
app.listen(3000, handleListen);
