const mongoose = require("mongoose")

mongoose.Promise = global.Promise; 

const local_uri = 'mongodb://127.0.0.1:27017/puertaapuerta_db'
const cloud_uri = 'mongodb://uk1vv1wflizg2kta1qr6:DiXPCtXPLgNb1PFSuBAx@bzs019vhm50zxmu-mongodb.services.clever-cloud.com:27017/bzs019vhm50zxmu'

mongoose.connect((cloud_uri), {
	useNewUrlParser: true,
	useUnifiedTopology: true
}) 

module.exports = mongoose