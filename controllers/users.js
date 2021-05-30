var User = require('../models/userModel')
var dayjs = require('dayjs')
const { validationResult } = require('express-validator');
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)

exports.add = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({message: errors.array()[0].msg})
    }
    const data = req.body
    data.code = data.code.replace(/\s*/g,"")
    if (data.time != undefined) {
        data.time = dayjs.tz(data.time, 'Asia/Taipei').utc(true).format()
    }
    var user = new User(data)
    user.save(function (err, result) {
        if (err) return next(err);
        return res.json({
            message: 'Saved successfully.',
            data: result
        })
    })
}

exports.search = async (req, res, next) => {
    const phone = req.query.phone
    const code = req.query.code
    const limit = req.query.limit || 5
    const page = req.query.page || 1
    let sort = req.query.sort || -1
    if(sort == 'time') {
        sort = 1
    } else {
        sort = -1
    }
    let query = {$and: []}
    if (phone != undefined) {
        query['$and'].push({phone: phone})
    }
    if (code != undefined) {
        query['$and'].push({code: code})
    }
    if(query['$and'][0] == undefined) {
        query = {}
    }

    const options = {
        page: page,
        limit: limit,
        sort: {
            time: sort
        }
    };

    User.paginate(
        query,
        options,
        function (err, result) {
            if (err) return next(err)
            result.message = 'success'
            return res.json(result)
        }
    ); 

}

exports.update = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({message: errors.array()[0].msg})
    }
    const id = req.query.id
    const userData = req.body
    const updateData = {}
    if (userData.phone != undefined) {
        updateData.phone = userData.phone
    }
    if (userData.code != undefined) {
        updateData.code = userData.code.replace(/\s*/g,"")
    }
    if (userData.time != undefined) {
        updateData.time = userData.time
    }
    const options = {
        new: true
    }
    User.findByIdAndUpdate(id, updateData, options, function(err, result) {
        if (err) return next(err);
        return res.json({
            message: 'Updated successfully.',
            data: result
        })
    })
}

exports.searchByCode = (req, res, next) => {
    const code = req.param('code').replace(/\s*/g,"")
    User.find({ code: code }, 'phone time', async function (err, docs) {
        if (err) return next(err)
        docs = await docs.map((item) => {
            time = dayjs(item.time).utc().format()
            return `${item.phone} at ${time}`
        })
        return res.json(docs)
    });

}