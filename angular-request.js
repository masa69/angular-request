angular.module('angular-request', [])
.service('$httpRequest', ['$http', '$httpParamSerializerJQLike', function($http, $httpParamSerializerJQLike) {
	'use strict';

	var self = {};

	self.config = {
		get: {
			method          : 'GET',
			url             : null,
			params          : null,
			// cache           : $templateCache,
			paramSerializer : '$httpParamSerializerJQLike',
			headers         : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
		},
		post: {
			method           : 'POST',
			url              : null,
			data             : null,
			headers          : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
			withCredentials  : true,
			transformRequest : angular.identity,
		},
		upload: {
			method           : 'POST',
			url              : null,
			data             : null,
			headers          : { 'Content-Type': undefined },
			withCredentials  : true,
			transformRequest : null,
		},
	};

	self.get = function(url, params, callback) {

		var sendParams = (params) ? params : {};

		self.config.get.url    = url;
		self.config.get.params = sendParams;

		send(self.config.get, function(error, httpResponse, body) {
			if (callback) callback(error, httpResponse, body);
		});
	};

	self.post = function(url, params, callback) {

		var sendParams = (params) ? params : {};

		self.config.post.url  = url;
		self.config.post.data = $httpParamSerializerJQLike(sendParams);

		send(self.config.post, function(error, httpResponse, body) {
			if (callback) callback(error, httpResponse, body);
		});
	};

	self.upload = function(url, params, callback) {

		var sendParams = new FormData();

		angular.forEach(params, function(param, key) {
			if (param) {
				sendParams.append(key, param);
			}
		});

		self.config.upload.url  = url;
		self.config.upload.data = sendParams;

		send(self.config.upload, function(error, httpResponse, body) {
			if (callback) callback(error, httpResponse, body);
		});
	};

	var send = function(config, callback) {
		$http(config).then(
			function(response) { if (callback) callback(false, response, response.data); },
			function(response) { if (callback) callback(true, response, response.data); }
		);
	};

	return self;
}]);