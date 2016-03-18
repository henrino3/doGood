// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput', 'ngSyncano'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, syncanoConfigProvider) {

    syncanoConfigProvider.configure({
      apiKey: '0ccb75598fcf0ac6dca41b40d342b8fc4023442f',
      instance: 'patient-darkness-8396',
      username: 'heartfoundation',
      password: 'heart1234'
    })
    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/app.html',
        controller: 'AppCtrl'
    })


  .state('app.login', {
      url: '/login',
      views: {
          'menuContent': {
              templateUrl: 'templates/login.html',
              controller: 'LoginCtrl'
          }
      }
  })

  .state('app.interest', {
      url: '/interest',
      views: {
          'menuContent': {
              templateUrl: 'templates/interest.html',
              controller: 'InterestCtrl'
          }
      }
  })

  .state('app.tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html',
      views: {
          'menuContent': {
              templateUrl: 'templates/tabs.html',
              controller: 'CampaignCtrl'
          }
        }
  })


  .state('app.tab.campaign', {
      url: '/campaigns',
      views: {
          'campaign': {
              templateUrl: 'templates/campaign.html',
              controller: 'CampaignCtrl'
          }
      }
  })

  .state('app.tab.ngo', {
      url: '/ngo',
      views: {
          'ngo': {
              templateUrl: 'templates/ngo.html',
              controller: 'NgoCtrl'
          }
      }
  })

  .state('app.tab.geoCampaign', {
      url: '/geoCampaign',
      views: {
          'geoCampaign': {
              templateUrl: 'templates/geoCampaign.html',
              controller: 'GeocampaignCtrl'
          }
      }
  })

  .state('app.tab.notification', {
      url: '/notification',
      views: {
          'notification': {
              templateUrl: 'templates/notification.html',
              controller: 'NotificationCtrl'
          }
      }
  })

  .state('app.tab.profile', {
      url: '/profile',
      views: {
          'profile': {
              templateUrl: 'templates/profile.html',
              controller: 'ProfileCtrl'
          }
      }
  })


  .state('app.settings', {
      url: '/settings',
      views: {
          'menuContent': {
              templateUrl: 'templates/settings.html',
              controller: 'SettingsCtrl'
          }
      }
  })


  .state('app.invite', {
      url: '/invite',
      views: {
          'menuContent': {
              templateUrl: 'templates/invite.html',
              controller: 'InviteCtrl'
          }
      }
  })


  .state('app.campaign', {
      url: '/campaign',
      views: {
          'menuContent': {
              templateUrl: 'templates/campaign-detail.html',
              controller: 'CampaignDetailCtrl'
          }
      }
  })




  .state('app.activity', {
      url: '/activity',
      views: {
          'menuContent': {
              templateUrl: 'templates/activity.html',
              controller: 'ActivityCtrl'
          }
      }
  })







    .state('app.friends', {
        url: '/friends',
        views: {
            'menuContent': {
                templateUrl: 'templates/friends.html',
                controller: 'FriendsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })

    .state('app.gallery', {
        url: '/gallery',
        views: {
            'menuContent': {
                templateUrl: 'templates/gallery.html',
                controller: 'GalleryCtrl'
            },
            'fabContent': {
                template: '<button id="fab-gallery" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-gallery').classList.toggle('on');
                    }, 600);
                }
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
