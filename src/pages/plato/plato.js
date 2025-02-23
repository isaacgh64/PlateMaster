loadData();
//Llamamos a nuestra BD para cargar los datos de nuestra página web
function loadData(){
    $.ajax({
        type: "GET",
        url: "plato.php",
        dataType: "json",
        success: function (response) {
            console.log(response);
            if(response.status=="200" || response.status=="201"){
                response.data.forEach(element => {
                    if(response.rol==1){
                        //Creamos un input que está referido al nombre del producto
                        var inputName = $("<input>").attr("class","h2").attr("id","nameInput").attr("value",element.name).attr("placeholder","Nombre del producto");
                        $("#principal").append(inputName);
                        var div = $("<div></div>").attr("id","contenido");
                        var img=$("<img>").attr("src",element.image);
                        div.append(img);
                        var inputUrlImage= $("<input>").attr("value",element.image).attr("class","img").attr("id","urlImage").attr("placeholder","URL de la imagen");
                        div.append(inputUrlImage);
                        //Creamos un div de texto 
                        var divTexto = $("<div></div>").attr("id","texto");
                        var textArea = $("<textArea></textArea>").attr("cols",80).attr("rows",20).attr("id","areaDescription").html(element.description).attr("placeholder","Descripción del producto");;
                        divTexto.append(textArea);
                        var inputPrice = $("<input>").attr("id","precio").attr("value",`${element.price} €`);
                        divTexto.append(inputPrice);
                        div.append(divTexto);
                        $("#principal").append(div);
                        //Creamos nuestros botones
                        if(element.id!=-1){
                            var btnDelete = $("<button></button>").attr("id","btnDelete").attr("class","btnDelete").attr("onClick","DeleteProduct()").html("Borrar producto");
                            var btnUpdate = $("<button></button>").attr("id","btnUpdate").attr("class","btnUpdate").attr("onClick","UpdateProduct()").html("Actualizar producto");
                       
                            $("#principal").append(btnUpdate);
                            $("#principal").append(btnDelete);
                        }else{
                            var btnUpdate = $("<button></button>").attr("id","btnUpdate").attr("class","btnUpdate").attr("onClick","UpdateProduct()").html("Publicar producto");
                            $("#principal").append(btnUpdate);
                        }
                        
                    }else{
                        //Creamos nuestro h2 y lo añadimos a nuestro div principal
                        var h2 = $("<h2></h2>").html(element.name);
                        $("#principal").append(h2);
                        //Creamos nuestro div de contenido
                        var div = $("<div></div>").attr("id","contenido");
                        //Añadimos la imagen a nuestro div de contenido
                        var img=$("<img>").attr("src",element.image);
                        div.append(img);
                        //Creamos un div de texto 
                        var divTexto = $("<div></div>").attr("id","texto");
                        var p = $("<p></p>").html(element.description);
                        divTexto.append(p);
                        var pPrice = $("<p></p>").attr("id","precio").html(`${element.price} €`);
                        divTexto.append(pPrice);
                        div.append(divTexto);
                        $("#principal").append(div);
                    }
                });               //Configuramos la página según el rol
            }else{
                alert("Error en BD, no se han podido cargar los datos, intentalo de nuevo más tarde");
            }
        }
    });
}

//Borramos el producto de nuestra BD al mandar el Delete
function DeleteProduct(){
    fetch("plato.php",{
        method:"DELETE",
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
   }).then(response => response.json()).then(value=>{
        if(value.status=="202"){
            alert("Producto borrado con éxito de la BD")
        }
   });  
}

function UpdateProduct(){
    var name = document.getElementById("nameInput").value;
    var description = document.getElementById("areaDescription").value;
    var type = document.getElementById("type").value;
    var price = document.getElementById("precio").value;
    var imageUrl = document.getElementById("urlImage").value;
    $.ajax({
        type: "POST",
        url: "plato.php",
        data: {"name":name,"description":description,"price":price,"image":imageUrl},
        dataType: "dataType",
        success: function (response) {
            
        }
    });
    /*fetch("plato.php",{
        method:"POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        body:`name=${encodeURIComponent(name)}&description=${encodeURIComponent(description)}&price=${encodeURIComponent(price)}&imageUrl=${encodeURIComponent(imageUrl)}`,
   }).then(response => response.json()).then(value=>{
        if(value.status=="201"){
            alert(`Producto actualizado con éxito de la BD, los datos son los siguientes:${value.response}`);
        }
        else if(value.status=="404"){
            alert("Los campos Nombre y Precio son obligatorios");
        }
   });*/
}