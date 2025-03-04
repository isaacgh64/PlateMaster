<?php
    require_once("../../utils/conexionBD.php");
    $conexion = conexionBD();
    //Creamos el producto
    if($_SERVER["REQUEST_METHOD"]=="POST"){
        $id = $_POST["id"];
            try{
                $conexion->exec("DELETE FROM reservas WHERE id_reserva='".$id."'");
                $response['status']='202';
                $response['consulta'] = "DELETE FROM reservas WHERE id_reserva='".$id."'";
            }catch(Exception $e){
                $response['status']='404';
                $response['error']=$e;
            }
        echo json_encode($response);
    }

?>