var module = angular.module('app', []);

module.directive('player', ['$sce', function ($sce) {
    'use strict';
    return {
        restrict: 'E',
        scope: {
            videos: '='
        },
        link: function (scope, element, attrs) {
            var video = element.find('video');
            element.addClass('player');
            scope.playing = false;
            scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }
            
            video.on('timeupdate', function (e) {
                scope.$apply(function () {
                    scope.percent = (video[0].currentTime / video[0].duration) * 100;
                });
            });

            scope.frame = function (num) {
                if (video[0].readyState !== 0) {
                    video[0].currentTime += num;
                }
            };

            scope.toggle = function () {
                if (video[0].paused === true) {
                    video[0].play();
                    scope.playing = true;
                } else {
                    video[0].pause();
                    scope.playing = false;
                }
            };
        },
        template: '<video preload="none" poster="{{ trustSrc(videos[0].poster) }}">' +
            '<source ng-repeat="item in videos" ng-src="{{ trustSrc(item.src) }}" type="video/{{ item.type }}" />' +
            '<track kind="captions" ng-src="{{ trustSrc(videos[0].captions) }}" srclang="en" label="English" />' +
            '</video>' +
            '<progressbar value="percent" max="100"></progressbar>' +
            '<div class="controls noselect">' +
            '<a ng-click="frame(-0.04)">&lt;</a>' +
            '<a ng-click="toggle()"> <span ng-show="!playing">&#9654;</span><span ng-show="playing">&#9616;&#9616;</span> </a>' +
            '<a ng-click="frame(0.04)">&gt;</a>' +
            '</div>'
    };
}]);

module.controller('DemoCtrl', function ($scope) {

});