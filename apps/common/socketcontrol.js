module.exports = function(io){
    var usernames=[];
    io.sockets.on("connection", function(socket){
        console.log("Have a new user connected");
        //listen adduser event
        socket.on("addUser", function(username){
            //save 
            socket.username = username;
            usernames.push(username);

            //notify to myself
            var data = {
                sender: "SERVER",
                message: "You have join chat room"
            };
            socket.emit("update_message", data);
            //notfy to other users
            var data = {
                sender: "SERVER",
                message: username+" have join to chat room"
            };

            socket.broadcast.emit("update_message", data);
        })

        //listen send_message event
         socket.on("send_message", function(message){
             //nonify to myself
             var data = {
                 sender: "You",
                 message: message
             }
             socket.emit("update_message", data);

             var data = {
                sender: socket.username,
                message: message
            }
            socket.broadcast.emit("update_message",data);
         });

         // user disconnect event
         socket.on("disconnect", function(){
             for (var i=0; i< usernames.length; i++){
                 if (usernames[i]==socket.username){
                     usernames.splice(i,1);
                     break;
                 }
             }

             //Notify to other users
             var data = {
                 sender: "SERVER",
                 message: socket.username + " left chat room"
             }
             socket.broadcast.emit("update_message",data);
         })
    });
}