/*
WebSocketServer.messageType(opcode) - takes an opcode and returns a string value based on the message type - "text" "binary" or "invalid" (other message types are dealt with internally)
*/
var WebSocketServer = require("websocketserver");
var server = new WebSocketServer("all", 1337);

var connectionList = [];
server.on("connection", function(id) {
    connectionList.push(id);
    console.log("Se ha conectado " + id);    
});

server.on("message", function(data, id) {
    var mes = server.unmaskMessage(data);
    var str = server.convertToString(mes.message);
    console.log(str);
    server.sendMessage('all', JSON.stringify({foo: "baraldsklask"}).replace(/\n/g, ' '), id);
});

//server.on('message', function(data, id) {
//     var mes = server.unmaskMessage(data);
//     if (server.messageType(mes.opcode) == "binary") {
//         var packagedMessage = server.packageMessage(mes.opcode, mes.message);
//         server.sendMessage('all', packagedMessage);
//     }
//});

server.on("closedconnection", function(id) {
    console.log("Connection " + id + " has left the server");
    //connectionList=[]
});

server.on('connection', function(id) {
    //server.sendMessage("all", "Welcome to the server!", id);
    var packagedMessage = '{from:"wssio", to: "all", data: "adding "'+id+'}'//server.packageMessage(mes.opcode, mes.message);
    server.sendMessage('all', packagedMessage);
});

//server.on('message', function(data, id) {
//    var mesObj = server.unmaskMessage(data);
//    console.log(server.convertToString(mesObj.message));
//});

server.on('message', function(data, id) {
     var mes = server.unmaskMessage(data);
     if (server.messageType(mes.opcode) == "binary") {
         var packagedMessage = server.packageMessage(mes.opcode, mes.message);
         server.sendMessage('all', packagedMessage);
     }
});
