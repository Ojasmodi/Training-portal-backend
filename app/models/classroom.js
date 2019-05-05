'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let classSchema = new Schema({
  classId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  classNumber: {
    type: Number,
    default: ''
  },
  capacity: {
    type: Number,
    default: ''
  },
  isAvailable:{
      type: Boolean,
      default:true
  },
  createdOn :{
    type:Date,
    default:""
  }


})


mongoose.model('Classroom', classSchema);