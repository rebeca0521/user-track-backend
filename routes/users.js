var express = require('express');
var router = express.Router();
const users = require('../controllers/users')

router.get('/', users.search);
router.post('/', users.add);
router.put('/', users.update);
router.get('/:code', users.searchByCode);

module.exports = router;
