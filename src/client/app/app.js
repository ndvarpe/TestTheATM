(function () {
    'use strict';

    var underscore = angular.module('underscore', []);
    underscore.factory('_', function () {
        return window._; //Underscore should be loaded on the page
    });

    angular.module('app', [
        // Angular modules 
        'ui.router',
        'underscore',
        'ui.bootstrap'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('login', {
            url: '/',
            templateUrl: 'src/client/app/login/login.html',
            controller: 'LoginController',
            controllerAs: 'vm',
            params: { errorMessage: null, },
        });

        $stateProvider.state('account', {
            url: '/account',
            templateUrl: 'src/client/app/account/account.html',
            controller: 'AccountController',
            controllerAs: 'vm',
            params: { accountDetails: null, },
        });

    })
    .run(function () {
    });
})();