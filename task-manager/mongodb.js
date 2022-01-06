// CRUD

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();
console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    console.log('Connected successfully!');


    const db = client.db(databaseName);

    db.collection('tasks').deleteOne({task: 'Clean the house'}).then((result) =>{
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })

});