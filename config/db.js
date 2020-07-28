// << MongoDB Database Connection JS File >>

// << Importing packages >>
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// << Connect to MongoDB through mongoose >>
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Successfully Connected!!');

    } catch (err) {
        console.log(err.message);
        //Terminating the process with failure
        process.exit(1);

    }
}

module.exports = connectDB;