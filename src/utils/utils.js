loadHeader();
loadFooter();
//Función que nos permite cargar nuestra cabecera al visitar nuestra página
function loadHeader(){
    fetch("src/widgets/header/headerp.html").then(response => response.text()).then(data=>{
        document.getElementById("header").innerHTML=data;
    })
}
// Función que nos permite cargar nuestro footer en la página web
function loadFooter(){
    fetch("src/widgets/footer/footer.html").then(response => response.text()).then(data=>{
        document.getElementById("footer").innerHTML=data;
    })
}