var	app = require('express')(),
    port = process.env.PORT || 8080;

app.use(require('compression')());
app.use(require('serve-static')('assets/'));
app.use(require('serve-static')('home/'));

app.listen(port, function() {
    console.log('Server listening on localhost:'+port);
});