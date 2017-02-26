
/**
 * Created by kartikmathpal on 26/02/17.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('menu', { title: 'BIE APP' });
});

module.exports = router;

