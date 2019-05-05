'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let trainerSchema = new Schema({
  trainerId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  name: {
    type: String,
    default: ''
  },
  age: {
    type: Number,
    default: ''
  },
  experience: {
    type: Number,
    default: ''
  },
  contactNo: {
    type: Number,
    default: ''
  },
  knowsJava: {
    type: Boolean,
    default: false 
  },
  knowsC: {
    type: Boolean,
    default: false 
  },
  knowsAndroid: {
    type: Boolean,
    default: false 
  },
  mayAvailable: {
    type: Boolean,
    default: false 
  },
  juneAvailable: {
    type: Boolean,
    default: false 
  },
  julyAvailable: {
    type: Boolean,
    default: false 
  },
  email: {
    type: String,
    default: ''
  },
  createdOn :{
    type:Date,
    default:""
  }


})


mongoose.model('Trainer', trainerSchema);