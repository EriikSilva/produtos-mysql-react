import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./home.css"




const Home = () => {    

    return (
        <div>
            <h1>Teste para o ICTS :)</h1>
            <div className="principal">
            
            <h1>Bem Vindo!! :)</h1>
           
            <Link to="/create"><Button variant="contained">Criar Novo</Button></Link>
            <Link to="/buy"><Button variant="contained">Comprar</Button></Link>
            </div>
        </div>
    )

}


export default Home;