angular.module('starter.services', [])

.factory('Campaigns', function(syncanoService) {
  // Might use a resource here that returns a JSON array

  var syncano = null; // will be used for API calls
  var campaigns = null;
  var error = null;

    return {
      // all: function (){ // can only be used with apiKey/userKey or accountKey
      //   syncanoService.getSyncano() // gets the current Syncano object
      //     .then(function(res){ // uses promises in case a userKey is needed
      //       syncano = res; // set to current Syncano Object
      //       return getCampaigns(); // Gets all campaigns /*TODO - Get permissions*/
      //     })
      //     .catch(function(err){
      //       console.log(err);
      //     });
      //     function getCampaigns(){
      //       syncano.class('campaign').dataobject().list() // Change CLASS to your class
      //       .then(function(res){
      //         console.log('campaigns', campaigns);
      //         return res.objects;
      //       })
      //       .catch(function(err){
      //         error = err;
      //       });
      //     }
      // },
      // get: function(campaignId){
      //   for (var i = 0; i < chats.length; i++) {
      //     if (chats[i].id === parseInt(chatId)) {
      //       return chats[i];
      //     }
      //   }
      //   return null;
      // }
    };

  };
});
