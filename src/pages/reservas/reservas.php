<?php 
    session_start();
    require_once("../../utils/conexionBD.php");
    $conexion = conexionBD();
    //Obtenemos el usuario de la persona, y devolvemos el contenido a mostrar en caso positivo
    if($_SERVER["REQUEST_METHOD"]=="GET"){
        if(isset($_SESSION["rol"])){ 
            $response["rol"]="worker";
            try{
                $consulta = $conexion->query("SELECT * FROM reservas");
                $response["status"]="200";
                $response["data"]=$consulta->fetchAll((PDO::FETCH_ASSOC));
            }catch(Exception $e){
                $response["status"]="404";
                $response["error"]=$e;
            }
        }else{
            if(isset($_SESSION["mail"])){
                $consulta = $conexion->query("SELECT * FROM reservas WHERE mail='".$_SESSION["mail"]."'");
                $response["status"]="200";
                $response["data"]=$consulta->fetchAll((PDO::FETCH_ASSOC));
            }else{
                $response["data"]="No data";
            }
            $response["status"]="200";
            $response["rol"]="user";
        }
        echo json_encode($response);
    }

    //Mandamos los datos de la reserva a nuestra BBDD
    if($_SERVER["REQUEST_METHOD"]=="POST"){
        $name = $_POST["name"];
        $mail = $_POST["mail"];
        $tel = $_POST["tel"];
        $persons = $_POST["persons"];
        $date = $_POST["date"];
        $time = $_POST["time"];
        $response=[];
        if($name!=""&&$mail!=""&&$tel!=""&&$persons!=""&&$date!=""&&$time!=""){
            try{
                $conexion->exec("INSERT INTO `reservas` (`nombre`, `mail`,`telefono`,`c_personas`,`fecha`,`hora`) VALUES ('".$name."','".$mail."','".$tel."','".$persons."','".$date."','".$time."')");
                $response['status']='201';
                $_SESSION["mail"]=$mail;
            }catch(Exception $e){
                $response['status']='404';
                $response['error']=$e;
            }
        }else{
            if($name==""){
                $response['status']='404';
                $response['name']='El campo "Nombre" no puede estar vacío';
            }
            if($mail==""){
                $response['status']='404';
                $response['mail']='El campo "Correo eléctronico" no puede estar vacío';
            }
            if($tel==""){
                $response['status']='404';
                $response['tel']='El campo "Teléfono" no puede estar vacío';
            }
            if($persons==""){
                $response['status']='404';
                $response['persons']='El campo "Cantidad de personas" no puede estar vacío';
            }
            if($date==""){
                $response['status']='404';
                $response['date']='El campo "Fecha" no puede estar vacío';
            }
            if($time==""){
                $response['status']='404';
                $response['time']='El campo "Hora" no puede estar vacío';
            }
        }
        echo json_encode($response);
    }
?>