const mongoose = require("mongoose")

mongoose.Promise = global.Promise; 

const uri = 'mongodb://127.0.0.1:27017/puertaapuerta_db'

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}) 

module.exports = mongoose