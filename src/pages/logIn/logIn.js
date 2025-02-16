getLogIn();
//Comprobamos que no haya iniciado sesión antes, de lo contrario cargaremos el logIn
function getLogIn(){
    $.ajax({
        type: "GET",
        url: "logIn.php",
        dataType: "json",
        success: function (response) {
            if(response.status=="200"){
                viewSignIn(response.data);
            }else{
                viewLogIn();
            }
        }
    });
}

//Comprobamos que mandamos los datos con AJAX y hacemos las comprobaciones
function logIn(event){
    //Borramos nuestros valores por defecto
    document.getElementById("errorUser").innerHTML="";
    document.getElementById("errorPass").innerHTML="";
    //Hacemos que el formulario se envie de forma tradicional
    event.preventDefault();
    //Obtenemos los valores del formularios para mandarlos
    const user = document.getElementById("inputUser").value;
    const password = document.getElementById("password").value;
    //Enviamos los datos a nuestro PHP mediante AJAX
    $.ajax({
        type: "POST",
        url: "logIn.php",
        data: {"username":user,"password":password},
        dataType: "json",
    }).done(function(response){
        if(response.status=="200"){
            window.location.href="logIn.html";
         }
         else if(response.status=="404" || response.status=="500"){
            if(response.user!=undefined){
                document.getElementById("errorUser").innerHTML=response.user;
            }
            if(response.pass!=undefined){
                document.getElementById("errorPass").innerHTML=response.pass;
            }
            if(response.error!="undefined"){
                document.getElementById("error").innerHTML=response.error;
            }
        }
    });
};

//Función que nos permite ver la contraseña o ocultarla
function showPassword(id,idImg){
    if(id.type === "password"){
        id.type="text";
        idImg.src="../../../assets/logIn/showPassword.png";
    }else{
        id.type="password";
        idImg.src="../../../assets/logIn/hidePassword.png";
    }

}

function viewLogIn(){
    // Crear el formulario
    const form = $('<form>').attr('id', 'logInForm').attr("onsubmit","logIn(event)");
  
    // Crear el contenedor principal
    const logInDiv = $('<div>').attr('id', 'logIn');
  
    // Crear y añadir la imagen
    const image = $('<img>')
        .attr('src', '../../../assets/logIn/logIn.png')
        .attr('alt', 'Log In');
    logInDiv.append(image);
  
    // Añadir salto de línea
    logInDiv.append('<br>');
  
    // Crear y añadir el input de usuario
    const inputUser = $('<input>')
        .attr({
            type: 'text',
            name: 'user',
            id: 'inputUser',
            placeholder: 'Usuario'
        });
    logInDiv.append(inputUser);
  
    // Añadir salto de línea
    logInDiv.append('<br>');
  
    // Crear y añadir el div de error para el usuario
    const errorUserDiv = $('<div>')
        .attr('id', 'errorUser')
        .addClass('error');
    logInDiv.append(errorUserDiv);
  
    // Añadir salto de línea
    logInDiv.append('<br>');
  
    var passDiv = passwordInput("Contraseña","password","edge");
  
    // Añadir el contenedor de la contraseña al logInDiv
    logInDiv.append(passDiv);
  
    // Añadir salto de línea
    logInDiv.append('<br>');
  
    // Crear y añadir el div de error para la contraseña
    const errorPassDiv = $('<div>')
        .attr('id', 'errorPass')
        .addClass('error');
    logInDiv.append(errorPassDiv);
  
    // Añadir salto de línea
    logInDiv.append('<br>');

    const errorDiv = $('<div>')
        .attr('id', 'error')
        .addClass('error');
    logInDiv.append(errorDiv);
  
    // Añadir salto de línea
    logInDiv.append('<br>');
  
    // Crear y añadir el botón de inicio de sesión
    const submitButton = $('<input>')
        .attr({
            type: 'submit',
            name: 'btn_logIn',
            value: 'Iniciar sesión',
            id: 'btnLogIn'
        });
    logInDiv.append(submitButton);
  
    // Añadir el contenedor principal al formulario
    form.append(logInDiv);
  
    // Añadir el formulario al cuerpo de la página o a un contenedor específico
    $('#contenido').append(form);  
}

function viewSignIn(value){
    var rol = (value.rol==1)?"Administrador":"Trabajador";
    // Crear un elemento h2 y agregarlo al cuerpo
    $('<h2>', { text: `Bienvenido ${value.name}` }).appendTo('#contenido');
    
    // Crear un elemento h4 y agregarlo al cuerpo
    $('<h4>', { text: `Tu rol actual es ${rol}` }).appendTo('#contenido');

    // Creamos nuestro formulario en el que permitiremos cambiar el nombre y la contraseña si desea modificarlas
    var form = $('<form>').attr("id","formUser");
    var inputEmail = $('<input>').attr("type","mail").attr("id","email").attr("value",value.user).attr("disabled",true).addClass("inputUser");
    // Crear el contenedor para la contraseña
   var passDiv = passwordInput("Nueva contraseña","password","edge");
   var passDiv2=passwordInput("Repite la contraseña","passRepeat","edgeRepeat");

    $(form).append(inputEmail);
    $(form).append(passDiv);
    $(form).append(passDiv2);
    $("#contenido").append(form);

    
    $('<button>', { class: 'btn', text: 'Cambiar contraseña'}).attr("onclick","changePassword()").attr("id","cambiarPassword").appendTo('#contenido');
    // Crear un botón con clase y texto, y agregarlo al cuerpo
    $('<button>', { class: 'btn', text: 'Cerrar Sesión'}).attr("id","cerrarSesion").appendTo('#contenido');
}

$(document).on("click","#cerrarSesion",function(){
    console.log("Buenas");
   $.ajax({
    type: "GET",
    url: "logOut.php",
    dataType: "json",
    success: function (response) {
        if(response==200){
            window.location.href="logIn.html";
        }
    }
   }); 
});

function passwordInput(placeholder,id,idImg){
    const passDiv = $('<div>').attr('id', 'pass').addClass("pass").css("background-color","white");
    // Crear y añadir el input de contraseña
    const passwordInput = $('<input>')
        .attr({
            id: id,
            type: 'password',
            name: id,
            placeholder: placeholder,
        }).addClass("passInput");
    passDiv.append(passwordInput);
    // Crear y añadir el botón para mostrar/ocultar contraseña
    const toggleButton = $('<button>')
        .attr('type', 'button')
        .attr('onclick', `showPassword(${id},${idImg})`)
        .append(
            $('<img>')
                .attr({
                    id: idImg,
                    src: '../../../assets/logIn/hidePassword.png',
                    alt: 'ege'
                }).addClass("passImg")
        ).addClass("passBtn");
    passDiv.append(toggleButton);

    return passDiv;
}

function changePassword(){
    var p = "";
    $(".error").remove();
    if($("#password").val().trim() &&  $("#passRepeat").val().trim()){
        if($("#password").val() == $("#passRepeat").val()){
            $.ajax({
                type: "POST",
                url: "changePassword.php",
                data: `newPassword=${encodeURIComponent($("#password").val())}`,
                dataType: "json",
                success: function (response) {
                    if(response.status=="200"){
                        alert("La contraseña se ha modificado con éxito");
                    }else{
                        alert("No se ha podido cambiar la contraseña");
                    }
                }
            });
        }else{
            p = $("<p></p>").addClass("error").html("Las contraseñas no coinciden");
            
        }
    }else{
        p = $("<p></p>").addClass("error").html("No pueden estar vacios los campos");
    }
    $("#formUser").append(p);
   
}