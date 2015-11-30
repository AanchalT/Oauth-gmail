module.exports = function(app, passport) {
     app.get('/', function(req, res) {
        res.render('index.ejs');
    });

      app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));
};
      function isLoggedIn(req, res, next) {
       if (req.isAuthenticated())
        return next();

       res.redirect('/');
   }