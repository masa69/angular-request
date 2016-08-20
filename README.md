# angular-request

## usage

```html
<script type="text/javascript" src="angular-request.js"></script>
```

```js
// add 'angular-request'
var app = angular.module('myApp', ['angular-request']);
```

```js
// use $request
app.controller('IndexController', ['$request', function($request) {
	// ~~ code
}]);
```


## method

### $request.post(url, param, callback)

* **url** - string
* **param** - object|null
* **callback** - function
	* **error** - boolean
	* **httpResponse** - object
	* **body** - (data)

```js
$request.post('http://api.example/url', params, function(error, httpResponse, body) {
	// ~~ code
});
```


### $request.get(url, param, callback)

* **url** - string
* **param** - object|null
* **callback** - function
	* **error** - boolean
	* **httpResponse** - object
	* **body** - (data)

```js
$request.get('http://api.example/url', params, function(error, httpResponse, body) {
	// ~~ code
});
```


### $request.upload(url, param, callback)

* **url** - string
* **param** - object|null
* **callback** - function
	* **error** - boolean
	* **httpResponse** - object
	* **body** - (data)

```js
$request.upload('http://api.example/url', params, function(error, httpResponse, body) {
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
		link: function(scopes, elements, attrs)
		{
			var element = elements[0];

			var setFile = function()
			{
				scopes.$apply(function()
				{
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


### $request.setUrl(url)

* **url** - string

```js
$request.setUrl('http://api.example/');
```


#### example

```js
$request.setUrl('http://api.example/');

// e.g. http://api.example/user/list
$request.post('user/list', params, function(error, httpResponse, body) {
	// ~~ code
});
```
