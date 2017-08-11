(function () {
  'use strict';
  var appctrl = angular.module('starter.controllers', []);

  appctrl.controller('AppragaCtrl', function($scope, $rootScope, $mdDialog, $timeout, $state, $mdToast, plantasServices, pragasServices, manejosServices, doencasServices, SharedObjects) {
    $scope.init = function(){
      $scope.getPraga();
      $scope.getDoenca();
      $scope.getPlanta();
      $scope.getManejo();
    }
    var templateUrlValue = this;
    var controllerValue = this;
    $scope.isEmpty = { praga: false, doenca: false, planta: false, manejo: false };
    $scope.isLoading = true;
    $scope.pageView = 'grid';
    $scope.selectedIndex = 0;
    $scope.dynamicTheme = 'default';
    $scope.pesquisa = SharedObjects.getSearch();
    $scope.selectedTab = function(){
      if ($state.is("app.pragas") || $state.is("app.cadastro.praga")) {
        $scope.selectedIndex = 0;
      } else if ($state.is("app.doencas") || $state.is("app.cadastro.doenca")) {
        $scope.selectedIndex = 1;
      } else if ($state.is("app.plantas") || $state.is("app.cadastro.planta")) {
        $scope.selectedIndex = 1;
      } else if ($state.is("app.manejos") || $state.is("app.cadastro.manejo")) {
        $scope.selectedIndex = 2;
      } else {
        $scope.selectedIndex = 0;
      }
    }
    $scope.view = function(view) {
      // SharedObjects.setDynamicTheme(view);
      // console.log(view);
      if (view == 'grid') {
        return true;
      } else if (view == 'list') {
        return false;
      }
      return true;
    }
    $scope.theme = function(theme) {
      $scope.dynamicTheme = theme;
      SharedObjects.setDynamicTheme(theme);
    }

    $scope.getPraga = function(){
      pragasServices.getTodasPragas()
      .then(function(resPraga) {
        // console.log("controller:", resPraga);
          $scope.isLoading = false;
          $scope.isEmpty.praga = false;
          $scope.listaPragas = pragasServices.listaPragas;
          // console.log($scope.listaPragas);
      }, function(error) {
        if (error.status === -1) {
          $scope.isLoading = false;
          var toast = $mdToast.simple()
          .textContent('Server returns an error status, Reconnecting.')
          .action('Error')
          .highlightAction(false)
          .position('top left')
          .theme('default');
          return $mdToast.show(toast);
          console.log('Server returns an error status');
        }
          $scope.isLoading = false;
          $scope.isEmpty.praga = true;
      });
    }
    $scope.getDoenca = function(){
      doencasServices.getTodasDoencas()
      .then(function(resDoenca) {
        // console.log("controller:", resDoenca);
          $scope.isLoading = false;
          $scope.isEmpty.doenca = false;
          $scope.listaDoencas = doencasServices.listaDoencas;
          // console.log($scope.listaDoencas);
      }, function(error) {
        if (error.status === -1) {
          $scope.isLoading = false;
          var toast = $mdToast.simple()
          .textContent('Server returns an error status, Reconnecting.')
          .action('Error')
          .highlightAction(false)
          .position('top left')
          .theme('default');
          return $mdToast.show(toast);
          console.log('Server returns an error status');
        }
          $scope.isLoading = false;
          $scope.isEmpty.doenca = true;
      });
    }
    $scope.getPlanta = function(){
      plantasServices.getTodasPlantas()
      .then(function(resPlanta) {
        // console.log("controller:", resPlanta);
          $scope.isLoading = false;
          $scope.isEmpty.planta = false;
          $scope.listaPlantas = plantasServices.listaPlantas;
          // console.log($scope.listaPragas);
      }, function(error) {
        if (error.status === -1) {
          $scope.isLoading = false;
          var toast = $mdToast.simple()
          .textContent('Server returns an error status, Reconnecting.')
          .action('Error')
          .highlightAction(false)
          .position('top center')
          .theme('default');
          return $mdToast.show(toast);
          console.log('Server returns an error status');
        }
          $scope.isLoading = false;
          $scope.isEmpty.planta = true;
      });
    }
    $scope.getManejo = function(){
      manejosServices.getTodosManejos()
      .then(function(resManejos) {
        // console.log("controller:", resManejos);
          $scope.isLoading = false;
          $scope.isEmpty.manejo = false;
          $scope.listaManejos = manejosServices.listaManejos;
          // console.log($scope.listaPragas);
      }, function(error) {
        if (error.status === -1) {
          $scope.isLoading = false;
          var toast = $mdToast.simple()
          .textContent('Server returns an error status, Reconnecting.')
          .action('Error')
          .highlightAction(false)
          .position('top right')
          .theme('default');
          return $mdToast.show(toast);
          console.log('Server returns an error status');
        }
          $scope.isLoading = false;
          $scope.isEmpty.manejo = true;
      });
    }

    $scope.customFullscreen = false;

    $scope.showAdvanced = function(ev, index) {
      if($state.is("app.plantas")){
        templateUrlValue = 'templates/plantas/planta-detail.html';
        controllerValue = 'DialogPlantaCtrl';
      } else if($state.is("app.pragas")){
        templateUrlValue = 'templates/pragas/praga-detail.html';
        controllerValue = 'DialogPragaCtrl';
      } else if($state.is("app.doencas")){
        templateUrlValue = 'templates/doencas/doenca-detail.html';
        controllerValue = 'DialogDoencaCtrl';
      } else if($state.is("app.manejos")){
        templateUrlValue = 'templates/manejos/manejo-detail.html';
        controllerValue = 'DialogManejoCtrl';
      }
      $mdDialog.show({
        locals: {index: index},
        controller: controllerValue,
        templateUrl: templateUrlValue,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
    };

    plantasServices.listaPlantas = [];
    pragasServices.listaPragas = [];
    doencasServices.listaDoencas = [];
    manejosServices.listaManejos = [];
    $scope.init();
  });
  //DIALOGS
  appctrl.controller('DialogPragaCtrl', function($scope, $mdDialog, plantasServices, pragasServices, index, SharedObjects) {
    $scope.init = function(){
      $scope.getDetalhes();
    }
    $scope.dynamicTheme = SharedObjects.getDynamicTheme();
    $scope.isLoading = true;
    $scope.getDetalhes = function(){
      pragasServices.getPragaDetalhada(index)
      .then(function(res) {
        $scope.isLoading = false;
        $scope.pragaDetalhada = pragasServices.pragaDetalhada;
        // console.log($scope.pragaDetalhada);
      })
      pragasServices.getPlantasOfPraga(index)
      .then(function(res) {
        $scope.pragaSelecionada = pragasServices.pragaSelecionada;
        // console.log($scope.pragaSelecionada);
      });
    }

    pragasServices.pragaSelecionada = [];
    pragasServices.pragaDetalhada = {};
    $scope.init();

    $scope.hide = function() {
      $mdDialog.hide();
    };
  });

  appctrl.controller('DialogDoencaCtrl', function($scope, $mdDialog, plantasServices, doencasServices, index, SharedObjects) {
    $scope.init = function(){
      $scope.getDetalhes();
    }
    $scope.dynamicTheme = SharedObjects.getDynamicTheme();
    $scope.isLoading = true;
    $scope.getDetalhes = function(){
      doencasServices.getDoencaDetalhada(index)
      .then(function(res) {
        $scope.isLoading = false;
        $scope.doencaDetalhada = doencasServices.doencaDetalhada;
        // console.log($scope.doencaDetalhada);
      })
      doencasServices.getPlantasOfDoenca(index)
      .then(function(res) {
        $scope.doencaSelecionada = doencasServices.doencaSelecionada;
        // console.log($scope.doencaSelecionada);
      });
    }

    doencasServices.doencaSelecionada = [];
    doencasServices.doencaDetalhada = {};
    $scope.init();

    $scope.hide = function() {
      $mdDialog.hide();
    };
  });

  appctrl.controller('DialogPlantaCtrl', function($scope, $mdDialog, plantasServices, pragasServices, doencasServices, index, SharedObjects) {
    $scope.init = function(){
      $scope.getDetalhes();
    }
    $scope.dynamicTheme = SharedObjects.getDynamicTheme();
    $scope.isLoading = true;
    $scope.getDetalhes = function(){
      plantasServices.getPlantaDetalhada(index)
      .then(function(res) {
        $scope.isLoading = false;
        $scope.plantaDetalhada = plantasServices.plantaDetalhada;
        // console.log($scope.plantaDetalhada);
      })
      plantasServices.getPragasOfPlanta(index)
      .then(function(res) {
        $scope.pragasOfPlantaSelecionada = plantasServices.pragasOfPlantaSelecionada;
        console.log($scope.pragasOfPlantaSelecionada);
      });
      plantasServices.getDoencasOfPlanta(index)
      .then(function(res) {
        $scope.doencasOfPlantaSelecionada = plantasServices.doencasOfPlantaSelecionada;
        console.log($scope.doencasOfPlantaSelecionada);
      });
    }

    plantasServices.plantaSelecionada = [];
    plantasServices.plantaDetalhada = {};
    $scope.init();

    $scope.hide = function() {
      $mdDialog.hide();
    };
  });

  appctrl.controller('DialogManejoCtrl', function($scope, $mdDialog, manejosServices, plantasServices, pragasServices, index, SharedObjects) {
    $scope.init = function(){
      $scope.getDetalhes();
    }
    $scope.dynamicTheme = SharedObjects.getDynamicTheme();
    $scope.isLoading = true;
    $scope.getDetalhes = function(){
      manejosServices.getManejoDetalhado(index)
      .then(function(res) {
        $scope.isLoading = false;
        $scope.manejoDetalhado = manejosServices.manejoDetalhado;
        // console.log($scope.manejoDetalhado);
      })
      manejosServices.getPlantasOfManejo(index)
      .then(function(res) {
        $scope.plantaSelecionada = manejosServices.plantaSelecionada;
        // console.log($scope.plantaSelecionada);
      })
      manejosServices.getPragasOfManejo(index)
      .then(function(res) {
        $scope.pragaSelecionada = manejosServices.pragaSelecionada;
        // console.log($scope.pragaSelecionada);
      });
    }
    manejosServices.pragaSelecionada = [];
    manejosServices.plantaSelecionada = [];
    manejosServices.manejoDetalhado = {};
    $scope.init();

    $scope.hide = function() {
      $mdDialog.hide();
    };
  });
  //CADASTROS
  appctrl.controller('CadastroPragaCtrl', function($scope, $state, $mdDialog, cadastroPragaServices, pragasServices, plantasServices, atualizaServices, SharedObjects) {
    $scope.init = function(){
      $scope.getPlanta();
    };
    $scope.isLoading = false;
    $scope.form = {}; //form.cadastro - praga-cadastro.html
    $scope.imagem = {};
    $scope.checkbox = { checked: [] };
    $scope.cadastro = { plantas: [], imagem: [] };
    $scope.listaPlantas = [];
    $scope.plantaSelecionada = [];

    $scope.getPlanta = function(){
      $scope.listaPlantas = plantasServices.listaPlantas;
    };
    $scope.getImage = function(){
      $scope.imagem = {};
      $scope.cadastro.imagem = [];
      $scope.imagem = SharedObjects.getObject();
      $scope.cadastro.imagem = $scope.imagem;
    };

    $scope.$watch(function() {
      return $scope.checkbox.checked;
      }, function(value) {
      $scope.cadastro.plantas = [];
      angular.forEach($scope.checkbox.checked, function(boolean, index) {
        boolean && $scope.cadastro.plantas.push(getPlantaByIndex(index));
      });
    }, true);
    function getPlantaByIndex(index) {
      if ($scope.listaPlantas.indexOf(index) == -1) {
        $scope.plantaSelecionada = $scope.listaPlantas[index];
        // console.log($scope.listaPlantas[index]._id);
        return $scope.listaPlantas[index]._id;
      }
    };

    $scope.atualizarPlanta = function(praga) {
      // $scope.plantaAtualizada = [];
      console.log($scope.plantaSelecionada);
      $scope.pragaAtual = praga.data._id;
      $scope.plantaSelecionada.pragas.push($scope.pragaAtual);
      console.log($scope.plantaSelecionada);
      atualizaServices.atualizaPlanta($scope.plantaSelecionada, $scope.plantaSelecionada._id)
      .then(function(res) {
        alert("Atualizou com sucesso!");
        console.log(res);
      });
      // $scope.plantaAtualizada = [];
    }

    $scope.showConfirm = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
      .title('Você deseja cadastrar esta praga?')
      .textContent('Posso cadastrar a praga para você, mas a decisão é sua.')
      .ariaLabel('É um bom dia')
      .targetEvent(ev)
      .ok('Sim faça isso!')
      .cancel('Não... Volte.');

      $mdDialog.show(confirm).then(function() {
        // console.log($scope.cadastro);
        $scope.doCadastro();
        $scope.isLoading = true;
      }, function() {
        $scope.isLoading = false;
        console.log("canceled.");
      });
    };

    $scope.doCadastro = function() {
      $scope.cadastro.date = new Date();
      $scope.getImage();
      cadastroPragaServices.postPraga($scope.cadastro)
      .then(function(res) {
        // $scope.cadastro = cadastroPragaServices.cadastrarPraga;
        $scope.atualizarPlanta(res);

        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Eba! cadastrou com sucesso!')
          .textContent('Sua praga foi enviada com êxito.')
          .ariaLabel('É um ótimo dia')
          .ok('Confirmar')
          .openFrom('#left')
          .closeTo('#right')
        );
        $scope.reset();
        $scope.isLoading = false;
        // $state.reload();
        $state.reload();
      }, function(reason) {
        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Ops! Não foi possivel cadastrar agora :/')
          .textContent('Houve um erro no envio do seu cadastro, tente novamente!')
          .ariaLabel('Não é um bom dia')
          .ok('Confirmar')
          .openFrom('#left')
          .closeTo('#right')
        );
        $scope.isLoading = false;
      });
      $scope.getPlanta();
    };

    $scope.reset = function () {
      cadastroPragaServices.cadastrarPraga = {};
      $scope.cadastro = {};
      $scope.imagem = null;
      SharedObjects.setObject(null);
      $scope.checkbox = {};
      $scope.form.cadastro.$setPristine();
      $scope.form.cadastro.$setUntouched();
    }

    $scope.init();
  });

  appctrl.controller('CadastroDoencaCtrl', function($scope, $state, $mdDialog, cadastroDoencaServices, doencasServices, plantasServices, atualizaServices, SharedObjects) {
    $scope.init = function(){
      $scope.getPlanta();
    };
    $scope.isLoading = false;
    $scope.form = {}; //form.cadastro - doenca-cadastro.html
    $scope.imagem = {};
    $scope.checkbox = { checked: [] };
    $scope.cadastro = { plantas: [], imagem: [] };
    $scope.listaPlantas = [];
    $scope.plantaSelecionada = [];


    $scope.getPlanta = function(){
      $scope.listaPlantas = plantasServices.listaPlantas;
    };
    $scope.getImage = function(){
      $scope.imagem = {};
      $scope.cadastro.imagem = [];
      $scope.imagem = SharedObjects.getObject();
      $scope.cadastro.imagem = $scope.imagem;
    };

    $scope.$watch(function() {
      return $scope.checkbox.checked;
      }, function(value) {

      $scope.cadastro.plantas = [];
      angular.forEach($scope.checkbox.checked, function(boolean, index) {
        boolean && $scope.cadastro.plantas.push(getPlantaByIndex(index));
      });
    }, true);
    function getPlantaByIndex(index) {
      if ($scope.listaPlantas.indexOf(index) == -1) {
        $scope.plantaSelecionada = $scope.listaPlantas[index];
        // console.log($scope.plantaSelecionada);
        // console.log($scope.listaPlantas[index]._id);
        console.log($scope.plantaSelecionada);
        return $scope.listaPlantas[index]._id;
      }

    };

    $scope.atualizarPlanta = function(doenca) {
      // $scope.plantaAtualizada = [];
      // console.log($scope.plantaSelecionada);
      $scope.doencaAtual = doenca.data._id;
      // angular.forEach($scope.plantaSelecionada, function(planta) {
      //   console.log(planta);
      //   planta.doencas.push($scope.doencaAtual);
      //   console.log(planta);
      //   atualizaServices.atualizaPlanta(planta, planta._id)
      //   .then(function(res) {
      //     alert("Atualizou com sucesso!");
      //     console.log(res);
      //   });
      //
      // });
      $scope.plantaSelecionada.doencas.push($scope.doencaAtual);
      console.log($scope.plantaSelecionada);
      atualizaServices.atualizaPlanta($scope.plantaSelecionada, $scope.plantaSelecionada._id)
      .then(function(res) {
        alert("Atualizou com sucesso!");
        console.log(res);
      });
      // $scope.plantaAtualizada = [];
    }

    $scope.showConfirm = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
      .title('Você deseja cadastrar esta doença?')
      .textContent('Posso cadastrar a doença para você, mas a decisão é sua.')
      .ariaLabel('É um bom dia')
      .targetEvent(ev)
      .ok('Sim faça isso!')
      .cancel('Não... Volte.');

      $mdDialog.show(confirm).then(function() {
        // console.log($scope.cadastro);
        $scope.doCadastro();
        $scope.isLoading = true;
      }, function() {
        $scope.isLoading = false;
        console.log("canceled.");
      });
    };

    $scope.doCadastro = function() {
      $scope.cadastro.date = new Date();
      $scope.getImage();
      cadastroDoencaServices.postDoenca($scope.cadastro)
      .then(function(res) {
        // console.log(res);
        $scope.atualizarPlanta(res);
        // $scope.cadastro = cadastrodoencaServices.cadastrardoenca;
        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Eba! cadastrou com sucesso!')
          .textContent('Sua doença foi enviada com êxito.')
          .ariaLabel('É um ótimo dia')
          .ok('Confirmar')
          .openFrom('#left')
          .closeTo('#right')
        );
        $scope.reset();
        $scope.isLoading = false;
        // $state.reload();
        $state.reload();
      }, function(reason) {
        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Ops! Não foi possivel cadastrar agora :/')
          .textContent('Houve um erro no envio do seu cadastro, tente novamente!')
          .ariaLabel('Não é um bom dia')
          .ok('Confirmar')
          .openFrom('#left')
          .closeTo('#right')
        );
        $scope.isLoading = false;
      });
      $scope.getPlanta();
    };

    $scope.reset = function () {
      cadastroDoencaServices.cadastrarDoenca = {};
      $scope.cadastro = {};
      $scope.imagem = null;
      SharedObjects.setObject(null);
      $scope.checkbox = {};
      $scope.form.cadastro.$setPristine();
      $scope.form.cadastro.$setUntouched();
    }

    $scope.init();
  });

  appctrl.controller('CadastroPlantaCtrl', function($scope, $state, $mdDialog, cadastroPlantaServices, pragasServices, doencasServices, plantasServices, SharedObjects) {
    $scope.init = function(){
      $scope.getPraga();
      $scope.getDoenca();
    };
    $scope.isLoading = false;
    $scope.form = {}; //form.cadastro - planta-cadastro.html
    $scope.imagem = {};
    $scope.checkbox = { pragaChecked: [], doencaChecked: [] };
    $scope.cadastro = { pragas: [], doencas: [], imagem: [] };
    $scope.listaPragas = [];
    $scope.listaDoencas = [];

    $scope.getPraga = function(){
      $scope.listaPragas = pragasServices.listaPragas;
    };
    $scope.getDoenca = function(){
      $scope.listaDoencas = doencasServices.listaDoencas;
    };
    $scope.getImage = function(){
      $scope.imagem = {};
      $scope.cadastro.imagem = [];
      $scope.imagem = SharedObjects.getObject();
      $scope.cadastro.imagem = $scope.imagem;
    };
    //Watch PragaChecked
    $scope.$watch(function() {
      return $scope.checkbox.pragaChecked;
    }, function(value) {
      $scope.cadastro.pragas = [];

      angular.forEach($scope.checkbox.pragaChecked, function(boolean, index) {
        boolean && $scope.cadastro.pragas.push(getPragaByIndex(index));
      });
    }, true);
    //Watch DoencaChecked
    $scope.$watch(function() {
      return $scope.checkbox.doencaChecked;
      }, function(value) {
      $scope.cadastro.doencas = [];

      angular.forEach($scope.checkbox.doencaChecked, function(boolean, index) {
        boolean && $scope.cadastro.doencas.push(getDoencaByIndex(index));
      });
    }, true);

    function getPragaByIndex (index) {
      if ($scope.listaPragas.indexOf(index) == -1) {
        return $scope.listaPragas[index]._id;
      }
    };
    function getDoencaByIndex (index) {
      if ($scope.listaDoencas.indexOf(index) == -1) {
        return $scope.listaDoencas[index]._id;
      }
    };

    $scope.showConfirm = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
      .title('Você deseja cadastrar esta planta?')
      .textContent('Posso cadastrar a planta para você, mas a decisão é sua.')
      .ariaLabel('É um bom dia')
      .targetEvent(ev)
      .ok('Sim faça isso!')
      .cancel('Não... Volte.')
      .openFrom('#left')
      .closeTo('#right');

      $mdDialog.show(confirm).then(function() {
        // console.log($scope.cadastro);
        $scope.doCadastro();
        $scope.isLoading = true;
      }, function() {
        $scope.isLoading = false;
        console.log('canceled.');
      });
    };
    $scope.doCadastro = function() {
      $scope.cadastro.date = new Date();
      $scope.getImage();
      cadastroPlantaServices.postPlanta($scope.cadastro)
      .then(function(res) {
        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Eba! cadastrou com sucesso!')
          .textContent('Sua planta foi enviada com êxito.')
          .ariaLabel('É um ótimo dia')
          .ok('Confirmar')
          .openFrom('#left')
          .closeTo('#right')
        );
        $scope.reset();
        $scope.isLoading = false;
        // $state.reload();
        $state.reload();
      }, function(reason) {
        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Ops! Não foi possivel cadastrar agora :/')
          .textContent('Houve um erro no envio do seu cadastro, tente novamente!')
          .ariaLabel('Não é um bom dia')
          .ok('Confirmar')
          .openFrom('#left')
          .closeTo('#right')
        );
        $scope.isLoading = false;
      });
      $scope.getPraga();
    };

    $scope.reset = function () {
      cadastroPlantaServices.cadastrarPlanta = {};
      $scope.cadastro = {};
      $scope.imagem = {};
      $scope.checkbox = {};
      $scope.form.cadastro.$setPristine();
      $scope.form.cadastro.$setUntouched();
    }

    $scope.init();
  });

  appctrl.controller('CadastroManejoCtrl', function($scope, $state, $stateParams, $mdDialog, cadastroManejoServices, pragasServices, plantasServices, SharedObjects) {
    $scope.init = function(){
      $scope.getPraga();
      $scope.getPlanta();
    };
    $scope.isLoading = false;
    $scope.form = {}; //form.cadastro - manejo-cadastro.html
    $scope.imagem = {};
    $scope.checkbox = { pragaChecked: [], plantaChecked: [] };
    $scope.cadastro = { pragas: [], plantas: [], imagem: [] };
    $scope.listaPragas = [];
    $scope.listaPlantas = [];

    $scope.getPraga = function(){
      $scope.listaPragas = pragasServices.listaPragas;
    };
    $scope.getPlanta = function(){
      $scope.listaPlantas = plantasServices.listaPlantas;
    };
    $scope.getImage = function(){
      $scope.imagem = {};
      $scope.cadastro.imagem = [];
      $scope.imagem = SharedObjects.getObject();
      $scope.cadastro.imagem = $scope.imagem;
    };
    //Watch PragaChecked
    $scope.$watch(function() {
      return $scope.checkbox.pragaChecked;
    }, function(value) {
      $scope.cadastro.pragas = [];

      angular.forEach($scope.checkbox.pragaChecked, function(boolean, index) {
        boolean && $scope.cadastro.pragas.push(getPragaByIndex(index));
      });
    }, true);
    //Watch PlantaChecked
    $scope.$watch(function() {
      return $scope.checkbox.plantaChecked;
      }, function(value) {
      $scope.cadastro.plantas = [];

      angular.forEach($scope.checkbox.plantaChecked, function(boolean, index) {
        boolean && $scope.cadastro.plantas.push(getPlantaByIndex(index));
      });
    }, true);

    function getPragaByIndex (index) {
      if ($scope.listaPragas.indexOf(index) == -1) {
        // console.log($scope.listaPragas[index]._id);
        return $scope.listaPragas[index]._id;
      }
    };
    function getPlantaByIndex (index) {
      if ($scope.listaPlantas.indexOf(index) == -1) {
        // console.log($scope.listaPlantas[index]._id);
        return $scope.listaPlantas[index]._id;
      }
    };

    $scope.showConfirm = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
      .title('Você deseja cadastrar este manejo?')
      .textContent('Posso cadastrar o manejo para você, mas a decisão é sua.')
      .ariaLabel('É um bom dia')
      .targetEvent(ev)
      .ok('Sim faça isso!')
      .cancel('Não... Volte.');

      $mdDialog.show(confirm).then(function() {
        console.log($scope.cadastro);
        $scope.doCadastro();
        $scope.isLoading = true;
      }, function() {
        $scope.isLoading = false;
        console.log('canceled.');
      });
    };

    $scope.doCadastro = function() {
      $scope.cadastro.date = new Date();
      $scope.getImage();
      cadastroManejoServices.postManejo($scope.cadastro)
      .then(function(res) {
        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Eba! cadastrou com sucesso!')
          .textContent('Seu manejo foi enviado com êxito.')
          .ariaLabel('É um ótimo dia')
          .ok('Confirmar')
          .openFrom('#left')
          .closeTo('#right')
        );
        $scope.reset();
        $scope.isLoading = false;
        $state.reload();

      }, function(reason) {
        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Ops! Não foi possivel cadastrar agora :/')
          .textContent('Houve um erro no envio do seu cadastro, tente novamente!')
          .ariaLabel('Não é um bom dia')
          .ok('Confirmar')
          .openFrom('#left')
          .closeTo('#right')
        );
        $scope.isLoading = false;
      });
      $scope.getPraga();
      $scope.getPlanta();
    };

    $scope.reset = function () {
      cadastroManejoServices.cadastrarManejo = {};
      $scope.cadastro = {};
      $scope.imagem = {};
      $scope.checkbox = {};
      $scope.form.cadastro.$setPristine();
      $scope.form.cadastro.$setUntouched();
    };

    $scope.init();
  });
  //ALTERAÇÃO
  appctrl.controller('ModificaDoencaCtrl', function($scope, $state, $mdDialog, cadastroDoencaServices, doencasServices, plantasServices, SharedObjects) {
    $scope.init = function(){
      $scope.getPlanta();
    };
    $scope.isLoading = false;
    $scope.form = {}; //form.cadastro - doenca-cadastro.html
    $scope.imagem = {};
    $scope.checkbox = { checked: [] };
    $scope.cadastro = { plantas: [], imagem: [] };
    $scope.listaPlantas = [];

    $scope.getPlanta = function(){
      $scope.listaPlantas = plantasServices.listaPlantas;
    };
    $scope.getImage = function(){
      $scope.imagem = {};
      $scope.cadastro.imagem = [];
      $scope.imagem = SharedObjects.getObject();
      $scope.cadastro.imagem = $scope.imagem;
    };

    $scope.$watch(function() {
      return $scope.checkbox.checked;
      }, function(value) {

      $scope.cadastro.plantas = [];
      angular.forEach($scope.checkbox.checked, function(boolean, index) {
        boolean && $scope.cadastro.plantas.push(getPlantaByIndex(index));
      });
    }, true);
    function getPlantaByIndex(index) {
      if ($scope.listaPlantas.indexOf(index) == -1) {
        // console.log($scope.listaPlantas[index]._id);
        return $scope.listaPlantas[index]._id;
      }
    };

    $scope.showConfirm = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
      .title('Você deseja cadastrar esta doença?')
      .textContent('Posso cadastrar a doença para você, mas a decisão é sua.')
      .ariaLabel('É um bom dia')
      .targetEvent(ev)
      .ok('Sim faça isso!')
      .cancel('Não... Volte.');

      $mdDialog.show(confirm).then(function() {
        // console.log($scope.cadastro);
        $scope.doCadastro();
        $scope.isLoading = true;
      }, function() {
        $scope.isLoading = false;
        console.log("canceled.");
      });
    };

    $scope.doCadastro = function() {
      $scope.cadastro.date = new Date();
      $scope.getImage();
      cadastroDoencaServices.postDoenca($scope.cadastro)
      .then(function(res) {
        // $scope.cadastro = cadastrodoencaServices.cadastrardoenca;
        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Eba! cadastrou com sucesso!')
          .textContent('Sua doença foi enviada com êxito.')
          .ariaLabel('É um ótimo dia')
          .ok('Confirmar')
          .openFrom('#left')
          .closeTo('#right')
        );
        $scope.reset();
        $scope.isLoading = false;
        // $state.reload();
        $state.reload();
      }, function(reason) {
        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Ops! Não foi possivel cadastrar agora :/')
          .textContent('Houve um erro no envio do seu cadastro, tente novamente!')
          .ariaLabel('Não é um bom dia')
          .ok('Confirmar')
          .openFrom('#left')
          .closeTo('#right')
        );
        $scope.isLoading = false;
      });
      $scope.getPlanta();
    };

    $scope.reset = function () {
      cadastroDoencaServices.cadastrarDoenca = {};
      $scope.cadastro = {};
      $scope.imagem = null;
      SharedObjects.setObject(null);
      $scope.checkbox = {};
      $scope.form.cadastro.$setPristine();
      $scope.form.cadastro.$setUntouched();
    }

    $scope.init();
  });
  //UTILS
  appctrl.controller('MenuCtrl', function($scope, $timeout, $mdSidenav, $log, SharedObjects) {
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.pesquisa = '';

    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
        args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
          SharedObjects.setSearch($scope.pesquisa);
        });
      }, 200);
    }

    $scope.closeLeftMenu = function () {
      $mdSidenav('left').close()
      .then(function () {
        $log.debug("close LEFT is done");
      });
    };
  });

  appctrl.controller('PictureCtrl', function($scope, $state, $mdToast, ImageService, SharedObjects) {
    $scope.image = { originalImage: [] };
    $scope.files = {};
    $scope.errFiles = {};

    $scope.uploadFiles = function(files, errFiles) {
      $scope.image.originalImage = [];
      $scope.files = files;
      $scope.errFiles = errFiles;
      if (errFiles.length != 0) {
        var toast = $mdToast.simple()
        .textContent('Arquivo invalido.')
        .action('Erro')
        .highlightAction(false)
        .position('top right')
        .theme('default');
        return $mdToast.show(toast);
      }
      angular.forEach(files, function(file) {
        ImageService.readImageFile(file, function(err, img) {
          if (err) {
            var toast = $mdToast.simple()
            .textContent('Imagem não salvada, tente novamente.')
            .action('Erro')
            .highlightAction(false)
            .position('top right')
            .theme('default');
            return $mdToast.show(toast);
          }
          $scope.image.originalImage.push(img);
        });
      });
      // console.log("uploadFiles: ", $scope.image);
      SharedObjects.setObject($scope.image.originalImage);
    }

    $scope.reset = function(){
      $scope.image = {};
      $scope.files = {};
      $scope.errFiles = {};
    }

  });

}());
