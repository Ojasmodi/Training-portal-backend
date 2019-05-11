'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let discussionSchema = new Schema({
  discussionId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  topic: {
    type: String,
    default: ''
  },
  views: {
    type: Number,
    default: 0
  },
  details: {
    type: String,
    default: ''
  },
  createdBy: {
    type: String,
    default: ''
  },
  userId_of_creator: {
    type: String,
    default: ''
  },
  replies:{
      type: [{
          replyId:String,
          replyBy:String,
          replyMsg:String,
          userid_of_replier:String,
          replyCreatedOn:Date
      }],
      default:null
  },
  createdOn :{
    type:Date,
    default:""
  }


})


mongoose.model('Discussion', discussionSchema);