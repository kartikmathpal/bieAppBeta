/**
 * Created by kartikmathpal on 26/02/17.
 */
var mainDAO = require('./../dao/main_dao');


var searchByKey = function(key, collection, callback) {
    console.log('searchByKey', key)
    mainDAO.searchByKey(key, collection, callback)
};


module.exports = {
    'searchByKey': searchByKey
};