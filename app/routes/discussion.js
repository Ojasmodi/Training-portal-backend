const express = require('express');
const router = express.Router();
const discussionController = require("../controllers/discussionController");
const appConfig = require("../../config/appConfig")
const auth = require('../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/discussion`;

    // params: trainerId.
    //app.get(`${baseUrl}/discussion/getReplies/:dissId`,auth.isAuthorized , trainingController.getTrainerByName);
    //app.put(`${baseUrl}/trainer/edit/:id`,auth.isAuthorized , trainingController.editTrainer);
    app.get(`${baseUrl}/discussions/all/`, discussionController.getAllDiscussions);
    //app.post(`${baseUrl}/discussion/add`,auth.isAuthorized , trainingController.addTrainer);
    //app.post(`${baseUrl}/discussion/reply/:dissId`,auth.isAuthorized , trainingController.addTrainer);
    //app.post(`${baseUrl}/discussion/reply/delete/:dissId/:replyId`,auth.isAuthorized , trainingController.addTrainer);
    //app.post(`${baseUrl}/discussion/delete/:dissId` , trainingController.deleteTrainer);

}
