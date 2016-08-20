angular.module('angular-request', [])
.service('$request', ['$http', '$httpParamSerializerJQLike', function($http, $httpParamSerializerJQLike) {

	'use strict';

	var self = {};

	var API_URL = '';

	self.setUrl = function(url) {
		API_URL = url;
	};

	self.get = function(url, params, callback) {

		var url = API_URL + url;
		var sendParams = (params) ? params : {};

		$http({
			method          : 'GET',
			url             : url,
			params          : sendParams,
			// cache           : $templateCache,
			paramSerializer : '$httpParamSerializerJQLike',
			headers         : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
		}).then(function(response) {
				callback(false, response, response.data);
			}, function(response) {
				callback(true, response, response.data);
			});
	};

	self.post = function(url, params, callback) {

		var url = API_URL + url;
		var sendParams = (params) ? params : {};

		$http({
			method           : 'POST',
			url              : url,
			data             : $httpParamSerializerJQLike(sendParams),
			headers          : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
			withCredentials  : true,
			transformRequest : angular.identity
		}).then(function(response) {
				callback(false, response, response.data);
			}, function(response) {
				callback(true, response, response.data);
			});
	};

	self.upload = function(url, params, callback) {

		var url = API_URL + url;
		var sendParams = new FormData();

		angular.forEach(params, function(param, key) {
			if (param) {
				sendParams.append(key, param);
			}
		});

		$http({
			method           : 'POST',
			url              : url,
			data             : sendParams,
			headers          : { 'Content-Type': undefined },
			withCredentials  : true,
			transformRequest : null
		}).then(function(response) {
				callback(false, response, response.data);
			}, function(response) {
				callback(true, response, response.data);
			});
	};

	return self;
}]);