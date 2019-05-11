const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')

const TrainerModel = mongoose.model('Trainer')

const ClassroomModel = mongoose.model('Classroom')

const TrainingScheduleModel = mongoose.model('TrainingSchedule')


let addClassroom = (req, res) => {

    let classNumber = parseInt(req.body.classNumber)

    ClassroomModel.find({ 'classNumber': classNumber }).exec((err, retrievedDetails) => {

        if (err) {
            logger.error(err.message, 'userController: addClassroom', 10)
            let apiResponse = response.generate(true, 'failed to add classroom', 500, null);
            res.send(apiResponse)
        }
        else if (check.isEmpty(retrievedDetails)) {
            let classroom = new ClassroomModel({
                classId: shortid.generate(),
                classNumber: req.body.classNumber,
                capacity: req.body.capacity,
                createdOn: time.now()
            })
            classroom.save((err, newclass) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'trainingrController:addClassoom ', 10)
                    let apiResponse = response.generate(true, 'Failed to add new classroom', 500, null)
                    res.send(apiResponse)
                }
                else {
                    newclass = newclass.toObject();
                    let apiResponse = response.generate(false, 'class created', 200, newclass)
                    res.send(apiResponse)
                }
            })
        }
        else {
            logger.error('class Cannot Be Created.Class Already Present', 'addclassroom', 4)
            let apiResponse = response.generate(true, 'Class Already Present With this classNumber', 403, null);
            res.send(apiResponse);
        }
    })
}
// end of add classoom method

