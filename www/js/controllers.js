/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {

    ionicMaterialInk.displayEffect();
})

.controller('InterestCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();

    ionicMaterialInk.displayEffect();
})

.controller('CampaignCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, syncanoService, Campaign, $state) {
  var syncano = null; // will be used for API calls
  $scope.campaigns = null;
  $scope.error = null;
  syncanoService.getSyncano() // gets the current Syncano object
    .then(function(res){ // uses promises in case a userKey is needed
      syncano = res; // set to current Syncano Object
      getCampaigns(); // Gets all campaigns /*TODO - Get permissions*/
    })
    .catch(function(err){
      console.log(err);
    });
  function getCampaigns(){ // can only be used with apiKey/userKey or accountKey
    syncano.class('campaign').dataobject().list() // Change CLASS to your class
      .then(function(res){
        $scope.campaigns = res.objects;
        console.log('campaigns',$scope.campaigns);
      })
      .catch(function(err){
        $scope.error = err;
      });
  }

  $scope.openCampaign = function(){
    console.log(this.campaign);
    Campaign.set(this.campaign)
    $state.go('app.tab.campaigns.campaign')
  }
})


.controller('CampaignDetailCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, Campaign) {
  $scope.campaign = Campaign.get()
  console.log($scope.campaign);
})



.controller('NgoCtrl', function($scope, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, syncanoService) {
  // Set Motion
  $timeout(function() {
      ionicMaterialMotion.slideUp({
          selector: '.slide-up'
      });
  }, 300);

  $timeout(function() {
      ionicMaterialMotion.fadeSlideInRight({
          startVelocity: 3000
      });
  }, 700);
  // Set Ink
  ionicMaterialInk.displayEffect();

  $scope.NGOs = null;
  var syncano = null; // will be used for API calls
  $scope.user = null;
  $scope.error = null;
  syncanoService.getSyncano() // gets the current Syncano object
    .then(function(res){ // uses promises in case a userKey is needed
      syncano = res; // set to current Syncano Object
      $scope.user = res.userDetails
      getNGOs()
    })
    .catch(function(err){
      console.log(err);
    });
  function getNGOs(){ // can only be used with apiKey/userKey or accountKey
    syncano.class('ngos').dataobject().list() // Change CLASS to your class
      .then(function(res){
        $scope.NGOs = res.objects;
        console.log('ngos',$scope.NGOs);
      })
      .catch(function(err){
        $scope.error = err;
      });
  }
})

.controller('GeocampaignCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {

})

.controller('NotificationCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {

})


.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, syncanoService) {

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    var syncano = null; // will be used for API calls
    $scope.user = null;
    $scope.error = null;
    syncanoService.getSyncano() // gets the current Syncano object
      .then(function(res){ // uses promises in case a userKey is needed
        syncano = res; // set to current Syncano Object
        $scope.user = res.userDetails
        getCampaigns()
        getDonations()
        console.log('user', $scope.user);
      })
      .catch(function(err){
        console.log(err);
      });
    function getCampaigns(){ // can only be used with apiKey/userKey or accountKey
      syncano.class('campaign').dataobject().list() // Change CLASS to your class
        .then(function(res){
          $scope.campaigns = res.objects;
          console.log('campaigns',$scope.campaigns);
        })
        .catch(function(err){
          $scope.error = err;
        });
    }
    function getDonations(){
      syncano.class('donation').dataobject().list() // Change CLASS to your class
        .then(function(res){
          $scope.donations = res.objects;
          console.log('donations',$scope.donations);
        })
        .catch(function(err){
          $scope.error = err;
        });
    }

})


.controller('SettingsCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $ionicHistory) {
  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };

})

.controller('InviteCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $ionicHistory) {
  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };

})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})



.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {


    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {


    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

;
