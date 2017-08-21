(function () {
  'use strict';
  var app = angular.module('starter', ['ngAnimate', 'ngMaterial', 'ngMessages',
  'ngMdIcons', 'ui.router',  'ngFileUpload', 'base64',
  'starter.filters', 'starter.controllers', 'starter.services']);

  app.run(function() { });

  app.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
    $stateProvider

    .state('app', {
      // cache: false,
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppragaCtrl',
      //      controller: 'PesquisarCtrl'
    })
    .state('app.plantas', {
      // cache: false,
      url: '/plantas',
      views: {
        'plantas': {
          templateUrl: 'templates/plantas/plantas.html',
          // controller: 'AppragaCtrl'
        }
      }
    })
    .state('app.altera-planta', {
      // cache: false,
      url: '/altera-planta',
      views: {
        'altera-planta': {
          templateUrl: 'templates/plantas/planta-altera.html',
          controller: 'ModificaPlantaCtrl'
        }
      }
    })
    .state('app.cadastro', {
      // cache: false,
      url: '/cadastros',
      views: {
        'cadastro': {
          templateUrl: 'templates/tab-cadastro.html',
        }
      }
    })
    .state('app.cadastro.praga', {
      // cache: false,
      url: '/praga',
      views: {
        'cadastro-praga': {
          templateUrl: 'templates/pragas/praga-cadastro.html',
          controller: 'CadastroPragaCtrl'
        }
      }
    })
    .state('app.cadastro.doenca', {
      // cache: false,
      url: '/doenca',
      views: {
        'cadastro-doenca': {
          templateUrl: 'templates/doencas/doenca-cadastro.html',
          controller: 'CadastroDoencaCtrl'
        }
      }
    })
    .state('app.cadastro.planta', {
      // cache: false,
      url: '/planta',
      views: {
        'cadastro-planta': {
          templateUrl: 'templates/plantas/planta-cadastro.html',
          controller: 'CadastroPlantaCtrl'
        }
      }
    })
    .state('app.cadastro.manejo', {
      // cache: false,
      url: '/manejo',
      views: {
        'cadastro-manejo': {
          templateUrl: 'templates/manejos/manejo-cadastro.html',
          controller: 'CadastroManejoCtrl'
        }
      }
    })
    .state('app.pragas', {
      // cache: false,
      // url: '/pragas/:plantaId',
      url: '/pragas',
      views: {
        'pragas': {
          templateUrl: 'templates/pragas/pragas.html',
          // controller: 'AppragaCtrl'
        }
      }
    })
    .state('app.doencas', {
      // cache: false,
      // url: '/doencas/:plantaId',
      url: '/doencas',
      views: {
        'doencas': {
          templateUrl: 'templates/doencas/doencas.html',
          // controller: 'ApdoencaCtrl'
        }
      }
    })
    .state('app.manejos', {
      // cache: false,
      // url: '/manejos/:pragaId',
      url: '/manejos',
      views: {
        'manejos': {
          templateUrl: 'templates/manejos/manejos.html',
          // controller: 'AppragaCtrl'
        }
      }
    });

    $mdThemingProvider.theme('default')
    .primaryPalette('teal', {
      'default': '500',
      'hue-1': '100',
      'hue-2': '600',
      'hue-3': 'A100',
    })
    $mdThemingProvider.theme('blue-grey')
    .primaryPalette('blue-grey', {
      'default': '500',
      'hue-1': '100',
      'hue-2': '600',
      'hue-3': 'A100',
    })
    $mdThemingProvider.theme('blue')
    .primaryPalette('blue', {
      'default': '500',
      'hue-1': '100',
      'hue-2': '600',
      'hue-3': 'A100',
    })
    $mdThemingProvider.theme('brown')
    .primaryPalette('brown', {
      'default': '500',
      'hue-1': '100',
      'hue-2': '600',
      'hue-3': 'A100',
    })
    $mdThemingProvider.theme('pink')
    .primaryPalette('pink', {
      'default': '500',
      'hue-1': '100',
      'hue-2': '600',
      'hue-3': 'A100',
    })
    .accentPalette('pink', {
      'default': 'A200',
      'hue-1': '100',
      'hue-2': '600',
      'hue-3': 'A100'
    });

    $mdThemingProvider.alwaysWatchTheme(true);

    $urlRouterProvider.otherwise('app/pragas');
  });

}());
