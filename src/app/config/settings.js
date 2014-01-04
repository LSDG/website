var configureSettings = function($appProvider) {
    var pages = {
        app: './app.html',
        home: './pages/home/home.html',
        about: './pages/about/about.html',
        lights: './pages/lights/lights.html',
        pwr: './pages/pwr/pwr.html'
    };

    var menu = {
        'MAIN': {
            'Home': {
                type:'internal',
                pageUrl: pages.home,
                iconClass: 'fa fa-home fa-fw'
            },
            'About': {
                type:'internal',
                pageUrl: pages.about,
                iconClass: 'fa fa-question-circle fa-fw'
            }
        },
        'PROJECTS': {
            'Christmas Lights': {
                type:'internal',
                pageUrl: pages.lights,
                iconClass: 'fa fa-lightbulb-o fa-fw'
            },
            'Power Wheels Racing': {
                type:'internal',
                pageUrl: pages.pwr,
                iconClass: 'fa fa-flash fa-fw'
            }
        },
        'SOCIAL MEDIA': {
            'Github': {
                type:'external',
                pageUrl:'https://github.com/LSDG/',
                iconClass: 'fa fa-github-square fa-fw'
            },
            'Twitter':{
                type:'external',
                pageUrl:'https://twitter.com/lsdginfo',
                iconClass: 'fa fa-twitter fa-fw'
            },
            'Facebook':{
                type:'external',
                pageUrl:'https://www.facebook.com/groups/378191042235127/',
                iconClass: 'fa fa-facebook fa-fw'
            }
        }
    };

    var defaultStates = {
        appUrl: pages.app,
        pageUrl: pages.home,
        sideMenuVisible: true
    };

    var config = {
        menu: menu,
        defaultStates: defaultStates
    };

    $appProvider.setConfig(config);
};

angular.module('app').config(['$appProvider',configureSettings]);