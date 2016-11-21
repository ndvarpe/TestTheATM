(function () {
    'use strict';

    var underscore = angular.module('underscore', []);
    underscore.factory('_', function () {
        return window._; //Underscore should be loaded on the page
    });

    angular.module('atmApp', [
        // Angular modules 
        'ui.router',
        'underscore',
        'ui.bootstrap',
        'adminApp',
        'ngResource'
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

        $stateProvider.state('admin-login', {
            url: '/adminlogin',
            templateUrl: 'src/client/app/admin/login/adminlogin.html',
            controller: 'AdminLoginController',
            controllerAs: 'vm',
        });

        $stateProvider.state('account-list', {
            url: '/accountlist',
            templateUrl: 'src/client/app/admin/accountlist/accountlist.html',
            controller: 'AccountListCotroller',
            controllerAs: 'vm',
        });

        $stateProvider.state('create-edit-account', {
            url: '/createedit/:accountNumber',
            templateUrl: 'src/client/app/admin/createeditaccount/createeditaccount.html',
            controller: 'CreateEditAccountController',
            controllerAs: 'vm',
            params: { accountNumber: "", },
        });

    })
    .run(function () {
    });
})();