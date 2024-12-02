<?php
    if($_SERVER["REQUEST_METHOD"]=="GET"){
        $data = ["id" => 1,"name"=>"Croquetas","image"=>"https://imag.bonviveur.com/servimos-las-croquetas-de-jamon-y-queso.jpg","description"=>"Descubre el sabor de nuestras increibles croquetas totalmente caseras","price"=>15.00];
        $response=[];
        $response['status']='200';
        foreach ($data as $key => $value) {
            $response[$key]=$value;
        }
        echo json_encode($response);
    }
    // Comprobamos que estamos mandando los datos por POST
    /*if($_SERVER["REQUEST_METHOD"]=="POST"){
        //Recogemos los datos de nuestro login
        $id_item = $_POST["idItem"];
        $response=[];
        if($id_item!="item"){
            $response['status']='error';
        }else{
            $response['status']='ok';
        }
        echo json_encode($response);
    }*/
?>