<?php
    session_start();
    require_once("../../utils/conexionBD.php");
    $conexion = conexionBD();
    if($_SERVER["REQUEST_METHOD"]=="POST"){
         $response=[];
         if(isset($_SESSION["user"])){
            $pass = $_POST["newPassword"];
             $user=$_SESSION["user"];
             try{
                $consulta = $conexion->exec("UPDATE usuario SET pass = '".password_hash($pass,PASSWORD_DEFAULT)."' WHERE user = '".$user."'");
                $response['status']="200";
             }catch(Exception $e){
                $response['status']="404";
                $response['error']=$e;
             }
         }else{
             $response['status']="404";
         }
         echo json_encode($response);
     }

?>