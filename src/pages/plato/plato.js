loadData();
//Llamamos a nuestra BD para cargar los datos de nuestra página web
function loadData(){
    $.ajax({
        type: "GET",
        url: "plato.php",
        dataType: "json",
        success: function (response) {
            console.log(response);
            if(response.status=="200"){
                response.data.forEach(element => {
                    if(response.rol==1){
                        //Creamos un input que está referido al nombre del producto
                        createView(element.id,element.name,element.image,element.description,element.price,element.type);
                        //Creamos nuestros botones
                        var btnDelete = $("<button></button>").attr("id","btnDelete").attr("class","btnDelete").attr("onClick","DeleteProduct()").html("Borrar producto");
                        var btnUpdate = $("<button></button>").attr("id","btnUpdate").attr("class","btnUpdate").attr("onClick","UpdateProduct()").html("Actualizar producto");
                        $("#principal").append(btnUpdate);
                        $("#principal").append(btnDelete);
                    }else if(response.rol==2){
                         //Creamos un input que está referido al nombre del producto
                         createView(element.id,element.name,element.image,element.description,element.price,element.type);
                         //Creamos nuestros botones
                         var btnUpdate = $("<button></button>").attr("id","btnUpdate").attr("class","btnUpdate").attr("onClick","UpdateProduct()").html("Actualizar producto");
                         $("#principal").append(btnUpdate);
                         
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
            }else if(response.status=="201"){
                createView("","","","","");
                var btnCreate = $("<button></button>").attr("id","btnCreate").attr("class","btnUpdate").attr("onClick","createProduct()").html("Publicar producto");
                $("#principal").append(btnCreate);
            }else{
                alert("Error en BD, no se han podido cargar los datos, intentalo de nuevo más tarde");
            }
        }
    });
}

function createView(id,name,image,description,price,type){
    var idProducto = $("<input>").attr("id","idProducto").attr("value",id).attr("type","hidden");
    $("#principal").append(idProducto);
    var inputName = $("<input>").attr("class","h2").attr("id","nameInput").attr("value",name).attr("placeholder","Nombre del producto");
    $("#principal").append(inputName);
    var div = $("<div></div>").attr("id","contenido");
    var img=$("<img>").attr("src",image);
    div.append(img);
    var inputUrlImage= $("<input>").attr("value",image).attr("class","img").attr("id","urlImage").attr("placeholder","URL de la imagen");
    div.append(inputUrlImage);
    //Creamos un div de texto 
    var divTexto = $("<div></div>").attr("id","texto");
    var textArea = $("<textArea></textArea>").attr("cols",80).attr("rows",20).attr("id","areaDescription").html(description).attr("placeholder","Descripción del producto");;
    divTexto.append(textArea);
    var select = $("<select></select>").attr("id","type");
    var option1 = $("<option></option>").html("Entrantes").val("entrantes");
    var option2 = $("<option></option>").html("Carnes").val("carne");
    var option3 = $("<option></option>").html("Pescados").val("pescado");
    var option4 = $("<option></option>").html("Postres").val("postre");
    $(select).append(option1);
    $(select).append(option2);
    $(select).append(option3);
    $(select).append(option4);
    $(divTexto).append(select);
    var inputPrice = $("<input>").attr("id","precio").attr("value",`${price} €`);
    divTexto.append(inputPrice);
    div.append(divTexto);
    $("#principal").append(div);
}

//Borramos el producto de nuestra BD al mandar el Delete
function DeleteProduct(){
    var id = document.getElementById("idProducto").value;
    $.ajax({
        type: "POST",
        url: "deleteDisk.php",
        data: {"id":id},
        dataType: "json",
        success: function (response) {
            console.log(response);
            if(response.status=="202"){
                alert("Producto borrado con éxito de la BD");
                reload();
            }else{
                alert("Algo fue mal, no se pudo borrar el producto");
            }
        }
    });
}

function UpdateProduct(){
    var id = document.getElementById("idProducto").value;
    var name = document.getElementById("nameInput").value;
    var description = document.getElementById("areaDescription").value;
    var type = document.getElementById("type").value;
    var price = document.getElementById("precio").value.split(" ")[0];
    var imageUrl = document.getElementById("urlImage").value;
    $.ajax({
        type: "POST",
        url: "plato.php",
        data: {"id":id,"name":name,"description":description,"type":type,"price":price,"image":imageUrl},
        dataType: "json",
        success: function (response) {
            if(response.status == 201){
                alert("Producto actualizado con éxito");
                reload();
            }else{
                alert("Ocurrió un error, intentelo de nuevo");
            }
        }
    });
}

function createProduct(){
    var id = document.getElementById("idProducto").value;
    var name = document.getElementById("nameInput").value;
    var description = document.getElementById("areaDescription").value;
    var type = document.getElementById("type").value;
    var price = document.getElementById("precio").value.split(" ")[0];
    var imageUrl = document.getElementById("urlImage").value;
    $.ajax({
        type: "POST",
        url: "uploadDisk.php",
        data: {"id":id,"name":name,"description":description,"type":type,"price":price,"image":imageUrl},
        dataType: "json",
        success: function (response) {
            console.log(response);
            if(response.status == 201){
                alert("Producto añadido a la Base de datos con éxito");
                reload();
            }else{
                alert("Ocurrió un error, intentelo de nuevo");
            }
        }
    });
}

function reload(){
    window.location.href="../carta/carta.html";
}