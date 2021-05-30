var express = require('express');
var router = express.Router();
const users = require('../controllers/users');
const { body } = require('express-validator');
const { checkId } = require('../middlewares/checkExist')

router.get('/', users.search);

router.post('/', 
	body('time', "Invalid time format.").if(body('time').exists()).isISO8601(),
	body(['phone', 'code'], "Phone and code field are required.").notEmpty(),
	body('phone', "Invalid phone number format.").isMobilePhone('zh-TW'),
	users.add
);

router.put('/',
	checkId,
	body('time', "Invalid time format.").if(body('time').exists()).isISO8601(),
	body('phone', "Invalid phone number format.").if(body('phone').exists()).isMobilePhone('zh-TW'),
	users.update
);

router.get('/:code', users.searchByCode);

module.exports = router;
