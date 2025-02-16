<?php
    session_start();
    require_once("../../utils/conexionBD.php");
    $conexion = conexionBD();
    //Obtener los datos de la BD
    if($_SERVER["REQUEST_METHOD"]=="GET"){
        $response=[]; 
        if(isset($_SESSION["ID_ITEM"])&&$_SESSION["ID_ITEM"]!=-1){
            $id = $_SESSION["ID_ITEM"];
            //Obtenemos el id mediante la sessión que hemos creado antes
            try{
                $consulta = $conexion->query("SELECT * FROM productos WHERE id='".$id."'");
                $response['status']='200';
                if(isset($_SESSION["rol"])){
                    $response["rol"] = $_SESSION["rol"];
                }
                $response["data"]=$consulta->fetchAll((PDO::FETCH_ASSOC));
            }catch(Exception $e){
                $response["status"]='500';
            } 
        }else{
            $response["status"]="201";
        }
        echo json_encode($response);  
    }
    //Actualizamos el producto
    if($_SERVER["REQUEST_METHOD"]=="POST"){
        //Obtenemos el id mediante la sessión que hemos creado antes
        $id = 100;
        if(isset( $_SESSION["ID_ITEM"])){
            $id=$_SESSION["ID_ITEM"];
        }
        //Obtenemos los datos que mandamos
        $name = $_POST["name"];
        $description = $_POST["description"];
        $price = $_POST["price"];
        $urlImage = $_POST["imageUrl"];
        if($name==""||$price=="0.00 €"){
            $response['status']='404';
        }else{
            $response["response"]="\n-Nombre producto:".$name."\n-Descripción producto:".$description."\n-Precio pruducto:".$price."\n-URL imagen:".$urlImage;
            $response['status']='201';
        }
        
        echo json_encode($response);
    }
    //Borramos el producto
    if($_SERVER["REQUEST_METHOD"]=="DELETE"){
        //Obtenemos el id mediante la sessión que hemos creado antes
        $id =  $_SESSION["ID_ITEM"];
        $response['status']='202';
        echo json_encode($response);
    }
?>