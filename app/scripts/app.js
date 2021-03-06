'use strict';

// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('App', ['ionic', 'App.controllers', 'App.services', 'ngRoute', 'angucomplete', 'angularLocalStorage', 'hmTouchEvents', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('AppCtrl', ['$scope', '$ionicSideMenuDelegate', 'storage', 'storageKeys', function($scope, $ionicSideMenuDelegate, storage, sk) {
  $ionicSideMenuDelegate.canDragContent(false);
  $scope.settings = storage.get(sk.settings);
  storage.bind($scope, 'settings', {defaultValue: {showFound: true}, storeName: sk.settings});


}])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'views/menu.html',
      controller: 'AppCtrl'
    })
    .state('app.newlist', {
      url: '/newlist',
      views: {
        'menuContent' :{
          templateUrl: 'views/newlist.html',
          controller: 'NewlistCtrl',
        }
      }
    })
    .state('app.mylists', {
      url: '/mylists',
      views: {
        'menuContent' :{
          templateUrl: 'views/mylists.html',
          controller: 'MylistsCtrl',
        }
      }
    })
    .state('app.listItem', {
      url: '/list/:listId/item/:itemId',
      views: {
        'menuContent' :{
          templateUrl: 'views/list-item.html',
          controller: 'ListItemCtrl',
        }
      }
    })
    .state('app.list', {
      url: '/list/:listId',
      views: {
        'menuContent' :{
          templateUrl: 'views/list.html',
          controller: 'ListCtrl',
        }
      }
    })
    .state('app.selectlocation', {
      url: '/selectlocation',
      views: {
        'menuContent' :{
          templateUrl: 'views/select_location.html',
          controller: 'SelectLocationCtrl',
        }
      }
    })
    ;
  // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/app/mylists');
});

