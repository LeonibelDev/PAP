const express = require("express")
const router = express.Router()
const marked = require("marked")
const path = require("path")
const fs = require("fs")


//validate session
const authenticate = require("./auth.js")
// db config

const conn = require("../config/db/conn.js")
const user_account = require("../config/db/user_schema.js")
const product = require("../config/db/product_schema.js")
const shopping_schema = require("../config/db/shopping_schema.js")


const cript = require("cript.js")
cript.setKey("hola422sysd_22agost2021")




router.get("/", async(req, res)=>{
	
	let paginate_conf = {
		limit: parseInt(req.query.limit) || 10,
		page: parseInt(req.query.page) || 1
		
	}
	
	// let query = await product.find({}, {_id: 1, product_name: 1, product_price: 1, images: 1}).sort({joining: -1})
	let query = await product.paginate({}, paginate_conf)

	console.log(query)
	res.render("home", {
		session: req.session.user,
		product: query.docs,
		paginate: query
	})
})




router.get("/login", (req, res)=>{
	res.render("login", {
		register_status: req.flash("register_status")
	})	
})


router.post("/login-session", async (req, res)=>{
	let {email, password} = req.body

		cript.encrypt(password, (err, result) => {
	    	if (err) throw err;
	    	password = result;
		})

	let query = await user_account.findOne({email: email, password: password}, 
		{_id:1, user_name:1, email:1, phone:1})

	if(query){

		req.session.user = query
		
		if (req.flash("redir")) {
			console.log(req.flash("redir"))
			res.redirect(req.flash("redir"))
		}else{
			console.log(req.flash("redir"))
			res.redirect("/")
		}

	}else{
		req.flash("register_status", "error al inicial sesion")
		res.redirect("/login")
	}


})

router.get("/new-product", authenticate, (req, res)=>{
	res.render("new_product", {
		session: req.session.user
	})
})




router.post("/new-product", (req, res)=>{
	
	let body = req.body
	body.images = []

	if (req.files.image1) {
		body.images.push(req.files.image1[0].filename)
	}
	if (req.files.image2) {
		body.images.push(req.files.image2[0].filename)
	}
	if (req.files.image3) {
		body.images.push(req.files.image3[0].filename)
	}
	if (req.files.image4) {
		body.images.push(req.files.image4[0].filename)
	}

	let query = new product(req.body)
	query.save()
	console.log(req.body)
	res.redirect("/new-product")
})




router.get("/register", (req, res)=>{
	res.render("register")	
})




router.post("/register", async (req, res)=>{

	let { password } = req.body

	cript.encrypt(password, (err, result) => {
    	if (err) throw err;
    	req.body.password = result;
	})
	
	
	let query = new user_account(req.body)
	query.save()

	console.log(req.body)

	req.flash("register_status", true)			
	

	res.redirect("/login")

})


router.get("/cart", authenticate, async(req, res)=>{

	let userQuery = await user_account.findById(req.session.user["_id"], {basket:1})
	let user_shopping = await shopping_schema.find({user_id: req.session.user["_id"], status: "espera"}, {})
	let basketRender = []
	let shopping_list = []

	for (var i = 0; i < userQuery.basket.length; i++) {
		basketRender.push(await product.findById(userQuery.basket[i], {
			images: 1,
			product_name: 1,
			product_price: 1
		})) 
	}

	for (var i = 0; i < user_shopping.length; i++) {
		shopping_list.push(await product.findById(user_shopping[i].product_id, {
			images: 1,
			product_name: 1,
			product_price: 1
		})) 
	}

	let shopping = await shopping_schema.find({user_id: req.session.user["_id"], status: "espera"}, {})


	res.render("cart", {
		session: req.session.user,
		basket: basketRender,
		shopping_media: shopping_list,
		shopping_data: user_shopping


	})
})


router.get("/product", (req, res)=>{
	res.render("product", {
		session: req.session.user
	})
})



