'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

module.exports = function (app) {
	return (function () {
		function ROUTE_HELLO() {
			_classCallCheck(this, ROUTE_HELLO);
		}

		_createClass(ROUTE_HELLO, [{
			key: 'POST_Hello',
			//end constructor

			value: function POST_Hello(req, res) {
				res.send('Allo!! wellcome to /hello for method POST');
			}
		}, {
			key: 'GET_Hello',
			//end hello POST

			value: function GET_Hello(req, res) {
				res.send('Allo!!');
			} //end hello GET

		}]);

		return ROUTE_HELLO;
	})();
} //end exports 	
; //end class Route_hello