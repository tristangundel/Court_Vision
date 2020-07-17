const mongoose = require('mongoose');
const config = require('config');
const mongoURI = (process.env.MONGO_URI || config.get('mongoURI'));

function connectDB() {
    mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
        .then(() => console.log("MongoDB connected"))
        .catch((err) => {
            console.log(err);
            process.exit(1);
        });
};

module.exports = connectDB;