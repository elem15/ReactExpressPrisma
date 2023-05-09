var express = require('express');
const { auth } = require('../middleware/auth');
const { all, create, remove, one, update } = require('../controllers/employees');
var router = express.Router();

/* GET users listing. */
router.get('/', auth, all);
router.get('/:id', auth, one);
router.post('/create/', auth, create);
router.put('/update/', auth, update);
router.delete('/remove/:id', auth, remove);

module.exports = router;
