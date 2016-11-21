(function () {
    'use strict';

    angular
        .module('atmApp')
        .factory('bankService', bankService);

    bankService.$inject = ['$http', '$q', '$resource'];

    function bankService($http, $q, $resource) {

        return $resource('/api/atm', {}, {
            save: {
                method: 'POST' // this method issues a POST request
            }
        }); // Note the full endpoint address
    }
})();