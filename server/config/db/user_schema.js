const { Schema, model } = require("mongoose")

const bcrypt = require("bcryptjs")
// const crypt = require("cript.js")
// crypt.setKey("hola422sysd_22agost2021")

const user_account = new Schema({
	user_name: {
		type: String
	},

	user_lastname: {
		type: String
	},

	age: {
		type: Number
	},

	email: {
		type: String
	},

	phone: {
		type: String
	},

	place: {
		type: String
	},

	street_name: {
		type: String
	},

	house_number: {
		type: Number
	},

	basket: {
		type: [String]
	},

	password: {
		type: String
	},

	shopping: {
		type: [{
			user_id: String,
			product_id: String,
			quantity: Number,

			status: String //[espera, confirmada, entregada]

		}]
	},

	joining: {
		type: Date,
		default: new Date()
	}

})

user_account.methods.encrypt = async (password) => {
	const salt = await bcrypt.genSalt(10)
	return bcrypt.hash(password, salt)
}

user_account.methods.validate_password = function (password) {
	return  bcrypt.compare(password, this.password)
}

module.exports = model("user_account", user_account)