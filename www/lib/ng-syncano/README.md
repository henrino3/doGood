# ng-syncano

[![NPM](https://img.shields.io/npm/v/ng-syncano.svg)](https://www.npmjs.com/package/ng-syncano)

## Getting Started

Using our Angular Service is simple! After you set it up, you'll be able to use Syncano API calls within Angular without having to import `syncano.js` anywhere else in your code.

If this is your first time using Angular, please take a look at our blog post <a href="https://www.syncano.io/blog/intro-angular-js/?utm_source=github&utm_medium=readme&utm_campaign=ng-syncano" target="_blank">Intro to Angular.js</a> or the <a href="https://angularjs.org/#the-basics">AngularJS</a> homepage.

This library is intended to be used with a [Syncano](http://www.syncano.io/?utm_source=github&utm_medium=readme&utm_campaign=ng-syncano) account. If you don't already have one - you can sign up [here](https://dashboard.syncano.io/?utm_source=github&utm_medium=readme&utm_campaign=ng-syncano).

**Install from Bower**

```bash
bower install ng-syncano --save
```

**Install from NPM**

```bash
npm install ng-syncano --save
```

## Injecting ngSyncano

Once you have put the `ng-syncano.js` or `ng-syncano.min.js` file in your `js` or `services` folder, you'll need to import ngSyncano so you can use it's API calls and services.

In your `app.js` file or the file that contains code that looks something like this:

```
var myApp = angular.module('myApp', []);
```

You'll need to insert the ngSyncano keyword in between the brackets like this:

```
var myApp = angular.module('myApp', ['ngSyncano']);
```

## Setting Up The Config

Next you'll need to set up the config part of your app, so that Syncano knows what your API details are.

In that same `app.js` file, put the following code:

```javascript
myApp.config(function (syncanoConfigProvider) {
    syncanoConfigProvider.configure({
        apiKey: 'APIKEY/ACCOUNTKEY',
        instance: 'INSTANCE'
    });
});
```

*Be aware that if you use more than one config for ngSyncano, only the first one will be used!*

### Config with a User Key

Most API calls will require more authentication or a higher level API key. The one we suggest using for your public app is a public API key. This key will need a user key to provide you with access to more permissions and API calls.

We have set up the ngSyncano library so you can start your app with a `username` and `password`. The code below shows you how!

```javascript
myApp.config(function (syncanoConfigProvider) {
	  syncanoConfigProvider.configure({ // enter Syncano details
		    apiKey: 'MY_PUBLIC_API_KEY',
		    instance: 'MY_INSTANCE'
		    username: 'USERNAME',
		    password: 'PASSWORD'
	  });
});
```

**This would replace your original config function!**

## Using the `syncanoService` In Your Controller

After you have completely set up the config for ngSyncano in your app, you will need to inject the Syncano Service into your controller.

To use the Syncano API calls in your Angular controller, just include `syncanoService` in the `function` section of your controller. The `syncanoService` will allow you to do a few things:

1. Get the current Syncano object (global)
2. Add a User Key
3. Remove a User Key

Then you just use the regular JS Library API calls to perform the rest of your Syncano API calls.

```javascript
myApp.controller('SyncanoController', function ($scope, syncanoService) {
	var syncano = null; // will be used for API calls
	$scope.dataRetrievedFromSyncano = null;
	$scope.error = null;

	syncanoService.getSyncano() // gets the current Syncano object
		.then(function(res){ // uses promises
			syncano = res; // set to current Syncano Object
			
			/* TO REMOVE A USER */
			//syncanoService.removeSyncanoUser(); // returns string

			/* TO LOG IN */
			//var user = {
				//"username": "USERNAME",
				//"password": "PASSWORD"
			//};
			//syncanoService.setSyncanoUser(user)
				//.then(function(res){
					//syncano = res;
				//})
				//.catch(function(err){
					//console.log(err);
				//});
		})
    .catch(function(err){
			console.log(err);
		});
});
```

The `syncano` object will contain all of your API details, so you won't need to type them in again. You'll notice that the `getSyncano()` call expects a promise. This is done so that you can choose to either include user info at the beginning, or leave them out, but the library will always send a promise back.

>**Note: All functions needing Syncano data will need to be called in the `.then()` of the `getSyncano()` call! This is because that call is asynchronous.**

### **For more details see `example.html` in this repo.**

Once you have imported `syncanoService` and have used it for an API call, the last step is to display it in the DOM or `html` page! That's where you get creative ;)

Look <a href="http://docs.syncano.io/?utm_source=github&utm_medium=readme&utm_campaign=syncano-js" target="_blank">here</a> for more examples on our JS Library API calls.

### Contributors

* Devin Visslailli - [twitter](https://twitter.com/devinviss), [github](https://github.com/devinviss)
* Kelly Andrews  - [twitter](https://twitter.com/kellyjandrews), [github](https://github.com/kellyjandrews)

### Change Log
* **2.0.0** - 2016-01-22
    * Gives user ability to add User Keys
* **1.0.0** - 2015-11-07
    * Initial Release
