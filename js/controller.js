var app = angular.module("myApp",[]);
app.controller("myCtrl", function myCtrl($scope){
    $scope.alumnes = [] ;
    $scope.alumne = {};
    $scope.registre = 'Cap alumne afegit';
    
    //Funció per retornar la data actual.
    $scope.darrerAfegit = function (srt) {
        var data = new Date();
        var dd = data.getDate();
        var mm = data.getMonth()+1; //Gener es 0!
        var yyyy = data.getFullYear();
        var hh = data.getHours();
        var mn = data.getMinutes();
        var ss = data.getSeconds();
        
        //Per unificar el format afegim 0 a totls els menors de 10.
        if(dd<10) dd = '0'+dd;
        if(mm<10) mm = '0'+mm;
        if(hh<10) hh = '0'+hh;
        if(mn<10) mn = '0'+mn;
        if(ss<10) ss = '0'+ss;
        
        return (srt+dd+'/'+mm+'/'+yyyy+" "+hh+":"+mn+":"+ss);
    }

    //Funció per detectar borrar alumnes i mostrar quan s'ha borrat.
    $scope.borrar = function (i) {
        $scope.alumnes.splice(i, 1);
        $scope.registre = $scope.darrerAfegit('Darrer alumne borrat: ');
    }    
    
    //Funció per detectar alumnes repetits.
    $scope.alumneRepetit = function (dni) {
        for (i in $scope.alumnes){
            if ($scope.alumnes[i].dni==dni) return true;
        }
        return false;
    }
    
    //Funció per comprovar que el DNI es correcte.
    $scope.checkDNI = function (dni) {
        //Model del nostre patró de DNI i les seves lletres.
        var patro = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
        var lletra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        
        //Primer miram si el patró correspon al del DNI.
        if (patro.test(dni)){
            //Deprés que la lletra sigui correcta, en cas contrari propasam la correcta pel notre patró.
            if (lletra.charAt(parseInt(dni.substr(0, 8)) % 23) === dni.substr(-1)){
                //Finalment miram que l'alumne no estigui ja a la taula.
                if (!$scope.alumneRepetit(dni)) return true;
                else {
                    alertDNI = "Aquest DNI es incorrecte!\nJa existeix un alumne amb aquest DNI";
                    return false;
                }
            } else {
                alertDNI = "Aquest DNI es incorrecte!\nPot ser que la lletra correcta sigui "+(lletra.charAt(parseInt(dni.substr(0, 8)) % 23))+"?";
                return false;
            }
        } else {
            alertDNI = "Aquest DNI es incorrecte!\nEl format del DNI no correspon al patró: 00000000X";
            return false;
        } 
    }
    
    $scope.nouAlumne = function () {
        console.log($scope.alumne);
        //Ens aseguram que la lletra del DNI esta en majúscula.
        $scope.alumne.dni = $scope.alumne.dni.toString().toUpperCase();
        //Tant el nom com els llinatges els deixam amb el format de només mayuscula la primera lletra.
        $scope.alumne.nom = $scope.alumne.nom.toString().replace(/\b\w/g, l => l.toUpperCase());
        $scope.alumne.llinatges = $scope.alumne.llinatges.toString().replace(/\b\w/g, l => l.toUpperCase());
        //Agafam el DNI del formulari, només si es correcte el guardam.
        if ($scope.checkDNI($scope.alumne.dni)) {
            $scope.alumnes.push($scope.alumne);
            //Indicam quan s'ha afegit
            $scope.registre = $scope.darrerAfegit('Darrer alummne afegit: ');
            $scope.alumne = {};
            //Un pic afegit ocultam el formulari.
            $scope.afegir = false;
        } else {
            //Si el DNI no era correcte avisam amb el tipo d'error i marcam la casella.
            alert(alertDNI);
        }
        console.log($scope.alumnes);
        console.log($scope.alumnes.length);
    };
    
})