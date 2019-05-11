const express = require('express');
const router = express.Router();
const trainingController = require("../controllers/trainingController");
const appConfig = require("../../config/appConfig")
const auth = require('../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/training`;

    // params:classid
    app.get(`${baseUrl}/classroom/:number`, auth.isAuthorized ,trainingController.getClassRoomByNumber);
    app.get(`${baseUrl}/classrooms/all/`,  trainingController.getAllClassrooms);
    app.post(`${baseUrl}/classroom/add`,  auth.isAuthorized, trainingController.addClassoom);
    

    // params: trainerId.
    app.get(`${baseUrl}/trainer/getTrainer/:name`,auth.isAuthorized , trainingController.getTrainerByName);
    app.put(`${baseUrl}/trainer/edit/:id`,auth.isAuthorized , trainingController.editTrainer);
    app.get(`${baseUrl}/trainer/all/`, trainingController.getAllTrainers);
    app.post(`${baseUrl}/trainer/add`,auth.isAuthorized , trainingController.addTrainer);
    app.post(`${baseUrl}/trainer/delete/:id` , trainingController.deleteTrainer);

    
    app.get(`${baseUrl}/schedule/all`,  trainingController.getAllTrainingSchedule);
    app.post(`${baseUrl}/schedule/add`,  trainingController.addSchedule);
    //app.put(`${baseUrl}/schedule/edit/:id`, userController.editUser);
    app.post(`${baseUrl}/schedule/delete`,  trainingController.deleteSchedulebyclassNumber);


}
