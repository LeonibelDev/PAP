var authenticate = function (req, res, next) {
  // your validation code goes here. 
  var isAuthenticated = Boolean(req.session.user)

  if (isAuthenticated) {
    next()
  }
  else {
  	req.flash("redir", req.url)
    res.redirect(`/login`)
  }
}

module.exports = authenticate