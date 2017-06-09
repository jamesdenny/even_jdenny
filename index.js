var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    bodyParser = require('body-parser'),
	nodemailer = require('nodemailer');

/* APP */
app.locals.domain = "localhost";

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* STATIC */
app.use(require('compression')());
app.use(require('serve-static')('assets/'));
app.use(require('serve-static')('home/'));

/* CONTACT FORM */
app.post('/contact', urlencodedParser, function(req, res) {
    console.log(req);
    // TODO: cehck sender ip/host to limit sends! - how to store last sent??
    if (req.body && req.body.submits < 5) {
    	var success,
		    transporter = nodemailer.createTransport({
			    host: 'auth.smtp.1and1.co.uk',
			    port: '587',
			    auth: {
				    user: 'james@jdenny.co.uk', // Your email id
				    pass: 'q1azderfit' // Your password
			    }
		    }),
	        mailOptions = {
			    from: req.body.name + '<' + req.body.email + '>', // sender address
			    to: 'james.denny@gmail.com', // list of receivers
			    subject: '[jdenny.co.uk Contact] from ' + req.body.name, // Subject line
			    html: '<b>From: </b> ' + req.body.name + ' &lt;' + req.body.email + '&gt;' +
	                '<br /><br />' + req.body.message
		    };
	    transporter.sendMail(mailOptions, function(error, info){
		    if(error){
			    console.log('[sendMail Error]', error);
			    res.status(500).json('Error sending message. Please check your details and try again.');
		    } else {
			    console.log('Message sent: ' + info.response);
				res.json({message: 'Thank you ' + req.body.name + ', your message has been sent.'});
		    }
	    });

    }
    else {
	    res.status(400).json({ message: 'Error sending message, please try again.' });
    }
});

app.listen(port, function() {
    console.log('Server listening on localhost:'+port);
});