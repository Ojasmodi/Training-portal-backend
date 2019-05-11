const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')

const DiscussionModel = mongoose.model('Discussion')

let getAllDiscussions = (req, res) => {

    DiscussionModel.find().exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Discussion Controller: getAlldiscussion', 10)
            let apiResponse = response.generate(true, 'Failed To discussions details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No discussion Found', 'Discussion Controller: getAllDiscussion')
            let apiResponse = response.generate(true, 'No discussion Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All discussion Details Found', 200, result)
            res.send(apiResponse)
        }
    });
}
// end of get all classrooms
module.exports={
    getAllDiscussions:getAllDiscussions
}