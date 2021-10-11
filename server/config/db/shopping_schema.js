const { Schema, model } = require("mongoose")

const shopping_schema = new Schema({
	
	user_id: {
		type: String
	},

	product_id: {
		type: String
	},

	quantity: {
		type: Number
	},

	user_id: {
		type: String
	},

	seller_phone: {
		type: String
	},

	status: {
		type: String
	},

	joining: {
		type: Date,
		default: new Date()
	}

})

module.exports = model("shopping", shopping_schema)