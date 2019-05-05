const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')

const TrainerModel= mongoose.model('Trainer')

const ClassroomModel= mongoose.model('Classroom')


let addClassroom= ( req, res) => {

    let classNumber= parseInt(req.body.classNumber)

    ClassroomModel.find( { 'classNumber':classNumber}).exec((err, retrievedDetails)=>{

        if(err){
            logger.error(err.message, 'userController: addClassroom', 10)
            let apiResponse = response.generate(true , 'failed to add classroom', 500, null);
            res.send(apiResponse)
        }
        else if(check.isEmpty(retrievedDetails)){
            let classroom = new ClassroomModel({
                classId:shortid.generate(),
                classNumber:req.body.classNumber,
                capacity:req.body.capacity,
                createdOn:time.now()
            })
            classroom.save((err, newclass)=>{
                if(err){
                    console.log(err)
                            logger.error(err.message, 'trainingrController:addClassoom ', 10)
                            let apiResponse = response.generate(true, 'Failed to add new classroom', 500, null)
                           res.send(apiResponse)
                }
                else{
                    newclass = newclass.toObject();
                    let apiResponse = response.generate(false, 'class created', 200, newclass)
                    res.send(apiResponse)
                }
            })
        }
        else{
            logger.error('class Cannot Be Created.Class Already Present', 'addclassroom', 4)
            let apiResponse = response.generate(true, 'Class Already Present With this classNumber', 403, null);
            res.send(apiResponse);
        }
    })
}
// end of add classoom method

let getClassRoomByNumber= (req, res)=>{

    let classNumber= parseInt(req.params.number)
    ClassroomModel.findOne({ classNumber: classNumber}).exec((err, details)=>{
        if(err){
            console.log(err)
                logger.error(err.message, 'Training Controller: getSingleClassroom', 10)
                let apiResponse = response.generate(true, 'Failed To Find classroom Details', 500, null)
                res.send(apiResponse)
        }
        else if(check.isEmpty(details)){
            logger.info('No class Found', 'Training Controller:getSingleClass')
            let apiResponse = response.generate(true, 'No class Found', 404, null)
            res.send(apiResponse)
        }
        else{
            let apiResponse = response.generate(false, 'classroom Found', 200, details)
            res.send(apiResponse)
        }
    })
}
//end of get classroom by id

let getAllClassrooms = (req, res) => {

    ClassroomModel.find().exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Training Controller: getAllclass', 10)
            let apiResponse = response.generate(true, 'Failed To classroom details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No class Found', 'Training Controller: getAllclass')
            let apiResponse = response.generate(true, 'No class Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All Class Details Found', 200, result)
            res.send(apiResponse)
        }
    });
}
// end of get all classrooms


let addTrainer = (req, res) => {

    let trainer = new TrainerModel({
        trainerId: shortid.generate(),
        name: req.body.name,
        age: req.body.age,
        experience: req.body.experience,
        contactno: req.body.contactno,
        knowsJava: req.body.knowsJava,
        knowsC: req.body.knowsC,
        knowsAndroid: req.body.knowsAndroid,
        mayAvailable: req.body.mayAvailable,
        juneAvailable: req.body.juneAvailable,
        julyAvailable: req.body.julyAvailable,
        email: req.body.email,
        createdOn: time.now()
    })
    trainer.save((err, newtrainer) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'trainingrController:addTrainer ', 10)
            let apiResponse = response.generate(true, 'Failed to add new classroom', 500, null)
            res.send(apiResponse)
        }
        else {
            newtrainer = newtrainer.toObject();
            let apiResponse = response.generate(false, 'Trainer created', 200, newtrainer)
            res.send(apiResponse)
        }
    })
}
// end of add trainer method

let getTrainerByName= (req, res)=>{

    TrainerModel.findOne({ name: req.params.name}).exec((err, details)=>{
        if(err){
            console.log(err)
                logger.error(err.message, 'Training Controller: getSingleTrainer', 10)
                let apiResponse = response.generate(true, 'Failed To Find trainer Details', 500, null)
                res.send(apiResponse)
        }
        else if(check.isEmpty(details)){
            logger.info('No trainer Found', 'Training Controller:getSingleTrainer')
            let apiResponse = response.generate(true, 'No Trainer Found', 404, null)
            res.send(apiResponse)
        }
        else{
            let apiResponse = response.generate(false, 'Trainer Details Found', 200, details)
            res.send(apiResponse)
        }
    })
}
//end of get trainer by id

let getAllTrainers=(req, res)=>{

    TrainerModel.find().exec((err, result)=>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'Training Controller: getAlltrainers', 10)
            let apiResponse = response.generate(true, 'Failed To Find trainer Details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No trainer Found', 'Training Controller: getAlltrainers')
            let apiResponse = response.generate(true, 'No trainer Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All Trainers Details Found', 200, result)
            res.send(apiResponse)
        }
    })
}
// end of get all trainers

let editTrainer=(req, res)=>{

    let options = req.body;
    TrainerModel.update({ 'trainerId': req.params.id }, options).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Training Controller:editTrainer', 10)
            let apiResponse = response.generate(true, 'Failed To edit trainer details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No trainer Found', 'Traininig Controller: editTrainer')
            let apiResponse = response.generate(true, 'No trainer Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'trainer details edited', 200, result)
            res.send(apiResponse)
        }
    });// end trainer model update
}
// end od edit trainer details

let deleteTrainer=( req, res)=>{
    TrainerModel.findOneAndRemove({ 'trainerId': req.params.id }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Training Controller: deletetrainer', 10)
            let apiResponse = response.generate(true, 'Failed To delete trainer', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No trainer Found', 'Training Controller: deleteUser')
            let apiResponse = response.generate(true, 'No trainer Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the trainer successfully', 200, result)
            res.send(apiResponse)
        }
    });// end user model find and remove


}// end delete user



module.exports={

    addClassoom:addClassroom,
    getClassRoomByNumber:getClassRoomByNumber,
    getAllClassrooms:getAllClassrooms,
    addTrainer:addTrainer,
    getAllTrainers:getAllTrainers,
    getTrainerByName:getTrainerByName,
    deleteTrainer:deleteTrainer,
    editTrainer:editTrainer
}