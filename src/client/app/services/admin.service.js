(function () {
    'use strict';

    angular
        .module('adminApp')
        .factory('adminService', adminService);

    adminService.$inject = ['$http', '$q'];

    function adminService($http, $q) {
        var service = {
            login: login,
            createAccount: createAccount,
            updateAccount: updateAccount,
            removeAccount: removeAccount,
            getAccount: getAccount
        };

        return service;

        function login(username, password) {
            var query = "?username=" + username + "&password="+password;
            return $http.get("/api/getadmin" + query).then(successHandler, errorHandler);
        }

        function updateAccount(account) {
            return $http.post('/api/updateaccount', account).then(successHandler, errorHandler);
        }

        function createAccount(account) {
            return $http.post('/api/createaccount', account).then(successHandler, errorHandler);
        }

        function removeAccount(accountNumber) {
            var query = "?account_number=" + accountNumber;
            return $http.get("/api/deleteaccount" + query).then(successHandler, errorHandler);
        }

        function getAccount(accountNumber) {
            var query = "?account_number=" + accountNumber;
            return $http.get("/api/getaccount" + query).then(successHandler, errorHandler);
        }

        function successHandler(response) {
            var deferred = $q.defer();
            if (response.status === 200) {
                /*jshint -W106 */
                //jscs:disable
                deferred.resolve(response.data);
            } else if (response.status === 400) { // Bad Request
                deferred.reject(response.data.message);
            }
            return deferred.promise;
        }

        function errorHandler(response) {
            return response;
        }
    }
})();