<?php  
    session_start();
    //Array de prueba con nuestros datos de las reservas
    $data = [
        "name" => "Juan",
        "mail" => "juan@juan.com",
        "tel" => 685694640,
        "persons" => 5,
        "date" => date("Y-m-d", strtotime("+" . rand(1, 30) . " days")),
        "time" => date("H:i", strtotime(rand(11, 23) . ":" . rand(0, 59)))
    ];
    //Obtenemos el usuario de la persona, y devolvemos el contenido a mostrar en caso positivo
    if($_SERVER["REQUEST_METHOD"]=="GET"){
        if(isset($_SESSION["ROL"])){
            $response["status"]="200";
            if($_SESSION["ROL"]=="ADMIN"||$_SESSION["ROL"]=="TRABAJADOR"){
                $response["rol"]="worker";
                foreach ($data as $key => $value) {
                    $response[$key]=$value;
                }
            }else{
                $response["rol"]="user";
            }
        }else{
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
            $response['status']='201';
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