router.get("/product/:id", async(req, res)=>{
	let { id } = req.params
	let { q } = req.query

	let queryUpdateViews = await product.update({_id: q}, {"$inc": {views: +1}})
	let query = await product.findById(q, {joining: 0, views: 0})
	
	console.log(query)

	await res.render("product_det", {
		session: req.session.user,
		product: query
	})
})



router.get("/terms_and_conditions", (req, res)=>{
	const file_md = fs.readFileSync(path.join(__dirname, "../../views/terms_and_conditions.md"), "utf8")
	res.send(marked(file_md))
})




router.post("/add-to-car", authenticate,	 async(req, res)=>{

	let query = await user_account.findById(req.session.user["_id"], {basket: 1})
	let basket = query.basket

	console.log(query)
	let inbasquet = Boolean(basket.find(element => element == req.body.id))

	console.log(inbasquet)

	if (inbasquet == true) {

		for( var i = 0; i < basket.length; i++){ 
    
	        if ( basket[i] == req.body.id) { 
	    
	            basket.splice(i, 1); 
	        }
	    	
	    }

	    //user_account.update({_id: req.session.user["_id"]}, {"$set": {basket: basket}})
	    let queryUpdate = await user_account.update({_id: req.session.user["_id"]}, {"$set": {basket: basket}})
		
		res.json({
	    	msg: "eliminado del carrito",
	    	icon: "error"
	    })
	} else {
		basket.push(req.body.id)

	    let queryUpdate = await user_account.update({_id: req.session.user["_id"]}, {"$set": {basket: basket}})
	     //user_account.update({_id: req.session.user["_id"]}, query)
	    
	    res.json({
	    	msg: "añadido al carrito",
	    	icon: "success",
	    	status: queryUpdate
	    })
	}


})

router.post("/shopping", authenticate, async(req, res)=>{

	let { product_id } = req.query
	let { quantity } = req.body


	let shopping_data = {
		user_id: req.session.user["_id"],
		user_phone: req.session.user["phone"],
		seller_phone: "", 
		product_id: product_id,
		quantity: quantity,
		status: "espera"
	}

	let query = new shopping_schema(shopping_data)
	query.save()
    
    //user_account.update({_id: req.session.user["_id"]}, query)
    

	res.json({
		compra: true
	})
	    
	


})

router.get("/user-car-counter", authenticate, async (req, res)=>{
	let query = await user_account.findById(req.session.user["_id"])

	res.json({
		basket_length: query.basket.length
	})
})


router.get("/logout", (req, res)=>{
	req.session.destroy()
	res.redirect("/")
})



router.get("/users", async (req, res)=>{
	let query = await user_account.find()
	
	res.json(query)
	
})


router.get("/cript/:key", (req, res)=>{
	
	let key = req.params["key"]
	
	cript.encrypt(key, (err, result) => {
    	if (err) throw err;
    	res.send(result);
	})
})


router.get("/decript/:key", (req, res)=>{
	
	let key = req.params["key"]
	
	cript.decrypt(key, (err, result) => {
    	if (err) throw err;
    	res.send(result);
	})
})


router.get("/admin/shopping-control-system", async (req, res)=>{
	
	let query = await shopping_schema.find().sort({joining: -1})

	for (var i = 0; i < query.length; i++) {
		query[i].user =  await user_account.findById(query[i].user_id, {phone:1, street_name: 1, house_number: 1})
		query[i].product = await product.findById(query[i].product_id, {product_name: 1, images: 1, product_price: 1, _id: 0})
	}

	console.log(query, query.length)

	res.render("shopping-control-system", {

		session: req.session.user,
		query: query
	})
})

router.get("/random", (req, res)=>{
	console.log(req.query)
})


router.post("/update/status", async (req, res)=>{
	let { id } = req.query
	let { status } = req.body

	let update = await shopping_schema.update({_id: id}, {"$set": { status: status }})
	res.redirect("/admin/shopping-control-system")
})


router.get("/api/products", async(req, res)=>{
	

	let query = await product.paginate({}, paginate_conf)

	res.json({
		query
	})
	
})

module.exports = router