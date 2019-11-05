const express = require("express");
const app = express();
const server = require("http").createServer(app);
const path = require("path");

const port = 8080;

app.use('/public', express.static(path.resolve(__dirname,"..",'public')));

app.get('/', (req,res) => {
	res.sendFile(path.resolve("public/index.html"));
});

app.get('/lessons/:lessonName', (req,res) => {
	res.sendFile(path.resolve(`public/${req.params.lessonName}/index.html`));
});

app.set("x-powered-by",false);

server.listen(port);
console.log("started on " + port);