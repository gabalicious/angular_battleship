describe('Unit: Form', function () {
    var ctrl, messages;

    beforeEach(module('myApp.form'));
    beforeEach(module('myApp.models.messages'));
    beforeEach(module('ui.router'));

    beforeEach(inject(function ($controller, _Messages_) {
        messages = _Messages_;

        // spyOn(messages, 'setMessage');
        // spyOn(messages, 'getMessage').and.returnValue('Hello!');

        ctrl = $controller('FormCtrl', {
            Messages: messages
        });
    }));

    describe('Form Route', function () {
        var $state,
            $rootScope,
            state = 'form';

        beforeEach(inject(function (_$state_, $templateCache, _$rootScope_) {
            $state = _$state_;
            $rootScope = _$rootScope_;

            $templateCache.put('app/form/form.tmpl.html', '');
        }));

        it('should respond to URL', function() {
            expect($state.href(state)).toEqual('#/form');
        });

        it('should activate the state', function() {
            $state.go(state);
            $rootScope.$digest();
            expect($state.current.name).toBe(state);
        });
    });

    describe('FormCtrl', function () {
        it('should have title defined', function () {
            expect(ctrl.title).toBeDefined();
        });

        it('should have body defined', function () {
            expect(ctrl.body).toBeDefined();
        });

    });
});
