//Constructor del nou objecte creat pels alumnes afegits.
function NouAlumne() {
    this.dni = $('#1').val().toString().toUpperCase();
    this.nom = $('#2').val();
    this.llinatges = $('#3').val();
    this.email = $('#4').val();
    this.nota = $('#5').val();
    this.borrat = false; //Emprada per sebrer si ha estat borrat de la taula i no perdre definitivament l'alumne.
}

//Funció per afegir una nova fila a la taula amb l'alumne nou afegit.
function crearFila(nou){
    var fila="";
    
    for (i in nou){
        console.log(nou[i]);
        if (i=="borrat"){
            //Afegim botó de borrar alumne.
            fila+='<td><button type="button" class="btn btn-outline-danger btn-sm" id="btn2">X</button></td>';
        } else {
            fila+="<td>"+nou[i]+"</td>";
        }
    }
    //Per facilitar l'acces a taula de cada alumne s'afegeix una id diferent a cada un.
    $("table").append("<tr id='alu"+(alumnes.length-1)+"'>"+fila+"</tr>"); 
    
    //Per finalitzar es mostra la data actual del darrer alumne afegit.
    $("#darrerModificat").text("Darrer alummne afegit: "+dataActual());
}

//Funció per retornar la data actual.
function dataActual(){
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
    
    return (dd+'/'+mm+'/'+yyyy+" "+hh+":"+mn+":"+ss);
}

//Funció per detectar alumnes repetits.
function alumneRepetit(dni) {
    for (i in alumnes){
        if (alumnes[i].dni==dni && alumnes[i].borrat==false) return true;
    }
    return false;
}

//Funció per comprovar que el DNI es correcte.
function checkDNI() {
    //Model del nostre patró de DNI i les seves lletres.
    var patro = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var lletra = 'TRWAGMYFPDXBNJZSQVHLCKET';
    
    //Temporalment agafam el DNI del formulari, només si es correcte el guardarem.
    var dni = $('#1').val().toString().toUpperCase();
    
    //Primer miram si el patró correspon al del DNI.
    if (patro.test(dni)){
        //Deprés que la lletra sigui correcta, en cas contrari propasam la correcta pel notre patró.
        if (lletra.charAt(parseInt(dni.substr(0, 8)) % 23) === dni.substr(-1)){
            //Finalment miram que l'alumne no estigui ja a la taula.
            if (!alumneRepetit(dni)) return true;
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

//Array per anar guardant els alumnes, a mode de base de dades.
//Quan siguin borrats no els mostrarem a la taula pero aquí encara estaran guardats.
//L'ídea es poder implementar en un futur la recuperació d'alumnes borrats a mode de "papelera" de Windows.
var alumnes=[];
//Variable per guadar el missatge de perque es incorrecte el DNI.
var alertDNI;

$(document).ready(function(){
    $("#btn1").click(function(){
        //Si el DNI es correcte afegim l'alumne nou tant a la taula com a l'array.
        if (checkDNI()) {
            $('#1').removeClass("is-invalid");
            alumnes.push(new NouAlumne());
            crearFila(alumnes[alumnes.length-1]);
            $("form")[0].reset();
        } else {
            //Si el DNI no era correcte avisam amb el tipo d'error i marcam la casella.
            alert(alertDNI);
            $('#1').addClass("is-invalid");
        }
        
    });
    
    //Quan borram un alumne generam un event d'on treim l'id de la fila que s'ha pitjat.
    $( "table" ).on( "click", "#btn2", function(event) {        
        console.log(event);
        console.log(event.currentTarget.offsetParent.parentElement.id);
        console.log(event.currentTarget.offsetParent.parentElement.id.substr(3));
        //Antes de fer res demanam confirmació, si es confirma l'ocultam progresivament i a l'array indicam que esta borrat.
        if (confirm("Segur que vols borrar l'alumne: "+alumnes[event.currentTarget.offsetParent.parentElement.id.substr(3)].nom+" "+alumnes[event.currentTarget.offsetParent.parentElement.id.substr(3)].llinatges)){
            $("#"+event.currentTarget.offsetParent.parentElement.id).fadeOut(1000);
            alumnes[event.currentTarget.offsetParent.parentElement.id.substr(3)].borrat=true;
        }
    });
});
