// $scope.alumnes = [];
// app.controller("appController", function appController($scope){
// 	//añadimos usuarios por defecto
// 	$scope.alumnes = [
//         // {
//         //     nombre : "Israel Parra",
//         //     web : "https://www.uno-de-piera.com",
//         //     edad : "32 años",
//         //     profesion : "programador web"
//         // },
//         // {
//         //     nombre : "Pepito",
//         //     web : "http://pepito.com",
//         //     edad : "? años",
//         //     profesion : "vender palotes!"
//         // }
//     ]
// })
var app = angular.module("myApp",[]);
app.controller("myCtrl", function myCtrl($scope){
    $scope.afegir = false;
    $scope.alumnes = [] ;
    $scope.alumne = {
        // dni,
        // nom,
        // llintages,
        // email,
        // nota
    };
    $scope.nouAlumne = function () {
            $scope.alumnes.push($scope.alumne);
            console.log($scope.alumnes[0].nom);
            console.log($scope.alumnes);
            console.log($scope.alumne);
            console.log($scope.alumnes.length)
            // $scope.afegir = !$scope.afegir;
    };
    
})