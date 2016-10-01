# angular-request

## Install

```bash
$ bower install angular-request --save
```


## Usage

```html
<script type="text/javascript" src="angular-request.js"></script>
```

```js
// add 'angular-request'
var app = angular.module('myApp', ['angular-request']);
```

```js
// use $httpRequest
app.controller('IndexController', ['$httpRequest', function($httpRequest) {
	// ~~ code
}]);
```


## Method

### $httpRequest.post(url, param, callback)

* **url** - string
* **param** - object|null
* **callback** - function
	* **error** - boolean
	* **httpResponse** - object
	* **body** - (data)

```js
$httpRequest.post('http://api.example/url', params, function(error, httpResponse, body) {
	// ~~ code
});
```


### $httpRequest.get(url, param, callback)

* **url** - string
* **param** - object|null
* **callback** - function
	* **error** - boolean
	* **httpResponse** - object
	* **body** - (data)

```js
$httpRequest.get('http://api.example/url', params, function(error, httpResponse, body) {
	// ~~ code
});
```


### $httpRequest.upload(url, param, callback)

* **url** - string
* **param** - object|null
* **callback** - function
	* **error** - boolean
	* **httpResponse** - object
	* **body** - (data)

```js
$httpRequest.upload('http://api.example/url', params, function(error, httpResponse, body) {
	// ~~ code
});
```


#### input[type="file"]

* create directive (e.g. 'inputFileSetter')

```js
app.directive('inputFileSetter', [function()
{
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
```

* set directive in input tag as attribute (input-file-setter="")

```html
<input type="file" input-file-setter="self.files.model">
```
