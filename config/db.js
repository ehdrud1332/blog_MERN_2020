const mongoose = require('mongoose');

const dboptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

const connectDB = async() => {
    await mongoose
        .connect(process.env.MONGO_URI, dboptions)
        .then(() => console.log("MongoDB Connected"))
        .catch(err => console.log(err.message))
}

module.exports = connectDB();
