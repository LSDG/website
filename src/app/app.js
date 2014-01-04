var AppStateService = function(config) {
    this.config = config;
    this.state = {
        sideMenuVisible: false,
        pageUrl: ''
    };
    this._setDefaultState();
};

AppStateService.prototype._setDefaultState = function() {
    if (!this.config.defaultStates) {
        return;
    }
    var keys = Object.keys(this.config.defaultStates);

    for (var i = 0; i < keys.length; i++) {
        this.state[keys[i]] = this.config.defaultStates[keys[i]];
    }
};

var AppStateServiceProvider = function() {
    var self = this;
    this.config = {};

    this.$get = function() {
        return new AppStateService(self.config);
    };
};

AppStateServiceProvider.prototype.setConfig = function(config) {
    this.config = config;
};

var MainApp = function($app,$window) {
    this.state = $app.state;
    this.config = $app.config;
    this.$window = $window;
};

MainApp.prototype.onMenuClick = function() {
    this.state.sideMenuVisible = !this.state.sideMenuVisible;
};

MainApp.prototype.onMenuItemClick = function(item) {
    if (item.type && item.type == 'internal') {
        //this.state.sideMenuVisible = false;
        this.state.pageUrl = item.pageUrl;
    } else if (item.type && item.type == 'external') {
        this.$window.open(item.pageUrl);
    }
};

angular.module('app').provider('$app',AppStateServiceProvider);
angular.module('app').controller('MainApp',['$app','$window',MainApp]);