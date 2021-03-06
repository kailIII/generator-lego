'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

module.exports = function (app) {
	return (function () {
		function ROUTE_HELLO(path) {
			_classCallCheck(this, ROUTE_HELLO);

			//begin route
			app.route(path).get(this['Hello::GET']).put(this['Hello::PUT']).post(this['Hello::POST']);
		}

		_createClass(ROUTE_HELLO, [{
			key: 'Hello::POST',
			//end router constructor

			value: function HelloPOST(req, res) {
				res.send('Allo!! wellcome to /hello for method POST');
			}
		}, {
			key: 'Hello::PUT',
			//end hello POST

			value: function HelloPUT(req, res) {
				res.send('Allo!! wellcome to /hello for method PUT');
			}
		}, {
			key: 'Hello::GET',
			//end hello PUT

			value: function HelloGET(req, res) {
				res.send('Allo!!');
			} //end hello GET

		}]);

		return ROUTE_HELLO;
	})();
} //end exports 	
; //end route
//end class Route_hello