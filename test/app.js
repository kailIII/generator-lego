var http = require('http')

/*
	Main controller 
		start puting you blocks with subgenerator like lego pieces: 
		subgenerator available:
*/

//begin express 
"use strict";

const express = require('express')//express
,		app = express()//call express like function 
,		server = http.createServer(app)//server http 

//begin set port,log
app
	.set('port', process.env.PORT || 3000)
	.set('status log', app.get('port') === 3000 ? 'dev':'combined' ) 
//end set port log


//begin setting 
 require('./setting/express')(express,app)
//end setting

//begin routes
require('./setting/express/routes')(app)
//end routes

server.listen(app.get("port"),() => console.log('Listen on port',app.get("port")) );

//end express





















