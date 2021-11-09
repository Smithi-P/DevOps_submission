app.controller('vdCtrl',['$scope','$window','$sce', function($scope, $window,$sce){
  $scope.videosource = $sce.trustAsResourceUrl(window.videosource); 
  }]);
