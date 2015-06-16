'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

module.exports = function (app) {
	return (function () {
		function ROUTE_LOGIN() {
			_classCallCheck(this, ROUTE_LOGIN);
		}

		_createClass(ROUTE_LOGIN, [{
			key: 'GET_Login',
			value: function GET_Login(req, res) {
				var db = app.get('db');
				db.find({}, function (err, docs) {
					if (err) return res.send(err);
					res.send(docs);
				});
			} //end login GET

		}]);

		return ROUTE_LOGIN;
	})();
} //en e
; //end class Route_login