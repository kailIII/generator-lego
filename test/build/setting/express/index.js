'use strict';
/*
	/////////////////////////////
		EXPRESS CONFIGURATIONS
	/////////////////////////////

	Buid you setting stack with this commands:
		yo lego:express set 
*/

module.exports = function (express, app) {
	//begin setting
	app.use(require('cors')()) //middlewares acess among server's https://www.npmjs.com/package/cors
	.use(require('morgan')(app.get('status log'))) //middleware debug https://www.npmjs.com/package/morgan
	.use(require('method-override')()) //middleware put and delete request https://www.npmjs.com/package/method-override
	.use(require('multer')()) //middleware parse files and post request https://www.npmjs.com/package/multer
	.param('name', function (req, res, next, name) {
		req.name = name;next();
	}) //name param
	.param('c', function (req, res, next, c) {
		req.c = c;next();
	}) //c param
	.param('b', function (req, res, next, b) {
		req.b = b;next();
	}) //b param
	.param('y', function (req, res, next, y) {
		req.y = y;next();
	}) //x param
	.param('x', function (req, res, next, x) {
		req.x = x;next();
	}) //x param
	.param('z', function (req, res, next, z) {
		req.z = z;next();
	}) //z param
	.param('a', function (req, res, next, a) {
		req.a = a;next();
	}) //a param
	.param('b', function (req, res, next, b) {
		req.b = b;next();
	}) //b param
	.param('init', function (req, res, next, init) {
		req.init = init;next();
	}) //init param
	.param('end', function (req, res, next, end) {
		req.end = end;next();
	});
};
//end param
//end setting