loadData();
//Llamamos a nuestra BD para cargar los datos de nuestra página web
function loadData(){
   fetch("carta.php",{
        method:"GET",
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
   }).then(response => response.json()).then(value=>{
        if(value.status=="200"){
            for(var i=0;i<24;i++){
                //Creamos nuestro div contenedor
                var rows = $("<div></div>").addClass("rows");
                for(var j=0;j<3;j++){
                    //Creamos nuestro elemento item
                    var item = $("<div></div>").addClass("item").attr("id",value.id).attr("onclick","sentData(this)");
                    
                    //Creamos nuestro div de imagen
                    var imageContainer = $("<div></div>").addClass("imge");
                    var src = $("<img>").attr("src",value.image).attr("alt",value.name);
                    imageContainer.append(src);

                   // Crear el contenedor del texto
                    var text = $("<div></div>").addClass("text");
                    text.append($("<h4></h4>").text(value.name));
                    text.append($("<p></p>").text(value.description));
                    text.append($("<p></p>").text(`${value.price}.00 €`));

                    // Añadir imagen y texto al ítem
                    item.append(imageContainer).append(text);

                    // Añadir el ítem a la fila
                    rows.append(item);
                }
                if(i<6){
                    $("#entrantes").append(rows);
                }else if(i<12){
                    $("#pescado").append(rows);
                }else if(i<18){
                    $("#carnes").append(rows);
                }else{
                    $("#postres").append(rows);
                }
            }
        }else{
            alert("Error en BD, no se han podido cargar los datos, intentalo de nuevo más tarde");
        }
   });
}
function sentData(div){
    //Enviamos los datos a nuestro PHP mediante AJAX
    console.log("buenas");
    fetch("carta.php",{
        method:"POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        body:`idItem=${encodeURIComponent($(div).attr("id"))}`,
    }).then(response => response.json()).then(data=>{
        if(data.status=="ok"){
            alert("El elemento existe en la BD");
        }else{
            alert("El item no existe en la BD");
        }
        
    })
}