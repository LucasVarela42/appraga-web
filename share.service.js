(function () {
'use strict';

angular.module('starter')
    .factory('SharedObjects', function () {
        var object = {};
        var dynamicTheme = '';
        var search = '';
        return {
            getObject: function () {
            //   console.log("getObject: ", object);
                return object;
            },
            setObject: function(value) {
                object = value;
                // console.log("setObject: ",object);
            },
            getDynamicTheme: function() {
                return dynamicTheme;
            },
            setDynamicTheme: function(theme) {
                dynamicTheme = theme;
                // console.log("setObject: ",object);
            },
            getSearch: function() {
                return search;
            },
            setSearch: function(text) {
                search = text;
                // console.log("setObject: ",object);
            }
        };
        // console.log(object);
    });
}());
