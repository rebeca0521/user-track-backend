var User = require('../models/userModel')

exports.checkId = async (req, res, next) => {
    const id = req.query.id
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(422).json({message: "Id is not exist."})
    }
    checkId = await User.exists({_id: id})
    if(!checkId) {
        return res.status(422).json({message: "Id is not exist."})
    }
    next()
}
