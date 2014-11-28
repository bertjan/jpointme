(function () {
    'use strict';

    angular.module('j.point.me').directive('autoScroll', function () {
        return {
            link: function postLink(scope, element) {
                scope.$watch(function () {
                        return element.children().length;
                    },
                    function () {
                        element.animate({ scrollTop: element.prop('scrollHeight')}, 1000);
                    }
                );
            }
        };
    });
}());