var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});
server.listen(1337, function() { });

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        //console.log('DATA: '+message)
        if (message.type === 'utf8') {
            var json=JSON.parse(message.utf8Data)
            // process WebSocket message
            try {
                console.log(JSON.parse(message.utf8Data));
                connection.sendUTF(JSON.stringify({from: json.from, to: json.to, data: json.data}));
                console.log("\n\nForm: "+json.from);
                console.log("To: "+json.to);
                console.log("Data: "+json.data+'\n\n');
            } catch (ex) {
                console.log(ex);
                //connection.sendUTF(JSON.stringify({from: "wssio", to: "all", data: "error"}));
            }
        }
    });

    connection.on('close', function(connection) {
        // close user connection
        console.log('connection closed');
    });
});
