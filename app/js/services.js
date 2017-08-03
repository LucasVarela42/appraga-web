(function () {
'use strict';
  var app = angular.module('starter.services', []);

  app.service('pragasServices', function($q, $http){
    var pragas = this;
    pragas.listaPragas = [];
    pragas.pragaDetalhada = {};
    pragas.pragaSelecionada = [];

    pragas.getTodasPragas = function(){
      var defer = $q.defer();
      // $http.get('https://api.mlab.com/api/1/databases/appraga/collections/pragas?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
      $http.get('https://api.mlab.com/api/1/databases/appraga/collections/pragas?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
      .then(function(response){
        if (Object.keys(response.data).length == 0 ) {
          defer.reject(response.data);
        } else {
          angular.forEach(response.data, function(carregar){
            pragas.listaPragas.push(carregar);
            defer.resolve(carregar);
          });
        }
      }, function(error) {
        // alert("Server returns response with an error status.");
        // console.log('error:', error);
        defer.reject(error);
      });
      return defer.promise;
    }

    pragas.getPragaDetalhada = function(pragaId){
      var defer = $q.defer();
      var pragaIdJson = angular.toJson(pragas.listaPragas[pragaId]._id);
      // $http.get('https://api.mlab.com/api/1/databases/appraga/collections/pragas?q={%22id%22:%20%22'+ pragaId +'%22}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
      $http.get('https://api.mlab.com/api/1/databases/appraga/collections/pragas?q={_id:'+pragaIdJson+'}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
      .then(function(response){
          pragas.pragaDetalhada = response.data;
          defer.resolve(response);
      }, function(response) {
        alert("Server returns response with an error status.");
        defer.reject(response);
      });
      return defer.promise;
    }

    pragas.getPlantasOfPraga = function(pragaId){
      var defer = $q.defer();
      var plantaIdJson;
      angular.forEach(pragas.listaPragas[pragaId].plantas, function(planta){
        plantaIdJson = angular.toJson(planta);

        $http.get('https://api.mlab.com/api/1/databases/appraga/collections/plantas?q={_id:'+plantaIdJson+'}&s={"_id": 1}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
        .then(function(response){
          angular.forEach(response.data, function(carregar){
            pragas.pragaSelecionada.push(carregar);
            defer.resolve(response);
          });
        }, function(response) {
          alert("Server returns response with an error status.");
          defer.reject(response);
        });
      });
      return defer.promise;
    }

    // console.log("Chegou pragasServices",pragas);
    return pragas;
  });

  app.service('doencasServices', function($q, $http){
    var doencas = this;
    doencas.listaDoencas = [];
    doencas.doencaDetalhada = {};
    doencas.doencaSelecionada = [];

    doencas.getTodasDoencas = function(){
      var defer = $q.defer();
      // $http.get('https://api.mlab.com/api/1/databases/appraga/collections/doencas?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
      $http.get('https://api.mlab.com/api/1/databases/appraga/collections/doencas?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
      .then(function(response){
        if (Object.keys(response.data).length == 0 ) {
          defer.reject(response.data);
        } else {
          angular.forEach(response.data, function(carregar){
            doencas.listaDoencas.push(carregar);
            defer.resolve(carregar);
          });
        }
      }, function(error) {
        // alert("Server returns response with an error status.");
        // console.log('error:', error);
        defer.reject(error);
      });
      return defer.promise;
    }

    doencas.getDoencaDetalhada = function(doencaId){
      var defer = $q.defer();
      var doencaIdJson = angular.toJson(doencas.listaDoencas[doencaId]._id);
      // $http.get('https://api.mlab.com/api/1/databases/appraga/collections/doencas?q={%22id%22:%20%22'+ doencaId +'%22}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
      $http.get('https://api.mlab.com/api/1/databases/appraga/collections/doencas?q={_id:'+doencaIdJson+'}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
      .then(function(response){
          doencas.doencaDetalhada = response.data;
          defer.resolve(response);
      }, function(response) {
        alert("Server returns response with an error status.");
        defer.reject(response);
      });
      return defer.promise;
    }

    doencas.getPlantasOfDoenca = function(doencaId){
      var defer = $q.defer();
      var plantaIdJson;
      angular.forEach(doencas.listaDoencas[doencaId].plantas, function(planta){
        plantaIdJson = angular.toJson(planta);

        $http.get('https://api.mlab.com/api/1/databases/appraga/collections/plantas?q={_id:'+plantaIdJson+'}&s={"_id": 1}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
        .then(function(response){
          angular.forEach(response.data, function(carregar){
            doencas.doencaSelecionada.push(carregar);
            defer.resolve(response);
          });
        }, function(response) {
          alert("Server returns response with an error status.");
          defer.reject(response);
        });
      });
      return defer.promise;
    }

    // console.log("Chegou doencasServices",doencas);
    return doencas;
  });

  app.service('plantasServices', function($q, $http){
    var plantas = this;
    plantas.listaPlantas = [];
    plantas.plantaDetalhada = {};
    plantas.plantaSelecionada = [];

    plantas.getTodasPlantas = function(){
      var defer = $q.defer();
      $http.get('https://api.mlab.com/api/1/databases/appraga/collections/plantas?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
      .then(function(response){
        if (Object.keys(response.data).length == 0 ) {
          defer.reject(response.data);
        } else {
          angular.forEach(response.data, function(carregar){
            plantas.listaPlantas.push(carregar);
            defer.resolve(carregar);
          });
        }
      }, function(error) {
        // console.log(error);
        // alert("Server returns response with an error status.");
        defer.reject(error);
      });
      // console.log('promise:',defer.promise);
      return defer.promise;
    }

    plantas.getPlantaDetalhada = function(plantaId){
      var defer = $q.defer();
      var plantaIdJson = angular.toJson(plantas.listaPlantas[plantaId]._id);
      $http.get('https://api.mlab.com/api/1/databases/appraga/collections/plantas?q={_id:'+plantaIdJson+'}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
      .then(function(response){
        plantas.plantaDetalhada = response.data;
        defer.resolve(response);
      }, function(response) {
        alert("Server returns response with an error status.");
        defer.reject(response);
      });
      return defer.promise;
    }

    plantas.getPragasOfPlanta = function(plantaId){
      var defer = $q.defer();
      // var plantaIdJson = angular.toJson(plantas.listaPlantas[plantaId-1].pragas);
      var pragaIdJson;
      angular.forEach(plantas.listaPlantas[plantaId].pragas, function(praga){
        pragaIdJson = angular.toJson(praga);
        // console.log(pragaIdJson);

        $http.get('https://api.mlab.com/api/1/databases/appraga/collections/pragas?q={_id:'+pragaIdJson+'}&s={"_id": 1}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
        .then(function(response){
          angular.forEach(response.data, function(carregar){
            plantas.plantaSelecionada.push(carregar);
            defer.resolve(carregar);
          });
        }, function(response) {
          alert("Server returns response with an error status.");
          defer.reject(response);
        });
      });
      return defer.promise;
    }
    // console.log("Chegou plantasServices",plantas);
    return plantas;
  });

  app.service('manejosServices', function($q, $http){
    var manejos = this;
    manejos.listaManejos = [];
    manejos.manejoDetalhado = {};
    manejos.pragaSelecionada = [];
    manejos.plantaSelecionada = [];

    manejos.getTodosManejos = function(){
      var defer = $q.defer();
      $http.get('https://api.mlab.com/api/1/databases/appraga/collections/manejos?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
      .then(function(response){
        if (Object.keys(response.data).length == 0 ) {
          defer.reject(response.data);
        } else {
          angular.forEach(response.data, function(carregar){
            manejos.listaManejos.push(carregar);
            defer.resolve(carregar);
          });
        }
      }, function(error) {
        // alert("Server returns response with an error status.");
        defer.reject(error);
      });
      return defer.promise;
    }

    manejos.getManejoDetalhado = function(manejoId){
      var defer = $q.defer();
      var manejoIdJson = angular.toJson(manejos.listaManejos[manejoId]._id);
      $http.get('https://api.mlab.com/api/1/databases/appraga/collections/manejos?q={_id:'+manejoIdJson+'}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
      .then(function(response){
          manejos.manejoDetalhado = response.data;
          defer.resolve(response);
      }, function(response) {
        alert("Server returns response with an error status.");
        defer.reject(response);
      });
      return defer.promise;
    }

    manejos.getPlantasOfManejo = function(pragaId){
      var defer = $q.defer();
      var plantaIdJson;
      angular.forEach(manejos.listaManejos[pragaId].plantas, function(planta){
        plantaIdJson = angular.toJson(planta);

        $http.get('https://api.mlab.com/api/1/databases/appraga/collections/plantas?q={_id:'+plantaIdJson+'}&s={"_id": 1}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
        .then(function(response){
          angular.forEach(response.data, function(carregar){
            manejos.pragaSelecionada.push(carregar);
            defer.resolve(response);
          });
        }, function(response) {
          alert("Server returns response with an error status.");
          defer.reject(response);
        });
      });
      return defer.promise;
    }

    manejos.getPragasOfManejo = function(plantaId){
      var defer = $q.defer();
      // var plantaIdJson = angular.toJson(plantas.listaPlantas[plantaId-1].pragas);
      var pragaIdJson;
      angular.forEach(manejos.listaManejos[plantaId].pragas, function(praga){
        pragaIdJson = angular.toJson(praga);
        // console.log(pragaIdJson);

        $http.get('https://api.mlab.com/api/1/databases/appraga/collections/pragas?q={_id:'+pragaIdJson+'}&s={"_id": 1}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
        .then(function(response){
          angular.forEach(response.data, function(carregar){
            manejos.plantaSelecionada.push(carregar);
            defer.resolve(carregar);
          });
        }, function(response) {
          alert("Server returns response with an error status.");
          defer.reject(response);
        });
      });
      return defer.promise;
    }

    // console.log("Chegou manejosServices",manejos);
    return manejos;
  });

  app.service('cadastroPragaServices', function($q, $http){
    var pragas = this;
    pragas.cadastrarPraga = {};

    pragas.postPraga = function(cadastro){
      var defer = $q.defer();
      if (Object.keys(cadastro).length == 0 ) {
        alert("Empty Object!")
      }else{
        var cadastroJson = angular.toJson(cadastro);
        $http.post('https://api.mlab.com/api/1/databases/appraga/collections/pragas?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', cadastroJson)
        .then(function(response){
          pragas.cadastrarPraga = response;
          defer.resolve(response);
          // console.log(pragas.cadastrarPraga);
        });
      }
      return defer.promise;
    }
    // console.log(pragas);
    return pragas;
  });

  app.service('cadastroDoencaServices', function($q, $http){
    var doencas = this;
    doencas.cadastrarDoenca = {};

    doencas.postDoenca = function(cadastro){
      var defer = $q.defer();
      if (Object.keys(cadastro).length == 0 ) {
        alert("Empty Object!")
      }else{
        var cadastroJson = angular.toJson(cadastro);
        $http.post('https://api.mlab.com/api/1/databases/appraga/collections/doencas?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', cadastroJson)
        .then(function(response){
          doencas.cadastrarDoenca = response;
          defer.resolve(response);
          // console.log(doencas.cadastrarDoenca);
        });
      }
      return defer.promise;
    }
    // console.log(doencas);
    return doencas;
  });

  app.service('cadastroPlantaServices', function($q, $http){
    var plantas = this;
    plantas.cadastrarPlanta = {};

    plantas.postPlanta = function(cadastro){
      // console.log("postPlanta: ",cadastro);
      var defer = $q.defer();
      // console.log(cadastro);
      if (Object.keys(cadastro).length == 0 ) {
        alert("Empty Object!")
      }else{
        var cadastroJson = angular.toJson(cadastro);
        // console.log(cadastroJson);
        $http.post('https://api.mlab.com/api/1/databases/appraga/collections/plantas?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', cadastroJson)
        .then(function(response){
          plantas.cadastrarPlanta = response;
          defer.resolve(response);
        });
      }
      return defer.promise;
    }
    // console.log(plantas);
    return plantas;
  });

  app.service('cadastroManejoServices', function($q, $http){
    var manejos = this;
    manejos.cadastrarManejo = {};

    manejos.postManejo = function(cadastro){
      var defer = $q.defer();
      if (Object.keys(cadastro).length == 0 ) {
        alert("Empty Object!")
      }else{
        var cadastroJson = angular.toJson(cadastro);
        $http.post('https://api.mlab.com/api/1/databases/appraga/collections/manejos?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', cadastroJson)
        .then(function(response){
          manejos.cadastrarManejo = response;
          defer.resolve(response);
          // console.log(response);
        });
      }
      return defer.promise;
    }
    // console.log(pragas);
    return manejos;
  });

  app.service('atualizaServices', function($q, $http){
    var plantas = this;
    plantas.atualizaPlanta = {};

    // doencas.putDoenca = function(cadastro){
    //   var defer = $q.defer();
    //   if (Object.keys(cadastro).length == 0 ) {
    //     alert("Empty Object!")
    //   }else{
    //     var cadastroJson = angular.toJson(cadastro);
    //     $http.put('https://api.mlab.com/api/1/databases/appraga/collections/doencas?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', cadastroJson)
    //     .then(function(response){
    //       doencas.modificarDoenca = response;
    //       defer.resolve(response);
    //       // console.log(doencas.cadastrardoenca);
    //     });
    //   }
    //   return defer.promise;
    // }

    plantas.atualizaPlanta = function(atualiza, _id){
      console.log(atualiza);
      console.log(_id);
      var defer = $q.defer();
      if (Object.keys(atualiza).length == 0 || _id == '') {
        alert("Empty Object!")
      }else{
        var atualizaJson = angular.toJson(atualiza);
        var _idJson = angular.toJson(_id);
        console.log("Service",atualizaJson);
        $http.put('https://api.mlab.com/api/1/databases/appraga/collections/planta?q={_id:'+_idJson+'}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', atualizaJson)
        .then(function(response){
          plantas.atualizaPlanta = response;
          defer.resolve(response);
          console.log(plantas.atualizaPlanta);
        });
      }
      return defer.promise;
    }

    console.log(doencas);
    return plantas;
  });


  // app.service('removerPlantaServices', function($q, $http){
  //   var plantas = this;
  //   plantas.removerPlanta = [];
  //
  //   plantas.deletePlanta = function(remover){
  //     var defer = $q.defer();
  //     console.log(JSON.stringify(remover._id));
  //     if (Object.keys(remover).length == 0 ) {
  //       alert("Empty Object!")
  //     }else{
  //       var removerJson = angular.toJson(remover._id);
  //       console.log(removerJson);
  //       // $http.delete('https://api.mlab.com/api/1/databases/appraga/collections/plantas?q={_id:'+removerJson+'}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
  //       $http.delete('https://api.mlab.com/api/1/databases/appraga/collections/plantas?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff',  JSON.stringify(remover))
  //       .then(function(response){
  //         plantas.removerPlanta = response;
  //         defer.resolve(response);
  //         console.log(response);
  //       });
  //     }
  //
  //     return defer.promise;
  //   }
  //   return plantas;
  // });

  // app.factory('myService', function() {
  //  var savedData = {}
  //  function set(data) {
  //    savedData = data;
  //  }
  //  function get() {
  //   return savedData;
  //  }
  //
  //  return {
  //   set: set,
  //   get: get
  //  }
  //
  // });

}());
