const mongoose = require('mongoose');

// Connect to MongoDB and launch gridfs-stream instance for file handling, see async imports how this is used
module.exports = (async function () {
    // connect to database
    mongoose.Promise = global.Promise;



    mongoose.connect('mongodb://localhost:27017/vocnew', {
        useNewUrlParser: true
    });

    await mongoose.connection.on('connected', () => {
        console.log("MongoDB connected");
    });

    // console.log('MongoDB connection established'));
    await mongoose.connection.on('error', () => console.log('Connection failed with - ', err));

    let Grid = require('gridfs-stream');
    Grid.mongo = mongoose.mongo;
    var gfs = await Grid(mongoose.connection.db);
    console.log("GridFS initialized");

    return {mongoose, gfs};
})();
