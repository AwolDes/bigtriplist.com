
var fs = require('fs');
var path = require("path");
var logger = require('morgan');
var bodyParser  = require('body-parser');
var http = require('http');
var https = require('https');


var express = require("express");
var app = express();

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('certs/localhost.pem'),
  cert: fs.readFileSync('certs/bigtriplist.crt')
};

/*app.enable('trust proxy');

app.use (function (req, res, next) {
        if (req.secure) {
                // request was via https, so do no special handling
                next();
        } else {
                // request was via http, so redirect to https
                res.redirect('https://' + req.headers.host + req.url);
        }
});*/

// All static files in 'public' directory
app.use(express.static('public'));
// Get Body data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// GET and POST Info
app.use(logger('dev'));

app.get('/',function(req,res){
    
    res.sendFile(path.join(__dirname+'/index.html'));
  
});


// Create an HTTP service.
http.createServer(app).listen(4200);
// Create an HTTPS service identical to the HTTP service.
//https.createServer(options, app).listen(443);




//app.listen(4200);

console.log("Running at Port 80");


