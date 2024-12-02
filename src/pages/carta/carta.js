loadData();
//Llamamos a nuestra BD para cargar los datos de nuestra página web
function loadData(){
   fetch("carta.php",{
        method:"GET",
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
   }).then(response => response.json()).then(value=>{
        if(value.status=="200"){
            console.log(value.id);
            console.log(value.name);
            console.log(value.description);
            console.log(value.image);
            console.log(value.price);
            for(var i=0;i<36;i++){
                var rows = $("<div>").attr("id","rows");
                for(var j=0;j<3;j++){
                    var item = $("<div>").attr("id",value.id);
                    item.append("<div>").attr("id","imge").append("<img>").attr("src",value.image).attr("alt",value.name);
                }
                rows.append(item);
                if(i<6){
                    
                }
            }
            $("#entrantes").append(rows);
        }else{
            alert("Error en BD, no se han podido cargar los datos, intentalo de nuevo más tarde");
        }
   });
}
/*function sentData(div){
    //Enviamos los datos a nuestro PHP mediante AJAX
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
}*/