var MenuDirective = function() {
    var MenuLink = function(scope,ele,attr) {
        scope.selectedItem = '';
        scope.headers = Object.keys(scope.settings);

        scope.getGroupKeys = function(groupName) {
            return Object.keys(scope.settings[groupName]);
        };

        scope._onClickItem = function(itemGroup,itemName) {
            var itemObj = scope.settings[itemGroup][itemName];
            scope.selectedItem = itemName;
            itemObj['name'] = itemName;
            scope.onClickItem({item:itemObj});
        };
    };

    return {
        restrict: 'E',
        transclude: false,
        templateUrl: './components/menu/menu.html',
        replace:true,
        scope: {
            settings: '=',
            onClickItem: '&'
        },
        link: MenuLink
    };
};

angular.module('directives').directive('sideMenu',[MenuDirective]);

