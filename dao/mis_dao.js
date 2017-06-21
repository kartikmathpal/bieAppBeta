/**
 * Created by kartikmathpal on 26/02/17.
 */

//connect to Mongolabs
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

//connection path
var connectionURL = process.env.DB_CONNECTION;
//collection name in DB
var collectionName = "mis";
//set db as null initially
var database = null;


var createDatabaseConnectionAndExecuteTask = function(task, taskArguments, taskCallback) {
    MongoClient.connect(connectionURL, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        database = db;
        task(taskArguments, taskCallback);
        // db.close();
    });
};

//search function
var searchByKey= function(key, callback){
    if(database) { //check for MongoDB Connectivity
        searchByKeyTask(
            taskArguments = {
                'key': key
            },
            taskCallback = callback
        )
    } else {
        createDatabaseConnectionAndExecuteTask(
            task = searchByKeyTask, taskArguments = {
                'key': key
            },
            taskCallback = callback
        )
    }
};


// searching takes place here:(MongoDB)
var searchByKeyTask = function(taskArguments, callback) {
    var key = taskArguments.key;
    console.log('key:',key);

    var collection = database.collection(collectionName);
    collection.find(
        //"FINAL_TBL": key
        // {"$or":[{"FINAL_TBL":{'$regex':key,'$options':'i'}},{"DRIVING_TBL":{'$regex':key,'$options':'i'}},{"AGG_TBL":{'$regex':key,'$options':'i'}},{"SOURCE":{'$regex':key,'$options':'i'}},
        //     {"JOB":{'$regex':key,'$options':'i'}}, {"APPLN":{'$regex':key,'$options':'i'}},{"DESCRIPTION":{'$regex':key,'$options':'i'}}]}
        // ).toArray(function(err, docs) {
        {"$or":[
            {"FINAL_TBL":{'$regex':key,'$options':'i'}},
            {"DRIVING_TBL":{'$regex':key,'$options':'i'}},
            {"SOURCE_TEAM":{'$regex':key,'$options':'i'}},
            {"JOB":{'$regex':key,'$options':'i'}},
            {"APPLN":{'$regex':key,'$options':'i'}},
            {"DESCRIPTION":{'$regex':key,'$options':'i'}},
            {"HISTORY":{'$regex':key,'$options':'i'}},
            {"SRC_FILE_NAME":{'$regex':key,'$options':'i'}},
            {"TGT_FILE_NAME":{'$regex':key,'$options':'i'}},
            {"TGT_TEAM":{'$regex':key,'$options':'i'}},
            {"TEAM_DL":{'$regex':key,'$options':'i'}},
            {"TEAM_CONTACT_NUM":{'$regex':key,'$options':'i'}}

            ]
        }
    ).toArray(function(err, docs) {
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



var insertDocuments = function(documents, callback) {
    if(database) {
        insertDocumentsTask(
            taskArguments = {
                'documents': documents
            },
            taskCallback = callback
        )
    } else {
        createDatabaseConnectionAndExecuteTask(
            task = insertDocumentsTask,
            taskArguments = {
                'documents': documents
            },
            taskCallback = callback
        )
    }
};

var insertDocumentsTask = function(taskArguments, taskCallback) {
    var collection = database.collection(collectionName);
    var documents = taskArguments.documents;
    collection.insertMany(documents, function (err, result) {
        taskCallback(err, result);
    })
};

module.exports.searchByKey = searchByKey;
module.exports.insertDocuments = insertDocuments;
