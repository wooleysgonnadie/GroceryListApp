'use strict';

angular.module('App.services')
  .service('gmaps', ['$http', '$q', function Gmaps($http, $q) {
  	var apiKey = 'AIzaSyCEzTx6QcQ0JzHkzoyFnFVEzGAtbBKgyok';
    var lon, lat;
    return {
    	setLon:function(longitude){
    		lon = longitude;
    	},
    	setLat:function(latitude){
    		lat = latitude;
    	},
    	nearbyStores: function(type, keyword){
            type = type || 'grocery_or_supermarket';
            if(type === 'search' && keyword.isBlank()){
                keyword = 'store';
            }
    		var ret = $q.defer();
    		var onSuccess = function(position) {
    		    // alert('Latitude: '          + position.coords.latitude          + '\n' +
    		    //       'Longitude: '         + position.coords.longitude         + '\n' +
    		    //       'Altitude: '          + position.coords.altitude          + '\n' +
    		    //       'Accuracy: '          + position.coords.accuracy          + '\n' +
    		    //       'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
    		    //       'Heading: '           + position.coords.heading           + '\n' +
    		    //       'Speed: '             + position.coords.speed             + '\n' +
    		    //       'Timestamp: '         + position.timestamp                + '\n');
    		    lat = position.coords.latitude;
    		    lon = position.coords.longitude;
    		    ret.resolve(position);
    		};

    		var onError = function(error) {
                console.log('Error getting location', error);
    		    // alert(error);
    		};

    		navigator.geolocation.getCurrentPosition(onSuccess, onError);
    		return ret.promise.then(function(){

    			var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'+
    						'rankby=distance';
                            // '&radius=50000';
                console.log(keyword);
                if(keyword && !keyword.isBlank()){
                    url+= '&keyword='+keyword;
                }
                if(type && !type.isBlank()){
                    url+= '&types='+type;
                }
                    url+=   '&location='+lat+','+lon+
                            '&sensor=true'+
                            '&opennow=true'+
                            '&key='+apiKey;
                    console.log(url);			
	    			return $http({
		    			method: 'GET',
		    			url: url
		    		});
	    		});
    	   }
        };
    }
]);
