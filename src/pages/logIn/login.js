

//Comprobamos que mandamos los datos con AJAX y hacemos las comprobaciones
document.getElementById("logInForm").addEventListener("submit",function(event){
    //Borramos nuestros valores por defecto
    document.getElementById("errorUser").innerHTML="";
    document.getElementById("errorPass").innerHTML="";
    //Hacemos que el formulario se envie de forma tradicional
    event.preventDefault();
    //Obtenemos los valores del formularios para mandarlos
    const user = document.getElementById("inputUser").value;
    const password = document.getElementById("password").value;
    //Enviamos los datos a nuestro PHP mediante AJAX
    fetch("login.php",{
        method:"POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        body:`username=${encodeURIComponent(user)}&password=${encodeURIComponent(password)}`,
    }).then(response => response.json()).then(data=>{
        if(data.user!=undefined){
            document.getElementById("errorUser").innerHTML=data.user;
        }
        if(data.pass!=undefined){
            document.getElementById("errorPass").innerHTML=data.pass;
        }
    })
});

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