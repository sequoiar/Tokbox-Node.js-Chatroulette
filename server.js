var  opentok = require('opentok')
, creds = require('./config').Credentials
 , OPENTOK_API_KEY = creds.apikeyx
  , OPENTOK_API_SECRET = creds.secret
, globalSession
, globalJadeopts;

// Create a single instance of opentok
var ot = new opentok.OpenTokSDK(OPENTOK_API_KEY,OPENTOK_API_SECRET);

// Create a single global session, and will generate a unique token for each page request
ot.createSession('localhost',{},function(session){
  globalSession = session;
  
  // View configuration arrays
  globalJadeopts = {      
    locals: {
      ot: {
          apikey: OPENTOK_API_KEY,
          sid: session.sessionId,
          token: ot.generateToken(),
      },
      serveropts: {
          formActionUrl: '/',
      }
    }
  };
});


var express = require('express');
var app = express.createServer();

// Config
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/:id?', function(req, res, next) {
  var id = req.params.id;
  if (id) {
    res.render('home.jade', globalJadeopts );
  } else {
    next();
  }
});


app.get('/', function(req,res) { 
  gen = require('mersenne');

  var rte = gen.rand(5);
  res.redirect( ['/', rte].join('') );
});


// Run app
app.listen(4000);

console.log('Server started on port %s', app.address().port);