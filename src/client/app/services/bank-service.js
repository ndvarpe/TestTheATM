(function () {
    'use strict';

    angular
        .module('app')
        .factory('bankService', bankService);

    bankService.$inject = ['$http', '$q'];

    function bankService($http, $q) {
        var service = {
            getTestData: getTestData,
            updateDetails: updateDetails
        };

        return service;

        function getTestData() {
            return $http.get('/api/getatmdata').then(successHandler);
        }

        function updateDetails(details) {
            return $http.post('/api/updatedetails', details).then(successHandler);
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