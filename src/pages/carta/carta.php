<?php
    session_start();
    if($_SERVER["REQUEST_METHOD"]=="GET"){
        $data = ["id" => 1,"name"=>"Croquetas","image"=>"https://imag.bonviveur.com/servimos-las-croquetas-de-jamon-y-queso.jpg","description"=>"Descubre el sabor de nuestras increibles croquetas totalmente caseras","price"=>15.00];
        $response=[];
        $rol = "";
        if(isset($_SESSION["ROL"])){
            $rol = $_SESSION["ROL"];
        }
        $response['rol']=$rol;
        $response['status']='200';
        foreach ($data as $key => $value) {
            $response[$key]=$value;
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
        $_SESSION["ID_ITEM"]=100;
    }
?>