var dbConnect = require('./db_connection');

//connect to Mongolabs
var MongoClient = dbConnect.mongo_client,assert = dbConnect.assert;//require('mongodb').MongoClient
//     , assert = require('assert');

//connection path
var connectionURL = dbConnect.url;//process.env.DB_CONNECTION;

//collection name in DB
var collectionName = dbConnect.collections.gmis;
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
    if(database) {
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
    console.log('collection:',collectionName );
    console.log('key:',key);

    var collection = database.collection(collectionName);
    console.log('Start Search ....\n')
    collection.find(
        //"FINAL_TBL": key
        {"$or":[
          {"JOB_ID":{'$regex':key,'$options':'i'}},
          {"DESCRIPTION":{'$regex':key,'$options':'i'}},
          {"TABLE_NAME":{'$regex':key,'$options':'i'}},
          {"COUNTRY":{'$regex':key,'$options':'i'}},
          {"SOURCE":{'$regex':key,'$options':'i'}},
          {"INTERFACE":{'$regex':key,'$options':'i'}},
          {"DRIVING_TABLES":{'$regex':key,'$options':'i'}},
          {"HISTORY":{'$regex':key,'$options':'i'}}
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
  console.log('insertDocuments', documents);
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
