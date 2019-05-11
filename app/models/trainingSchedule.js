'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let scheduleSchema = new Schema({
    scheduleId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    classNumber: {
        type: Number,
        default: ''
    },
    noOfStudents: {
        type: Number,
        default: ''
    },
    course: {
        type: String,
        default: ''
    },
    trainer: {
        type: String,
        default: ""
    },
    month: {
        type: String,
        default: ''
    },
    createdOn: {
        type: Date,
        default: ""
    }


})


mongoose.model('TrainingSchedule', scheduleSchema);