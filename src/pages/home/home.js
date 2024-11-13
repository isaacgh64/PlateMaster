loadHeader();
//Función que nos permite cargar nuestra cabecera al visitar nuestra página
function loadHeader(){
    fetch("../../widgets/header/header.html").then(response => response.text()).then(data=>{
        document.getElementById("header").innerHTML=data;
    })
}