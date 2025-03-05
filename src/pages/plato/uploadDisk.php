<?php
    require_once("../../utils/conexionBD.php");
    $conexion = conexionBD();
    //Creamos el producto
    if($_SERVER["REQUEST_METHOD"]=="POST"){
        $name = $_POST["name"];
        $description = $_POST["description"];
        $type = $_POST["type"];
        $price = $_POST["price"];
        $urlImage = $_POST["image"];
        if($name==""||$price<1){
            $response['status']='404';
            $response['error']='El nombre y precio son campos obligatorios';
        }else{
            try{
                $conexion->exec("INSERT INTO `productos` (`name`, `description`,`price`,`type`,`image`) VALUES ('".$name."','".$description."','".$price."','".$type."','".$urlImage."')");
                $response['status']='201';
            }catch(Exception $e){
                $response['status']='404';
                $response['error']=$e;
            }
            
        }
        
        echo json_encode($response);
    }

?>