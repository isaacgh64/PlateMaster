<?php
      function conexionBD(){
        $server = "localhost";
        $user = "isaacgh64";
        $pw = "Prueba-123!";
        $bd="platemaster";
        $conexion = new PDO('mysql:host='.$server.';dbname='.$bd.'', $user, $pw);
        return $conexion;
    }
     
?>