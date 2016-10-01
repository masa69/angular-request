var app = angular.module('request-sample', ['angular-request']);

app.controller('IndexController', ['$httpRequest', function($httpRequest) {

	'use strict';

	var self = this;

	self.responseBody = '';

	self.posts = {
		title : '',
		body  : '',
	};

	self.gets  = {
		title : '',
		body  : '',
	};

	self.files = {
		image : null,
	};

	self.configs = $httpRequest.config;

	self.send = function() {

		self.responseBody = '';

		$httpRequest.post('api/post.php', self.posts, function(error, httpResponse, body) {
			console.log(error, httpResponse, body);
			self.responseBody += body;
		});

		$httpRequest.get('api/get.php', self.gets, function(error, httpResponse, body) {
			console.log(error, httpResponse, body);
			self.responseBody += body;
		});

		$httpRequest.upload('api/files.php', self.files, function(error, httpResponse, body) {
			console.log(error, httpResponse, body);
			self.responseBody += body;
		});
	};
}]);


app.directive('inputFileSetter', [function() {
	return {
		restrict: 'A',
		scope: { model: '=inputFileSetter' },
		link: function(scopes, elements, attrs) {

			var element = elements[0];

			var setFile = function() {
				scopes.$apply(function() {
					scopes.model = (element.files[0]) ? element.files[0] : null;
				});
			};

			if (element.addEventListener) {
				element.addEventListener('change', setFile);
			} else if (element.attachEvent) {
				element.attachEvent("onchange", setFile);
			}
		}
	};
}]);