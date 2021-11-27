var authenticate = function (req, res, next) {
  // your validation code goes here. 
  var isAuthenticated = Boolean(req.session.user)

  if (isAuthenticated) {
  	res.statusCode = 200
    next()
  }
  else {
  	res.statusCode = 401
    next()
  }
}

module.exports = authenticate