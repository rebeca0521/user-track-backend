var User = require('../models/userModel')
const createError = require('http-errors');
var dateFormat = require("dateformat");

exports.add = async (req, res, next) => {
    const data = req.body
    if (data.phone == undefined || data.code == undefined) {
        res.send(createError(422, '資料不完整'))
    }
    data.code = data.code.replace(/\s*/g,"")
    var user = new User(data)
    user.save(function (err, result) {
        if (err) return next(err);
        res.json({
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
        limit: limit
    };

    User.paginate(
        query,
        options,
        function (err, result) {
            if (err) return next(err)
            result.message = 'success'
            res.json(result)
        }
    ); 

}

exports.update = (req, res, next) => {
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
        res.json({
            message: 'Updated successfully.',
            data: result
        })
    })
}

exports.searchByCode = (req, res, next) => {
    const code = req.param('code').replace(/\s*/g,"")
    result = []
    User.find({ code: code }, 'phone time', async function (err, docs) {
        if (err) return next(err)
        await docs.map((item) => {
            time = dateFormat(item.time, "isoDateTime");
            text = `${item.phone} at ${time}`
            result.push(text)
        })
        res.json(result)
    });

}