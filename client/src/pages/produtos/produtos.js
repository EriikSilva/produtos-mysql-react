import React, {useState} from "react";
import "./produtos.css";
import Axios from 'axios'
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";


const Produtos = () =>{
    const [nome, setNome] = useState('');
    const [descricao,setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    
    const [novoNome, setNovoNome] = useState('')
    const [novaDescricao, setNovaDescricao] = useState('')
    const [novoPreco, setNovoPreco] = useState(0)


    const [listaProdutos, setListaProdutos] = useState([]);

    // const [data, setData] = useState('');

    // const getData = () => {
    //     Axios.get('http://localhost:3030/getHora', {
    //         data: data
    //     }).then((res) => {
    //         setListaProdutos(res.data);
    //     })
      
    // }


    const adicionarProduto = () => {
        Axios.post('http://localhost:3030/create', {
           //back //front 
           nome: nome,
           descricao: descricao,
           preco: preco,
        }).then(() => {
            setListaProdutos([...listaProdutos, {
                //back //front 
                nome: nome,
                descricao: descricao,
                preco: preco,
             }]);

            alert("adicionado")
        });
    };

    

    const updateProdutoNome = (id) => {
        Axios.put('http://localhost:3030/updateProdutosNome',
         {
            id: id,
            nome: novoNome,
        }).then((response) => {
            setListaProdutos(listaProdutos.map((produto) => {
                return produto.id === id ? {
                    id: produto.id,
                    nome: novoNome,
                    descricao: produto.descricao,
                preco:produto.preco
            } : produto
            }))
            console.log(novoNome);
        });
    }

    const updateProdutoDescricao = (id) => {
        Axios.put('http://localhost:3030/updateProdutosDescricao',
        {   
           id: id,
           descricao: novaDescricao
       }).then((response) => {
           setListaProdutos(listaProdutos.map((produto) => {
               return produto.id === id ? {
                   id: produto.id,
                   nome: produto.nome,
                   descricao: novaDescricao,
               preco:produto.preco
           } : produto
           }));
       });
    }

    const updateProdutoPreco = (id) => {
        Axios.put('http://localhost:3030/updateProdutoPreco', 
        {
            id: id,
            preco: preco
        }).then((response)=> {
            setListaProdutos(listaProdutos.map((produto)=>{
                return produto.id === id ? {
                    id:id,
                    nome: produto.nome,
                    descricao: produto.descricao,
                    preco: novoPreco
                } : produto
                
            }))
        })
    }

    const getProdutos = () => {
        Axios.get("http://localhost:3030/getProdutos").then((response) => {
            setListaProdutos(response.data);
        });
    };

    const deleteProduto = (id) =>{
        Axios.delete(`http://localhost:3030/delete/${id}`).then((response) => {
            setListaProdutos(listaProdutos.filter((produto) => {
                return produto.id !== id; 
            }));
        });
    };

    return(
        <div className="main">
          
            <div className="inputs-create">
                <label>Nome:</label>
                <input
                placeholder="celular"
                type='text'
                onChange={(event) => {
                setNome(event.target.value);
                }}
                />
                
                <label>Descrição:</label>
                <input
                placeholder="Produto bom"
                required="required"
                type='text'
                onChange={(event) => {
                setDescricao(event.target.value);
                }}/>

                <label>Preço:</label>
                <input
                placeholder="12.00"
                required="required"
                type='number'
                onChange={(event) => {
                setPreco(event.target.value);
                }}/>             
                <Button color="success" variant="contained"   type="submit" onClick={adicionarProduto}>CRIAR NOVO PRODUTO</Button>
                <Link to="/buy"><Button className="button-buy" variant="contained">Comprar</Button></Link>
            </div>

            <div className="get-produtos">  
                
                <button className="ver-produtos-button" onClick={getProdutos}>ver produtos</button>
                

               
                {
                  listaProdutos.map((produto, key) => {
                        return <div className="list-produtos" key={produto.id}>
                        
                        <table>
                          <thead>
                          <tr className="th">
                                <th rowspan="2">Nome</th>
                                <th rowspan="2">Descrição</th>
                                <th rowspan="2">Preço</th>
                                <th rowspan="2">Editar Nome</th>
                                <th rowspan="2" >Editar Descrição</th>
                                <th rowspan='2'>Editar Preço</th>
                                <th rowspan="2">Deletar</th>
                                <th rowspan="2">Data/Hora da Criaçao</th>
                            </tr>
                          </thead>
                              <tbody>
                              <tr>
                                    <td>{produto.nome} </td>
                                    <td>{produto.descricao}</td>
                                    <td>R${produto.preco}</td>
                                    <td>
                                    <input type="text" placeholder="nome"
                                    onChange={(event) => {
                                    setNovoNome(event.target.value);
                                    }}>
                                    </input>

                                    <Button variant="contained" onClick={() => {updateProdutoNome(produto.id)}}>Atualizar</Button>
                                    </td>
                                    
                                    <td>
                                    <input 
                                    type="text" 
                                    placeholder="descrição" 
                                    onChange={(event) => {
                                    setNovaDescricao(event.target.value);
                                    }}>
                                    </input>
                                        <Button variant="contained" onClick={() => {updateProdutoDescricao(produto.id)}}>Atualizar</Button>
                                    </td>

                                    <td>
                                    <input 
                                    type="number" 
                                    placeholder="preço" 
                                    onChange={(event) => {
                                    setNovoPreco(event.target.value);
                                    }}>
                                    </input>
                                        <Button variant="contained" onClick={() => {updateProdutoPreco(produto.id)}}>Atualizar</Button>
                                    </td>


                                    <td>
                                        <Button variant="contained" color="error" onClick={() =>{deleteProduto(produto.id)}}>Deletar</Button>
                                    </td>
                                    <td>{produto.data_criacao}</td>
                                    
                                </tr>
                              </tbody>
                            </table>  

                                              
                        </div>
                    })
                }
            </div>


        </div>
    )
}

export default Produtos;