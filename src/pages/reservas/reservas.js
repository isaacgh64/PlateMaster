loadData();
function loadData(){
    $.ajax({
        type: "GET",
        url: "reservas.php",
        dataType: "json",
        success: function (response) {
            if(response.status=="200"){
                if(response.rol=="user"){
                    if(response.data != "No data"){
                        const title = $('<h2>').text('Reservas');
                        $('#principal').append(title);
                        response.data.forEach(element => {
                            createViewWorker(element.id_reserva,element.nombre,element.telefono,element.mail,element.c_personas,element.fecha,element.hora,false);
                            $('#principal').append("<br>");
                        });
                    }
                    createViewUser();
                }else{
                    const title = $('<h2>').text('Reservas');
                    $('#principal').append(title);
                    if(response.data.length > 0){
                        response.data.forEach(element => {
                            createViewWorker(element.id_reserva,element.nombre,element.telefono,element.mail,element.c_personas,element.fecha,element.hora,true);
                            $('#principal').append("<br>");
                        });
                    }else{
                        var p = $("<p></p>").html("No hay reservas para el día de hoy").css("text_aling","center");
                        $('#principal').append(p);
                    }
                    
                }
            }else{
                alert("Ocurrio un error inexperado")
            }
        }
    });
}
function sentData(event){
    //Obtenemos los valores del formularios para mandarlos
    const name = document.getElementById("inputName").value;
    const mail = document.getElementById("inputMail").value;
    const tel = document.getElementById("inputTel").value;
    const persons = document.getElementById("inputPeople").value;
    const date = document.getElementById("inputDate").value;
    const time = document.getElementById("inputTime").value;

    event.preventDefault();
    //Mandamos nuestros datos con un fetch
    $.ajax({
        type: "POST",
        url: "reservas.php",
        data: {"name":name,"mail":mail,"tel":tel,"persons":persons,"date":date,"time":time},
        dataType: "json",
        success: function (response) {
            if(response.status=="201"){
                alert("¡Reserva confirmada!");
                window.location.href="reservas.html";
           }
           else if(response.status=="404"){
            console.log(response);
                if(response.name!=""){
                    document.getElementById("nameError").innerHTML=response.name;
                }
                if(response.mail!=""){
                    document.getElementById("mailError").innerHTML=response.mail;
                }
                if(response.tel!=""){
                    document.getElementById("telError").innerHTML=response.tel;
                }
                if(response.persons!=""){
                    document.getElementById("peopleError").innerHTML=response.persons;
                }
                if(response.date!=""){
                    document.getElementById("dateError").innerHTML=response.date;
                }
                if(response.time!=""){
                    document.getElementById("timeError").innerHTML=response.time;
                }
           }
        }
    });
    
    
};

//Función que crea la vista de un trabajador de la empresa
function createViewWorker(id,name,tlf,mail,persons,date,time,rol){
    // Crear el contenedor principal
    const reservasContainer = $('<div>').addClass('reservas');

    const idReserva = $("<p></p>").html(id).attr("id","idReserva").hide();

    // Crear los párrafos con sus datos
    const nameParagraph = $('<p>').html(`<b>Nombre:</b> ${name}`);
    const emailParagraph = $('<p>').html(`<b>Correo electrónico:</b> ${mail}`);
    const phoneParagraph = $('<p>').html(`<b>Teléfono:</b> ${tlf}`);
    const peopleParagraph = $('<p>').html(`<b>Cantidad de personas:</b> ${persons}`);
    const dateParagraph = $('<p>').html(`<b>Fecha:</b> ${date}`).attr("id","date");
    const timeParagraph = $('<p>').html(`<b>Hora:</b> ${time}`).attr("id","time");

    // Añadir los párrafos al contenedor
    reservasContainer.append(idReserva);
    reservasContainer.append(nameParagraph);
    reservasContainer.append(emailParagraph);
    reservasContainer.append(phoneParagraph);
    reservasContainer.append(peopleParagraph);
    reservasContainer.append(dateParagraph);
    reservasContainer.append(timeParagraph);
    if(rol){
        const btn = $('<button></button>').addClass('btn').html("Reserva atendida").attr("id","btn_aten");
        reservasContainer.append(btn);
    }

    // Añadir el título y el contenedor al cuerpo de la página o a un elemento específico
    $('#principal').append(reservasContainer); 
}

$(document).on("click","#btn_aten",() => {
    var id = $("#idReserva").html().trim();
    $.ajax({
        type: "POST",
        url: "delete.php",
        data: {"id":id,},
        dataType: "json",
        success: function (response) {
            console.log(response);
            if(response.status == "202"){
                alert("La reserva se atendió correctamente");
                window.location.href="reservas.html";
            }else{
               console.log(response);
            }
        }
    });
});

//Función que crea la vista de un usuario nomal
function createViewUser(){
     // Crear el título
     const title = $('<h2>').text('Haz tu reserva con nosotros');

     // Crear el formulario
     const form = $('<form>').attr('onsubmit', 'sentData(event)').attr('id', 'formReservas');

     // Crear los inputs y los mensajes de error
     const inputName = $('<input>').attr({
     type: 'text',
     name: 'name',
     id: 'inputName',
     placeholder: 'Nombre'
     });
     const nameError = $('<p>').addClass('error').attr('id', 'nameError');

     const inputMail = $('<input>').attr({
     type: 'email',
     name: 'mail',
     id: 'inputMail',
     placeholder: 'Correo eléctronico'
     });
     const mailError = $('<p>').addClass('error').attr('id', 'mailError');

     const inputTel = $('<input>').attr({
     type: 'tel',
     name: 'tel',
     id: 'inputTel',
     placeholder: 'Teléfono'
     });
     const telError = $('<p>').addClass('error').attr('id', 'telError');

     const inputPeople = $('<input>').attr({
     type: 'number',
     name: 'people',
     id: 'inputPeople',
     placeholder: 'Cantidad de personas',
     min: 0
     });
     const peopleError = $('<p>').addClass('error').attr('id', 'peopleError');

     const inputDate = $('<input>').attr({
     type: 'date',
     name: 'date',
     id: 'inputDate',
     placeholder: 'Selecciona el día de la reserva'
     });
     const dateError = $('<p>').addClass('error').attr('id', 'dateError');

     const inputTime = $('<input>').attr({
     type: 'time',
     name: 'time',
     id: 'inputTime',
     placeholder: 'Selecciona hora',
     min: '11:00'
     });
     const timeError = $('<p>').addClass('error').attr('id', 'timeError');

     const submitButton = $('<input>').attr({
     type: 'submit',
     name: 'sendData',
     id: 'btn_sent',
     value: 'Enviar'
     });

     // Agregar elementos al formulario
     form.append(inputName, nameError);
     form.append(inputMail, mailError);
     form.append(inputTel, telError);
     form.append(inputPeople, peopleError);
     form.append(inputDate, dateError);
     form.append(inputTime, timeError);
     form.append(submitButton);

     // Agregar el título y el formulario al contenedor
     $('#principal').append(title, form); 
}
