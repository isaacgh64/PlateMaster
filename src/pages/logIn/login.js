loadHeader();
//Función que nos permite cargar nuestra cabecera al visitar nuestra página
function loadHeader(){
    fetch("../../widgets/header/header.html").then(response => response.text()).then(data=>{
        document.getElementById("header").innerHTML=data;
    })
}

//Función que nos permite ver la contraseña o ocultarla
function showPassword(){
    var img = document.getElementById("eye");
    var password = document.getElementById("password");
    if(password.type === "password"){
        password.type="text";
        img.src="../../../assets/logIn/showPassword.png";
    }else{
        password.type="password";
        img.src="../../../assets/logIn/hidePassword.png";
    }

}