<?php
    session_start();
    // Limpiar todas las variables de la sesión
    session_unset();
    // Destruir la sesión
    session_destroy();

    echo json_encode($response["status"]="200");
?>