let getClassRoomByNumber = (req, res) => {

    let classNumber = parseInt(req.params.number)
    ClassroomModel.findOne({ classNumber: classNumber }).exec((err, details) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Training Controller: getSingleClassroom', 10)
            let apiResponse = response.generate(true, 'Failed To Find classroom Details', 500, null)
            res.send(apiResponse)
        }
        else if (check.isEmpty(details)) {
            logger.info('No class Found', 'Training Controller:getSingleClass')
            let apiResponse = response.generate(true, 'No class Found', 404, null)
            res.send(apiResponse)
        }
        else {
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

let getTrainerByName = (req, res) => {

    TrainerModel.findOne({ name: req.params.name }).exec((err, details) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Training Controller: getSingleTrainer', 10)
            let apiResponse = response.generate(true, 'Failed To Find trainer Details', 500, null)
            res.send(apiResponse)
        }
        else if (check.isEmpty(details)) {
            logger.info('No trainer Found', 'Training Controller:getSingleTrainer')
            let apiResponse = response.generate(true, 'No Trainer Found', 404, null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.generate(false, 'Trainer Details Found', 200, details)
            res.send(apiResponse)
        }
    })
}
//end of get trainer by id

let getAllTrainers = (req, res) => {

    TrainerModel.find().exec((err, result) => {
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

let editTrainer = (req, res) => {

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

let deleteTrainer = (req, res) => {
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
            let trainer= result.name;
            deleteTrainerScheduleByTrainerName(trainer);
            let apiResponse = response.generate(false, 'Deleted the trainer successfully', 200, result)
            res.send(apiResponse)
        }
    });// end user model find and remove


}// end delete user

let addSchedule = (req, res) => {
    let classNumber = parseInt(req.body.selectedClass);
    let capacity = parseInt(req.body.noOfStudents);
    let trainer = req.body.selectedTrainer;
    let mop = req.body.MOP;
    let course = req.body.course;

    let monthFinder = (ress) => {
        let retrievedTrainerMayAvailability = ress.mayAvailable;
        let retrievedTrainerJuneAvailability = ress.juneAvailable;
        let retrievedTrainerJulyAvailability = ress.julyAvailable;

        if (mop === "May") {
            if (retrievedTrainerMayAvailability === false) {
                logger.error("Trainer is not available in May", 'addSchedule', 8);
                let apiResponse = response.generate(true, "Trainer is not available in May", 400, null)
                res.send(apiResponse);
            }
            else {
                saveSchedule();
            }
        }
        else if (mop === "June") {
            if (retrievedTrainerJuneAvailability === false) {
                logger.error("Trainer is not available in June", 'addSchedule', 8);
                let apiResponse = response.generate(true, "Trainer is not available in June", 400, null)
                res.send(apiResponse);
            }
            else {
                saveSchedule();
            }
        }
        else if (mop == "July") {
            if (retrievedTrainerJulyAvailability === false) {
                logger.error("Trainer is not available in July", 'addSchedule', 8);
                let apiResponse = response.generate(true, "Trainer is not available in July", 400, null)
                res.send(apiResponse);
            }
            else {
                saveSchedule();
            }
        }
        else {
            logger.error("Invalid month !", 'addSchedule', 8);
            let apiResponse = response.generate(true, "Invalid month !", 400, null)
            res.send(apiResponse);
        }
    }

    let saveSchedule = () => {

        let newSchedule = new TrainingScheduleModel({
            scheduleId: shortid.generate(),
            classNumber: classNumber,
            noOfStudents: capacity,
            course: course,
            trainer: trainer,
            month: mop,
            createdOn: time.now()
        })

        newSchedule.save((err, newresult) => {
            if (err) {
                logger.error(err.message, 'addScheduel: saveschedule', 10);
                let apiResponse = response.generate(true, "Some error occured", 400, null);
                res.send(apiResponse);
            }
            else {
                //newSchedule = newSchedule.toObject();
                setClassAvailableAsFalse({ isAvailable: false }, classNumber);
                if (mop === "May") {
                    setTrainerAvailableInMonth({ mayAvailable: false }, trainer);
                }
                else if (mop === "June") {
                    setTrainerAvailableInMonth({ juneAvailable: false }, trainer);
                }
                else {
                    setTrainerAvailableInMonth({ julyAvailable: false }, trainer);
                }
                let apiResponse = response.generate(false, 'schedule created', 200, newresult)
                res.send(apiResponse)
            }
        })

    }




    ClassroomModel.findOne({ classNumber: classNumber }).lean().exec((err, result) => {
        if (err) {
            logger.error(err.message, 'addSchedule', 10)
            let apiResponse = response.generate(true, 'Error occured, Try again', 500, null);
            res.send(apiResponse)
        }
        else {
            //console.log(result);
            let retrievedClassCapacity = result['capacity'];
            let retrievedClassAvailable = result['isAvailable'];
            //let 
            if (retrievedClassAvailable === false) {
                logger.error("Classroom is not available", 'addschedule', 9);
                let apiResponse = response.generate(true, `Classroom number ${result["classNumber"]} is not available!`, 400, null);
                res.send(apiResponse);
            }
            else if (retrievedClassCapacity < capacity) {
                logger.error("capacity exceeded", 'addschedule', 9);
                let apiResponse = response.generate(true, `Capacity of class should be less than ${retrievedClassCapacity}!`, 400, null);
                res.send(apiResponse);
            }
            else {
                //console.log("inside classroom model else block")
                //console.log("capacity"+retrievedClassAvailable)
                //console.log("available"+retrievedClassCapacity)
                TrainerModel.findOne({ name: trainer }).lean().exec((err, ress) => {
                    if (err) {
                        logger.error(err.message, 'addschedule', 10)
                        let apiResponse = response.generate(true, 'Error occured, Try again', 500, null);
                        res.send(apiResponse)
                    }
                    else {
                        if (course === "Java") {
                            if (ress['knowsJava'] === false) {
                                logger.error("Trainer don't know Java", 'addschedule', 9)
                                let apiResponse = response.generate(true, `Trainer don't know Java`, 400, null);
                                res.send(apiResponse);
                            }
                            else {
                                monthFinder(ress);
                            }
                        }
                        else if (course === "C") {
                            if (ress['knowsC'] === false) {
                                logger.error("Trainer don't know C", 'addschedule', 9)
                                let apiResponse = response.generate(true, `Trainer don't know C`, 400, null);
                                res.send(apiResponse);
                            }
                            else {
                                monthFinder(ress);
                            }
                        }
                        else {
                            if (ress['knowsAndroid'] === false) {
                                logger.error("Trainer don't know Android", 'addschedule', 9)
                                let apiResponse = response.generate(true, `Trainer don't know Android`, 400, null);
                                res.send(apiResponse);
                            }
                            else {
                                monthFinder(ress);
                            }
                        }

                    }
                })
            }
        }
    })
}

let deleteSchedulebyclassNumber = (req, res) => {

    //let sid=(req.body.id);
    let trainer = req.body.trainer;
    let mop = req.body.mop;
    let classNumber = parseInt(req.body.classNumber);
     
    TrainingScheduleModel.findOneAndRemove({ classNumber: classNumber}).lean().exec((err, result) => {
        if (err) {
            logger.error("Some error occured", 'deleteschedule:TrainingScheduleModel', 10);
            let apiResponse = response.generate(true, "Some error occured", 400, null)
            res.send(apiResponse)
        }
        else {
            if (mop === "May") {
                setTrainerAvailableInMonth({ mayAvailable: true }, trainer);
            }
            else if (mop === "June") {
                setTrainerAvailableInMonth({ juneAvailable: true }, trainer);
            }
            else {
                setTrainerAvailableInMonth({ julyAvailable: true }, trainer);
            }
            setClassAvailableAsFalse({ isAvailable: true }, classNumber)
            logger.info("Deleted Schedule successfully", "deleteSchedulebyId",9 );
            let apiResponse = response.generate(false, "TrainingSchedule deleted successfully", 200, result);
            res.send(apiResponse);

        }
    })
}

let setClassAvailableAsFalse = (options, classNumber) => {

    ClassroomModel.update({ classNumber: classNumber }, options).lean().exec((err, result) => {
        if (err) {
            logger.error(err.message, 'addSchedule', 10)
            let apiResponse = response.generate(true, 'Error occured, Try again', 500, null);
            res.send(apiResponse)
        }
        else {
            console.log(result);
            console.log("ClassIsAvailable set to false");
        }

    });
}


let setTrainerAvailableInMonth = (options, trainer) => {

    TrainerModel.update({ name: trainer }, options).exec((err, res) => {
        if (err) {
            logger.error(err.message, 'addSchedule', 10)
            let apiResponse = response.generate(true, 'Error occured, Try again', 500, null);
            res.send(apiResponse)
        }
        else {
            console.log(res);
            console.log("MonthIsAvailable set to " + options.isAvailable);
        }
    })
}

let getAllSchedules =(req,res)=>{

    TrainingScheduleModel.find().exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'TrainingSchedule Controller: getAllTrainingSchedule', 10)
            let apiResponse = response.generate(true, 'Failed To Find TrainingSchedule Details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No TrainingSchedule Found', 'TrainingSchedule Controller: getAllTrainingSchedule')
            let apiResponse = response.generate(true, 'No TrainingSchedule Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All TrainingSchedule Details Found', 200, result)
            res.send(apiResponse)
        }
    })

}

