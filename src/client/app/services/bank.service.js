(function () {
    'use strict';

    angular
        .module('atmApp')
        .factory('bankService', bankService);

    bankService.$inject = ['$http', '$q', '$resource'];

    function bankService($http, $q, $resource) {
        var service = {
            getTestData: getTestData,
            updateDetails: updateDetails
        };

        return $resource('/api/atm', {}, {
            save: {
                method: 'POST' // this method issues a PUT request
            }
        }); // Note the full endpoint address

        return service;

        function getTestData() {
            return $http.get('/api/getatmdata').then(successHandler, errorHandler);
        }

        function updateDetails(details) {
            return $http.post('/api/updateaccount', details).then(successHandler, errorHandler);
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