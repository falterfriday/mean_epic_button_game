var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
 res.render("index");
});

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
//initial count display broken
var io = require('socket.io').listen(server);
var count = 0;
io.sockets.on('connection', function(socket) {
	console.log('connection made');
	socket.on('button_click', function(){
		count += 1;
		socket.emit('count', count);
		return count;
	});
	socket.on('reset', function(){
		count = 0;
	});
});
