angular.module('atmApp').directive('myModal', function () {
    return {
        restrict: 'E',
        templateUrl: 'src/client/app/common/views/modal-template.html',
        controller: 'ModalController',
        controllerAs: 'viewModel',
    };
});