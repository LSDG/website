angular.module('common',[]);
angular.module('services',['common']);
angular.module('directives',['common','services']);

angular.module('app',['ngTouch','common','services','directives']);