let deleteTrainerScheduleByTrainerName = (trainer)=>{

    TrainingScheduleModel.findOneAndRemove({ trainer: trainer}).lean().exec((err, result) => {
        if (err) {
            logger.error("Some error occured", 'deleteschedulebytrainername:TrainingScheduleModel', 10);
            let apiResponse = response.generate(true, "Some error occured", 400, null)
            res.send(apiResponse)
        }
        else {
            let mop= result.month;
            if (mop === "May") {
                setTrainerAvailableInMonth({ mayAvailable: true }, trainer);
            }
            else if (mop === "June") {
                setTrainerAvailableInMonth({ juneAvailable: true }, trainer);
            }
            else {
                setTrainerAvailableInMonth({ julyAvailable: true }, trainer);
            }
            let classNumber = result.classNumber;
            setClassAvailableAsFalse({ isAvailable: true }, classNumber)
            logger.info("Deleted Schedule successfully", "deleteSchedulebyId",9 );
            //let apiResponse = response.generate(false, "TrainingSchedule deleted successfully", 200, result);
            //res.send(apiResponse);

        }
    })
}

module.exports = {

    addClassoom: addClassroom,
    getClassRoomByNumber: getClassRoomByNumber,
    getAllClassrooms: getAllClassrooms,
    addTrainer: addTrainer,
    getAllTrainers: getAllTrainers,
    getTrainerByName: getTrainerByName,
    deleteTrainer: deleteTrainer,
    editTrainer: editTrainer,
    addSchedule: addSchedule,
    deleteSchedulebyclassNumber:deleteSchedulebyclassNumber,
    getAllTrainingSchedule:getAllSchedules
}