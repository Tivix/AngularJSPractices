'use strict';

angular.module('angularJspracticesApp')
  .service('Request', function Request($http, $q, $location, $window) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var loading = false;
    var service = {

        // JSONP functionality allows requests to be made across domains.
        // This has not been updated with enhancements for this project.
        jsonp: function(args){
            // Default the arguments list
            args = args || {};
            // Determine which separator to use for URL encoding.
            var x = "?";
            if(args.url.indexOf("?") != -1){
                x = "&";
            }
            // Append callback param so AngularJS can process the response.
            args.url += x+"callback=JSON_CALLBACK";
            // Setup containers and flags used by request.
            var deferred = $q.defer(),
                url = args.url || this.url,
                method = args.method || "GET",
                params = args.params || {},
                data = args.data || {};
            // Set flag to indicate loading has begun
            this.startLoading();
            // Fire the request
            $http.jsonp(url, {
                method: method.toUpperCase(),
                params: params,
                data: data
            })
            .success(angular.bind(this, function(data, status, headers, config) {
                // Resolve promise.
                deferred.resolve(data, status);
            }))
            .error(angular.bind(this, function(data, status, headers, config) {
                    // Handle error case.
                    console.log("error syncing with: " + url + "\nHTTP Error " + status);
                    // Set request status
                    if(data){
                        data.status = status;
                    }
                    // If server responds with FORBIDDEN 
                    if(status == "403"){
                    }
                    // If the server responds with SERVICE UNAVAILABLE
                    if(status == "503"){
                    }
                    // If there is no response...
                    if(status == 0){
                        // and data is empty, then there was a connection error.
                        if(data == ""){
                            // Inject a non field error alerting the user
                            // that there's been a connection error.
                            data = {};
                            data['status'] = 0;
                            data['non_field_errors'] = ["Could not connect. Please try again."];
                        }
                        // or if the data is null, then there was a timeout.
                        if(data == null){
                            // Inject a non field error alerting the user
                            // that there's been a timeout error.
                            data = {};
                            data['status'] = 0;
                            data['non_field_errors'] = ["Server timed out. Please try again."];
                        }
                    }
                    // Resolve the promise
                    deferred.reject(data, status, headers, config);
                }));
                // Return the promise for the request
                return deferred.promise;
            },

        // sync handles GET and POST requests using the browser's
        // AJAX functionality.  Cross domain requests are only possible
        // with a server that's enabled CORS.
        // ALL REQUESTS TIMEOUT AFTER 10s
        sync: function(args) {
            // Default the arguments list
            params = args.params || {}
            args = args || {};
            // Configure containers and flags
            var deferred = $q.defer(),
                url = args.url || this.url,
                method = args.method || "GET",
                params = params,
                data = args.data || {},
                timeout = args.timeout || 10000;
            // IMPORTANT: withcred must be set to true in order to
            // use the cookies set by Django.  Otherwise all requests
            // will be made without authorization.
            var withcred = false;
            // Fire the request, as configured.
            $http({
                url: url,
                withCredentials: withcred,
                method: method.toUpperCase(),
                params: params,
                data: data,
                timeout: timeout
            })
            .success(angular.bind(this,function(data, status, headers, config) {
                // Resolve promise.
                deferred.resolve(data, status);
            }))
            .error(angular.bind(this, function(data, status, headers, config) {
                    // Handle error case.
                    console.log("error syncing with: " + url + "\nHTTP Error " + status);
                    // Set request status
                    if(data){
                        data.status = status;
                    }
                    // If server responds with FORBIDDEN 
                    if(status == "403"){
                    }
                    // If the server responds with SERVICE UNAVAILABLE
                    if(status == "503"){
                    }
                    // If there is no response...
                    if(status == 0){
                        // and data is empty, then there was a connection error.
                        if(data == ""){
                            // Inject a non field error alerting the user
                            // that there's been a connection error.
                            data = {};
                            data['status'] = 0;
                            data['non_field_errors'] = ["Could not connect. Please try again."];
                        }
                        // or if the data is null, then there was a timeout.
                        if(data == null){
                            // Inject a non field error alerting the user
                            // that there's been a timeout error.
                            data = {};
                            data['status'] = 0;
                            data['non_field_errors'] = ["Server timed out. Please try again."];
                        }
                    }
                    // Resolve the promise
                    deferred.reject(data, status, headers, config);
                }));
                // Return promise to calling function.
                return deferred.promise;
            }

    };
    // The service is returned as a singleton.
    return service;
  });

