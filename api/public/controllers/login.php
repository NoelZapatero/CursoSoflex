<?php
    $app->post('/login', function ($request, $response, $args) {

        $input = file_get_contents("php://input");
        $data = json_decode($input, true);

        $res = [];
    
        if($data["user"] == "admin" && $data["pass"] == "admin"){
            $res["user"] = $data["user"];
            
            $idusuario = 99;
            $res["id"] = $idusuario;

            $token = [];
            $token["idUsuario"] = $idusuario;
            $token["usuario"] = "Juan Perez";
            $token["permisos"] = ["PEDIDOS_BORRAR"
                                ,"PEDIDOS_AGREGAR"];
    
            $res["token"] = G::CrearToken($token);
        }else{
            $res["user"] = "Error";
            $res["id"] = -1;
            $res["token"] = null;
        }

        $payload = json_encode($res);
        
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    });
?>