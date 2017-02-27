/**
 * Created by kartikmathpal on 26/02/17.
 */



var express       = require('express');
var searchService = require('./../service/search_service');

var router = express.Router();

/* GET home page. */
router.get('/search', function(req, res, next) {
    searchService.searchByKey(
        key = req.query.key,
        collection = req.query.collection,
        callback = function (data) {
            // console.log('data', data);
            if(data && data.length > 0) {
                res.status(200).end(JSON.stringify(data))
            } else {
                res.status(404).end(JSON.stringify({
                    'message': 'Unable to find data matching your request'
                }))
            }
        }
    );
});


router.post('/:collection/documents',function(req,res,next){
    var collection = req.params['collection'];

    if(collection == 'mis' || collection == 'abinitio') {
        searchService.insertDocuments(req.body.documents, collection, callback = function(err, data) {
            if(err) {
                res.status(500).end(JSON.stringify(err))
            } else {
                res.status(200).end(JSON.stringify(data))
            }
        })
    } else {
        res.status(404).end(JSON.stringify({
            'message': 'Can not insert the document as the collection does not exists'
        }))
    }
});


module.exports = router;


