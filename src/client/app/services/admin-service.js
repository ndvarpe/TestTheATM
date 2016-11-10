(function () {
    'use strict';

    angular
        .module('adminapp')
        .factory('AdminService', adminService);

    adminService.$inject = ['$http', '$q'];

    function adminService($http, $q) {
        var service = {
            login: login,
            createAccount: createAccount,
            updateAccount: updateAccount,
            removeAccount: removeAccount
        };

        return service;

        function login(username, password) {
            var query = "?username=" + username + "&password="+password;
            return $http.get("/api/getadmin"+query).then(successHandler);
        }

        function updateAccount(account) {
            return $http.post('/api/updateaccount', account).then(successHandler);
        }

        function createAccount(account) {
            return $http.post('/api/createaccount', account).then(successHandler);
        }

        function removeAccount(accountNumber) {
            var query = "?account_number=" + accountNumber;
            return $http.get("/api/deleteaccount" + query).then(successHandler);
        }

        function successHandler(response) {
            var dfd = $q.defer();
            if (response.status === 200) {
                /*jshint -W106 */
                //jscs:disable
                dfd.resolve(response.data);
            } else if (response.status === 400) { // Bad Request
                dfd.reject(response.data.message);
            }
            return dfd.promise;
        }
    }
})();