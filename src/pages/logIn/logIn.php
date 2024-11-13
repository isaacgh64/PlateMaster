<?php
    // Comprobamos que estamos mandando los datos por POST
    if($_SERVER["REQUEST_METHOD"]=="POST"){
        //Recogemos los datos de nuestro login
        $user = $_POST["username"];
        $pass = $_POST["password"];
        $response=[];
        if($user==""&&$pass==""){
            $response['status']='error';
            $response['user']='El usuario no puede estar vacío';
            $response['pass']='La contraseña no puede estar vacía';
        }else{
            if($user==""){
                $response['status']='error';
                $response['user']='El usuario no puede estar vacío';
            }
            else if($pass==""){
                $response['status']='error';
                $response['pass']='La contraseña no puede estar vacía';
            }
        }
        echo json_encode($response);
    }else{
        header("Location:login.html");
    }
?>