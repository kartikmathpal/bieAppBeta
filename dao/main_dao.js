/**
 * Created by kartikmathpal on 26/02/17.
 */


var misDAO = require('./mis_dao');
var abinitioDAO = require('./abinitio_dao');
var gmisDAO = require('./gmis_dao');

var searchByKey = function(key, collection, callback) {
    if(collection === 'mis') {
        misDAO.searchByKey(key, callback)
    }
    else if (collection === 'abinitio') {
            abinitioDAO.searchByKey(key, callback)

    }
    else if (collection === 'gmis') {
          gmisDAO.searchByKey(key, callback)

    }
};

var insertDocuments = function(documents, collection, callback) {
    if(collection == 'mis') {
        misDAO.insertDocuments(documents, callback)
    }
    else if(collection=='abinitio'){
        abinitioDAO.insertDocuments(documents, callback)
       
    }
    else if(collection=='gmis'){
        gmisDAO.insertDocuments(documents, callback)
    }

};






module.exports = {
    'searchByKey': searchByKey,
    'insertDocuments': insertDocuments
};
