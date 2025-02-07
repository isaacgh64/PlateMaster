loadData();
function loadData(){
    fetch("reservas.php",{
        method:"GET",
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(response => response.json()).then(value=>{
        if(value.status=="200"){
            if(value.rol=="user"){
                createViewUser();
            }else{
                createViewWorker(value.name,value.tel,value.mail,value.persons,value.date,value.time);
                createViewWorker(value.name,value.tel,value.mail,value.persons,value.date,value.time);
            }
        }else{
            alert("Ocurrio un error inexperado")
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
    fetch("reservas.php",{
        method:"POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        body:`name=${encodeURIComponent(name)}&mail=${encodeURIComponent(mail)}&tel=${encodeURIComponent(tel)}&persons=${encodeURIComponent(persons)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`,
    }).then(response => response.json()).then(value=>{
       if(value.status=="201"){
            alert("Los datos se han enviado con éxito");
       }
       else if(value.status=="404"){
            if(value.name!=""){
                document.getElementById("nameError").innerHTML=value.name;
            }
            if(value.mail!=""){
                document.getElementById("mailError").innerHTML=value.mail;
            }
            if(value.tel!=""){
                document.getElementById("telError").innerHTML=value.tel;
            }
            if(value.persons!=""){
                document.getElementById("peopleError").innerHTML=value.persons;
            }
            if(value.date!=""){
                document.getElementById("dateError").innerHTML=value.date;
            }
            if(value.time!=""){
                document.getElementById("timeError").innerHTML=value.time;
            }
       }
    });
    
};

//Función que crea la vista de un trabajador de la empresa
function createViewWorker(name,tlf,mail,persons,date,time){
    // Crear el título
    const title = $('<h2>').text('Reserva');

    // Crear el contenedor principal
    const reservasContainer = $('<div>').addClass('reservas');

    // Crear los párrafos con sus datos
    const nameParagraph = $('<p>').html(`<b>Nombre:</b> ${name}`);
    const emailParagraph = $('<p>').html(`<b>Correo electrónico:</b> ${mail}`);
    const phoneParagraph = $('<p>').html(`<b>Teléfono:</b> ${tlf}`);
    const peopleParagraph = $('<p>').html(`<b>Cantidad de personas:</b> ${persons}`);
    const dateParagraph = $('<p>').html(`<b>Fecha:</b> ${date}`);
    const timeParagraph = $('<p>').html(`<b>Hora:</b> ${time}`);

    // Añadir los párrafos al contenedor
    reservasContainer.append(nameParagraph);
    reservasContainer.append(emailParagraph);
    reservasContainer.append(phoneParagraph);
    reservasContainer.append(peopleParagraph);
    reservasContainer.append(dateParagraph);
    reservasContainer.append(timeParagraph);

    // Añadir el título y el contenedor al cuerpo de la página o a un elemento específico
    $('#principal').append(title, reservasContainer); 
}
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
