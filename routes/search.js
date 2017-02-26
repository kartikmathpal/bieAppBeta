/**
 * Created by kartikmathpal on 26/02/17.
 */



var express       = require('express');
var searchService = require('./../service/search_service');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    searchService.searchByKey(
        key = req.query.key,
        collection = req.query.collection,
        callback = function (data) {
            res.end(JSON.stringify(data))
        }
    );
});

module.exports = router;


