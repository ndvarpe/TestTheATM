describe('calculator', function () {

    beforeEach(module('app'));

    var $controller, $bankService;

    beforeEach(inject(function (_$controller_, bankService) {
        $controller = _$controller_;
        $bankService = bankService;
    }));

    describe('Login Controller', function () {
        it('Should compile controller and set title as login', function () {
            var $scope = {};
            var controller = $controller('LoginController', { bankService: $bankService });
            expect(controller.title).toEqual('login');
        });
    });
});