'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

module.exports = (function () {
	function ROUTE_TEST() {
		_classCallCheck(this, ROUTE_TEST);
	}

	_createClass(ROUTE_TEST, [{
		key: 'GET_Test',
		//end constructor
		value: function GET_Test(req, res) {
			res.send('Allo!!');
		} //end test GET

	}]);

	return ROUTE_TEST;
})(); //end class Route_test