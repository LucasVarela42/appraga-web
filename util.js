(function () {
  'use strict';
  var app = angular.module('starter.filters', [])

  app.filter('linebreak', function() {
    return function(text) {
      return text.replace(/\n/g, '<br>');
    }
  })
  app.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
      return $sce.trustAsHtml(text);
    }
  }]);

}());
