<?php
    session_start();
    //Obtener los datos de la BD
    if($_SERVER["REQUEST_METHOD"]=="GET"){
        $rol = "";
        if(isset($_SESSION["ROL"])){
            $rol = $_SESSION["ROL"];
        }
        if(isset($_SESSION["ID_ITEM"])&&$_SESSION["ID_ITEM"]!=100){
             //Obtenemos el id mediante la sessión que hemos creado antes
            $id =  $_SESSION["ID_ITEM"];
            //Obtenemos el rol del usuario para mandarlo
        
            //Cargamos los datos
            $data = ["id" => 1,
            "name"=>"Croquetas",
            "image"=>"https://imag.bonviveur.com/servimos-las-croquetas-de-jamon-y-queso.jpg",
            "description"=>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Error consequuntur perferendis corporis ex accusantium minima inventore quam, libero assumenda aspernatur porro dolores deserunt debitis quasi? Nesciunt molestias exercitationem eaque praesentium.
                        Delectus earum debitis dolorem explicabo recusandae ea, quae architecto repudiandae maiores exercitationem odio illo enim, soluta accusantium placeat doloremque! Laborum aliquam numquam blanditiis facere nulla odit aperiam, nihil illo harum.
                        Sint beatae, quaerat omnis distinctio iste non quia ad. Delectus laudantium, officia maiores minus eum aliquid quos omnis excepturi eius eos temporibus laborum sunt dolorum recusandae cum earum error nostrum?",
            "price"=>15.00];
           
        }else{
            $data = ["id" => 100,
            "name"=>"",
            "image"=>"",
            "description"=>"",
            "price"=>0];
        }
        $response=[];
        $response['status']='200';
        $response['rol']=$rol;
        foreach ($data as $key => $value) {
            $response[$key]=$value;
        }
        echo json_encode($response);
    }
    //Actualizamos el producto
    if($_SERVER["REQUEST_METHOD"]=="POST"){
        //Obtenemos el id mediante la sessión que hemos creado antes
        $id = 100;
        if(isset( $_SESSION["ID_ITEM"])){
            $id=$_SESSION["ID_ITEM"];
        }
        //Obtenemos los datos que mandamos
        $name = $_POST["name"];
        $description = $_POST["description"];
        $price = $_POST["price"];
        $urlImage = $_POST["imageUrl"];
        if($name==""||$price=="0.00 €"){
            $response['status']='404';
        }else{
            $response["response"]="\n-Nombre producto:".$name."\n-Descripción producto:".$description."\n-Precio pruducto:".$price."\n-URL imagen:".$urlImage;
            $response['status']='201';
        }
        
        echo json_encode($response);
    }
    //Borramos el producto
    if($_SERVER["REQUEST_METHOD"]=="DELETE"){
        //Obtenemos el id mediante la sessión que hemos creado antes
        $id =  $_SESSION["ID_ITEM"];
        $response['status']='202';
        echo json_encode($response);
    }
?>