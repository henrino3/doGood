/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, $ionicHistory,$window) {
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


    $scope.myGoBack = function() {
      $window.history.back();
    };

})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {

    ionicMaterialInk.displayEffect();
})

.controller('InterestCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();

    ionicMaterialInk.displayEffect();
})

.controller('CampaignCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, syncanoService, Campaign, $state, LocalStorage) {
  var syncano = null; // will be used for API calls
  if(LocalStorage.get('campaigns')) $scope.campaigns = LocalStorage.get('campaigns');
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
        LocalStorage.set('campaigns', JSON.stringify(res.objects))
        console.log('campaigns',$scope.campaigns);
      })
      .catch(function(err){
        $scope.error = err;
      });
  }

  $scope.openCampaign = function(){
    console.log(this.campaign);
    Campaign.set(this.campaign)
    $state.go('app.campaign')
  }
})


.controller('CampaignDetailCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, Campaign, $http,  $ionicModal, $ionicPlatform) {

  $scope.campaign = Campaign.get()
  $scope.donationAmount = 0
  $scope.amount = null

  var vodafoneApi = "http://testpay.vodafonecash.com.gh"
  var method = "POST"
  var data = {
    username: 511500,
    password: "hackathon2",
    token: "abc1234",
    amount: $scope.donationAmount
  }
  console.log($scope.campaign);
  $scope.donate = function(){
    $scope.amount = $scope.donationAmount
    document.getElementById('donatemodal').style="display:block"

    // $ionicPlatform.ready({


    // })


  }
  $scope.donation = function(amount){
    $scope.donationAmount = amount
  }


 $ionicModal.fromTemplateUrl('donate-modal.html', {
   scope: $scope,
   animation: 'slide-in-up'
 }).then(function(modal) {
   $scope.modal = modal
 })

 $scope.openModal = function() {
   $scope.modal.show()
 }

 $scope.closeModal = function() {
   if($scope.donationAmount > 0){
     var ref = window.open('templates/connectToApi.html?amount=' + $scope.donationAmount, '_blank', 'location=no', 'hidden=yes');
     ref.addEventListener('exit', function() {
       addDonation($scope.donationAmount, $scope.user, $scope.ngo)
     });
   }
   $scope.modal.hide();
 };

 $scope.$on('$destroy', function() {
   $scope.modal.remove();
 });






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

.controller('GeocampaignCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $ionicLoading, $window, $compile) {
    function initialize() {
      var myLatlng = new google.maps.LatLng(43.07493,-89.381388);

      var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map"),
          mapOptions);

      //Marker + infowindow + angularjs compiled ng-click
      var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
      var compiled = $compile(contentString)($scope);

      var infowindow = new google.maps.InfoWindow({
        content: compiled[0]
      });

      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Uluru (Ayers Rock)'
      });

        $window.google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });

      $scope.map = map;
    }

    $window.google.maps.event.addDomListener(window, 'load', initialize);

    $scope.centerOnMe = function() {
      if(!$scope.map) {
        return;
      }

      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

        $window.navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $scope.loading.hide();
      }, function(error) {
        alert('Unable to get location: ' + error.message);
      });
    };

    $scope.clickTest = function() {
      alert('Example of infowindow with ng-click')
    };


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


})

.controller('InviteCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $ionicHistory,$window) {
  $scope.myGoBack = function() {
    $window.history.back();
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
