const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'icts'
});

app.post('/create', (req, res) => {
                    //recuperando valor do front
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const preco = req.body.preco;



    db.query('INSERT INTO produto (nome, descricao, preco) VALUES (?,?,?)',
     [nome, descricao, preco],
     (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send('valores inseridos');
        };
     });
});


app.get("/getProdutos", (req, res) => {
    db.query('SELECT * FROM produto', (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        };
    });
});

app.get("/getProdutos/:id", (req, res) => {
    const id = req.params.id
    db.query('SELECT * FROM produto WHERE id = ?',[id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        };
    });
});

app.put("/updateProdutosNome", (req, res) => {
    const id = req.body.id
    const nome = req.body.nome
    db.query("UPDATE produto SET nome = ? WHERE id = ?", [nome, id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});


app.put("/updateProdutosDescricao", (req, res) => {
    const id = req.body.id
    const descricao = req.body.descricao

    db.query("UPDATE produto SET descricao = ? WHERE id = ?", [descricao, id], (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    });
});

app.put("/updateProdutoPreco", (req, res) => {
    const id = req.body.id;
    const preco = req.body.preco;

    db.query("UPDATE produto SET preco = ? WHERE id = ?", [preco, id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.delete("/delete/:id", (req, res)=>{
    const id = req.params.id;
    db.query("DELETE FROM produto WHERE id = ?", id, (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});




// app.get("/getHora", (req, res) =>  {
    
//     const data = req.body.data;

//     db.query("SELECT data_criacao = ? FROM produto",[data], (err, res) =>{
//         if(err){
//             console.log(err);
//         }else{
//             res.send("funcionout");
//         }
//     });
// });



app.listen(3030, () => {console.log("runing in 3030")});