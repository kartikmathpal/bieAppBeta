/**
 * Created by kartikmathpal on 26/02/17.
 */

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');


var connectionURL = process.env.DB_CONNECTION;
var collectionName = "mis";

var database = null;

var searchByKey= function(key, callack){
    if(database) {
        getEntryByKey(key, callack)
    } else {
        MongoClient.connect(connectionURL, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");
            database = db;
            getEntryByKey(key, callack)
            // db.close();
        });
    }
};


var getEntryByKey = function(key, callback) {
    console.log('key:',key);
    var collection = database.collection(collectionName);
    collection.find({
        // "FINAL_TBL": key
    }).toArray(function(err, docs) {
        console.log('err', err);
        if(err) {
            callback(err);
        } else {
            console.log('docs', docs);
            callback(docs);
        }
        // res.end(docs)
    })
};






module.exports.searchByKey = searchByKey;