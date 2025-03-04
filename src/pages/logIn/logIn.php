<?php
    session_start();
    require_once("../../utils/conexionBD.php");
    $conexion = conexionBD();
   if($_SERVER["REQUEST_METHOD"]=="GET"){
        $response=[];
        if(isset($_SESSION["user"])&&isset($_SESSION["rol"])){
            $user=$_SESSION["user"];
            $rol = $_SESSION["rol"];
            $consulta = $conexion->query("SELECT * FROM usuario WHERE user='".$user."' AND rol='".$rol."'");
            $check=[];
            foreach ($consulta as $key => $value) {
                $check=$value;
            }
            if(sizeof($check)>0){
                $response['status']="200";
                $response['data']=$check;
            }else{
                $response['status']="404";
            }
        }else{
            $response['status']="404";
        }
        echo json_encode($response);
    }

    // Comprobamos que estamos mandando los datos por POST
    if($_SERVER["REQUEST_METHOD"]=="POST"){
        $response=[];
        //Recogemos los datos de nuestro login
        $user = urldecode($_POST["username"]);
        $pass = $_POST["password"];
        if($user!=""&&$pass!=""){
            //echo "SELECT * FROM usuario WHERE user='".$user."'";
                $consulta = $conexion->query("SELECT user,pass,rol FROM usuario WHERE user='".$user."'");
                $consulta2 = $conexion->query("SELECT user,pass,rol FROM usuario WHERE user='".$user."'");
                $array = $consulta2->fetchAll((PDO::FETCH_ASSOC));
                if(sizeof($array)==1){
                    foreach ($consulta as $key => $value) {
                        if(password_verify($pass,$value["pass"])){
                            $response['status']='200';
                            $_SESSION["user"]=$value["user"];
                            $_SESSION["rol"]=$value["rol"];
                        }else{
                            $response['status']='404';
                            $response['error']='El usuario o la contraseña están mal introducidos';
                        }
                    }
                }else{
                    $response['status']='404';
                    $response['error']='El usuario o la contraseña están mal introducidos';
                }
                
        }else{
            if($user==""){
                $response['status']='404';
                $response['user']='El usuario no puede estar vacío';
            }
            if($pass==""){
                $response['status']='404';
                $response['pass']='La contraseña no puede estar vacía';
            }
            $response['error']='';
        }
        echo json_encode($response);
    }
?>