'use strict';

module.exports = function() {
  var config = null;

  this.configure = function(configuration) {
    if (config === null) {
      config = configuration;
    } else {
      if (typeof console === 'object' && typeof console.warn === 'function') {
        var details = '';
        if (typeof JSON === 'object' && typeof JSON.stringify === 'function') {
          details = ' Current config: ' + JSON.stringify(config);
        }
        console.warn('Only one configuration can be used. First one would be used, second would be ignored.' + details);
      }
    }
  };

  var isPromise = function isPromise(obj) {
    return obj && typeof obj.then === 'function' && typeof obj.catch === 'function';
  };

  this.$get = ['syncano', '$rootScope', '$timeout', function(Syncano, $rootScope, $timeout) {

    if (config === null) {
      throw new Error('Try to access syncano without providing access configuration');
    }

    var syncano = new Syncano(config);

    var updateScope = function updateScope() {
      $timeout(function() {
        $rootScope.$apply();
      });
    };

    // auto wrapping, required for scope updating
    var wrap = function wrap(obj) {
      for (var key in obj) {
        if (typeof obj[key] === 'function') {
          obj[key] = (function(original) {
            return function() {
              var args = Array.prototype.slice.call(arguments, 0);
              var result = original.apply(obj, args);

              if (isPromise(result)) {
                result.then(function(data) {
                  updateScope();
                  return data;
                })
                .catch(function(err) {
                  updateScope();
                  throw err;
                });
              } else if (result && typeof result === 'object') {
                wrap(result);
              }

              return result;
            };
          }(obj[key]));
        }
      }

      return obj;
    };

    return {
      "Syncano": wrap(syncano),
      "User": config
    };
  }];
};
