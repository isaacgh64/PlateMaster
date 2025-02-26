<?php
    require_once("../../utils/conexionBD.php");
    $conexion = conexionBD();
    //Creamos el producto
    if($_SERVER["REQUEST_METHOD"]=="POST"){
        $id = $_POST["id"];
        $response['id']=$id;
            try{
                $conexion->exec("DELETE FROM productos WHERE id='".$id."'");
                $response['status']='202';
            }catch(Exception $e){
                $response['status']='404';
                $response['error']=$e;
            }
        echo json_encode($response);
    }

?>