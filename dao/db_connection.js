/**
 * Created by kartikmathpal on 04/03/17.
 */

//Connect To MongoDB
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

//Connection URL
var url = process.env.DB_CONNECTION;

//Choose Collection
var collections = {
    'mis'       : 'mis',
    'abinitio'  : 'abinitio',
    'gmis'      : 'gmis'
}

module.exports.collections=collections;
module.exports.url=url;
module.exports.mongo_client = MongoClient;
module.exports.assert = assert;


