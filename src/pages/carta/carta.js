loadData();
//Llamamos a nuestra BD para cargar los datos de nuestra página web
function loadData(){
    $.ajax({
        type: "GET",
        url: "carta.php",
        dataType: "json",
        success: function (response) {
            if(response.status=="200"){
                console.log(response);   
                response.data.forEach(element => {
                    var rows = $("<div></div>").addClass("rows");
                    //Creamos nuestro elemento item
                    var item = $("<div></div>").addClass("item").attr("id",element.id).attr("onclick",`sentData(${element.id})`);
                    
                    //Creamos nuestro div de imagen
                    var imageContainer = $("<div></div>").addClass("imge");
                    var src = $("<img>").attr("src",element.image).attr("alt",element.name);
                    imageContainer.append(src);

                   // Crear el contenedor del texto
                    var text = $("<div></div>").addClass("text");
                    text.append($("<h4></h4>").text(element.name));
                    text.append($("<p></p>").text(element.description));
                    text.append($("<p></p>").text(`${element.price} €`));

                    // Añadir imagen y texto al ítem
                    item.append(imageContainer).append(text);

                    // Añadir el ítem a la fila
                    rows.append(item);
                    switch (element.type) {
                        case "entrantes":
                            $("#entrantes").append(rows);
                            break;
                        case "carne":
                            $("#carnes").append(rows);
                            break;
                        case "pescado":
                            $("#pescado").append(rows);
                            break;
                        case "postre":
                            $("#postres").append(rows);
                            break;
                        default:
                            break;
                    }
                });
                if(response.rol==1){
                    var btnEntrantes = $("<button></button>").addClass("btnAdd").attr({onclick:"sentData(-1)",id:"idEntrantes"}).html("Añadir producto");
                    $("#entrantes").append(btnEntrantes);
                    var btnPescado = $("<button></button>").addClass("btnAdd").attr({onclick:"sentData(-1)",id:"idPescados"}).html("Añadir producto");
                    $("#pescado").append(btnPescado);
                    var btnCarnes = $("<button></button>").addClass("btnAdd").attr({onclick:"sentData(-1)",id:"idCarnes"}).html("Añadir producto");
                    $("#carnes").append(btnCarnes);
                    var btnPostres = $("<button></button>").addClass("btnAdd").attr({onclick:"sentData(-1)",id:"idPostres"}).html("Añadir producto");
                    $("#postres").append(btnPostres);
                }   
            }else{
                alert("Ocurrió  un error en la Base de datos, perdona las molestias");
            }
        }
    });
}
function sentData(id){
    //Enviamos los datos a nuestro PHP mediante AJAX
    fetch("carta.php",{
        method:"POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        body:`idItem=${encodeURIComponent(id)}`,
    }).then(response => response.json()).then(data=>{
        if(data.status=="200"){
           location.href="../plato/plato.html";
        }else{
            alert("Error, no se pueden mostrar los datos del elemento seleccionado");
        }
        
    })
}