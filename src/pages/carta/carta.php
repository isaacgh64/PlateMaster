<?php
    session_start();
    require_once("../../utils/conexionBD.php");
    $conexion = conexionBD();
    if($_SERVER["REQUEST_METHOD"]=="GET"){
        $response=[];
        try{
            $consulta = $conexion->query("SELECT * FROM productos");
            $response['status']='200';
            if(isset($_SESSION["ROL"])){
                $response["rol"] = $_SESSION["rol"];
            }
            $response["data"]=$consulta->fetchAll((PDO::FETCH_ASSOC));
        }catch(Exception $e){
            $response["status"]='500';
        }
        echo json_encode($response);    
    }
    //  Comprobamos que estamos mandando los datos por POST para guardarlos en una SESSION
    if($_SERVER["REQUEST_METHOD"]=="POST"){
        //Recogemos los datos de nuestro login
        $id_item = $_POST["idItem"];
        $response=[];
        if($id_item!=""){
            $response['status']='200';
            $_SESSION["ID_ITEM"]=$id_item;
        }else{
            $response['status']='404';
        }
        echo json_encode($response);
    }
    if($_SERVER["REQUEST_METHOD"]=="DELETE"){
        $_SESSION["ID_ITEM"]=-1;
    }
?>