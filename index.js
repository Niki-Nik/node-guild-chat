const express = require("express");
const config = require("./config");
const app = express();
const server = require("http").createServer(app);
const socketIo = require("socket.io")(server);
const bodyParser = require("body-parser");

server.listen(config.PORT, config.HOST_NAME, function () {
	console.log(`Server has been started at http://${config.HOST_NAME}:${config.PORT}/`)
});

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

users = [];
connections = [];

socketIo.sockets.on("connection", function (socket) {
	console.log("Успешное подключение");
	connections.push(socket);
	socket.on("disconnect", function (data) {
		connections.splice(connections.indexOf(socket), 1);
		console.log("Отключение");
	});
	socket.on("send mess", function (data) {
		socketIo.sockets.emit("add mess", { mess: data.mess, name: data.name });
	});
});
