const { Schema, model } = require("mongoose")
const MongoosePaginate = require("mongoose-paginate-v2")

const product = new Schema({
	images: {
		type: [String]
	},

	product_name: {
		type: String
	},
	
	product_price: {
		type: Number
	},	

	product_desc: {
		type: String
	},

	status: {
		type: String
	},

	model_or_brand: {
		type: String
	},

	quantity: {
		type: Number
	},

	color: {
		type: String
	},

	tags: {
		type: [String]
	},

	viwes: {
		type: Number,
		default: 0
	},

	search_tag: {
		type: Array
	},

	joining: {
		type: Date,
		default: new Date()
	}
})

product.plugin(MongoosePaginate)

module.exports = model("product", product)