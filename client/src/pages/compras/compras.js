import React, {useState} from 'react';
import Axios from 'axios';
import "./compras.css"
import {
    Link
  } from "react-router-dom";
import Button from '@mui/material/Button';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';


const Compras = () => {
  
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

    const [listaProdutos, setListaProdutos] = useState([]);
    const [comprados, setComprados] = useState([])

    const getProdutos = () => {
        Axios.get("http://localhost:3030/getProdutos").then((response) => {
          setListaProdutos(response.data);
        });
    };

    const comprarProduto = (id) => {
      Axios.get(`http://localhost:3030/getProdutos/${id}`).then((response) => {
        setComprados(response.data);
      })
    }

    return (
    <div className="main">          
        <div className='botoes'>
            <Link to="/create"><Button variant="contained" color="secondary" type='button'>CRIAR NOVO</Button></Link>
            <Button variant="contained" className="ver-produtos-button" onClick={getProdutos}>ver produtos</Button>
        </div> 
      {
        listaProdutos.map((produto, key) => {
          return <div className="list-produto" key={produto.id}>
          <table>
              <thead>
                <tr >
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Preço</th>
                  <th>Compra</th>
                  <th>Data da Criação</th> 
                </tr>
              </thead>
              
              <tbody>
                <tr>
                 <td>{produto.nome} </td>
                 <td>{produto.descricao}</td>
                 <td>R${produto.preco}</td>
                
                 <td><Button variant="contained" color="success" onClick={() => {comprarProduto(produto.id)}}>Comprar</Button></td>
                 <td>{produto.data_criacao}</td>
             
                </tr>
              </tbody>
           </table> 
           </div>
        })
      }

      {
        comprados.map((produto, key) => {
          return <div key={produto.id}>
           <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
           <AccordionSummary
        
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Compra 
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Toque para expandir</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul>
              <li><span><h3>Produto</h3></span></li>
              <li>{produto.nome}</li>
              <li><span><h3>Total</h3></span></li>
              <li>R$: {produto.preco}</li>
            </ul>
          </Typography>
        </AccordionDetails>
           </Accordion>
          </div>
        })
      }
    </div>
    );
};

export default Compras;