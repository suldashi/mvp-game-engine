const express = require("express");
const app = express();
const server = require("http").createServer(app);
const path = require("path");

const port = 8080;

app.use('/public', express.static(path.resolve(__dirname,"..",'public')));

app.get('/', (req,res) => {
	res.redirect("/public");
});

app.get('/public/:lessonName', (req,res) => {
	res.sendFile(path.resolve(`public/${req.params.lessonName}/index.html`));
});

server.listen(port);
console.log("started on " + port);