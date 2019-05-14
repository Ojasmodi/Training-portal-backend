
const socketio = require('socket.io')
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib.js');
const events = require('events')
const eventEmitter = new events.EventEmitter();

const discussionController = require("../controllers/discussionController");

const tokenLib = require("./tokenLib.js");
const check = require("./checkLib.js");
const response = require('./responseLib')
const DiscussionModel = mongoose.model('Discussion');



let setServer = (server) => {

    //let allOnlineUsers=[]
    let allDiscussions = []

    let io = socketio.listen(server)

    let myIO = io.of('')

    myIO.on('connection', (socket) => {


        console.log("on emitting verifying user");

        socket.emit('verifyUser', "");

        //code to verify user

        socket.on('set-user', (authToken) => {

            console.log("set-user called")
            tokenLib.verifyClaimWithoutSecret(authToken, (err, user) => {

                if (err) {
                    socket.emit('auth-error', { status: 500, error: true, errorMsg: "Plz provide data with authToken" })
                }
                else {

                    console.log("user is verified setting details")
                    let currentUser = user.data;
                    //setting socket userId
                    socket.userId = currentUser.userId;
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`
                    console.log(`${fullName} is online`);
                    //socket.emit(currentUser.userId,"you are online")

                    //let userObj={userId:currentUser.userId,fullName:fullName}
                    //allOnlineUsers.push(userObj);
                    //console.log(allOnlineUsers)

                    socket.room = 'discussion'

                    socket.join(socket.room)
                    //socket.to(socket.room).broadcast.emit('online-user-list', allOnlineUsers)
                }
            })

        })
        socket.on('disconnect', () => {
            // disconnect the user from socket
            // remove the user from online list
            // unsubscribe the user from his own channel

            console.log("user is disconnected");
            // console.log(socket.connectorName);
            console.log(socket.userId);
            // var removeIndex = allOnlineUsers.map(function(user) { return user.userId; }).indexOf(socket.userId);
            // allOnlineUsers.splice(removeIndex,1)
            //console.log(allOnlineUsers)

            //socket.to(socket.room).broadcast.emit('online-user-list',allOnlineUsers)
            socket.leave(socket.room)
            socket.emit('connection-lost', '');


        }) // end of on disconnect

        socket.on('discussion', (data) => {
            //console.log("socket chat-msg called")
            //console.log("data")
            data['discussionId'] = shortid.generate()
            //data['views']=0 send through client side
            console.log(data)

            //event to save chat.
            setTimeout(function () {
                eventEmitter.emit('save-discussion', data);
            }, 2000)
            //socket.room='discussion';
            //allDiscussions.push(data);
            //console.log(allDiscussions)
            //socket.to(socket.room).broadcast.emit('get-discussion', data)
            myIO.in(socket.room).emit('get-discussion', data);
            //socket.emit('get-discussion', data)
        })


        socket.on('reply', (data) => {
            data['replyId'] = shortid.generate()
            console.log(data)
            setTimeout(function () {
                eventEmitter.emit('save-reply', data);
            }, 2000)
            myIO.in(socket.room).emit('get-reply', data);
        })

        socket.on('delete-discussion', (data) => {
            //data['replyId'] = shortid.generate()
            console.log(data)
            setTimeout(function () {
                eventEmitter.emit('delete-discuss', data);
            }, 2000)
            myIO.in(socket.room).emit('get-delete', data);
        })

        /*
        socket.on('typing', (fullName) => {
            
            socket.to(socket.room).broadcast.emit('typing',fullName);

        });
        */


    });

}



// database operations are kept outside of socket.io code.

// saving chats to database.
eventEmitter.on('save-reply', data => {

    let dissId = data['discussionId'];
    console.log(dissId);
    delete data['discussionId'];
    console.log(data)
    DiscussionModel.update({ discussionId: dissId }, { $push: { replies: data } }, (err, result) => {
        if (err) {
            console.log(`error occurred: ${err}`);
        }
        else if (result == undefined || result == null || result == "") {
            console.log("Reply Is Not Saved.");
        }
        else {
            console.log("Reply Saved.");
            console.log(result);
        }
    })
})


eventEmitter.on('delete-discuss', data => {

    let id=data['discussionId']
    console.log(id);
    console.log(data)
    DiscussionModel.findOneAndRemove({ discussionId: id }, (err, result) => {
        if (err) {
            console.log(`error occurred: ${err}`);
        }
        else if (result == undefined || result == null || result == "") {
            console.log("Delete not executed");
        }
        else {
            console.log("Deleted successfully");
            console.log(result);
        }
    })

})


eventEmitter.on('save-discussion', data => {

    let newDiscussion = new DiscussionModel({

        discussionId: data.discussionId,
        topic: data.topic,
        details: data.details,
        views: data.views,
        createdBy: data.createdBy,
        userId_of_creator: data.userId_of_creator,
        createdOn: data.createdOn
    });

    newDiscussion.save((err, result) => {
        if (err) {
            console.log(`error occurred: ${err}`);
        }
        else if (result == undefined || result == null || result == "") {
            console.log("Discussion Is Not Saved.");
        }
        else {
            console.log("Discussion Saved.");
            console.log(result);
        }
    })
})


// end of saving chat.

module.exports = {
        setServer: setServer
    }


