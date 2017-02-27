/**
 * Created by kartikmathpal on 26/02/17.
 */


var misDAO = require('./mis_dao');
var searchByKey = function(key, collection, callback) {
    if(collection == 'mis') {
        misDAO.searchByKey(key, callback)
    }
};

var insertDocuments = function(documents, collection, callback) {
    if(collection == 'mis') {
        misDAO.insertDocuments(documents, callback)
    }
};




module.exports = {
    'searchByKey': searchByKey,
    'insertDocuments': insertDocuments
};
