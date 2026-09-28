const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const produtos = [
    {
        id: 1,
        nome: "Tênis Esportivo Runner",
        marca: "Nike",
        categoria: "Corrida",
        preco: 399.90,
        tamanhos: [38, 39, 40, 41, 42, 43],
        estoque: 15,
        imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
        id: 2,
        nome: "Tênis Casual Street",
        marca: "Adidas",
        categoria: "Casual",
        preco: 349.90,
        tamanhos: [37, 38, 39, 40, 41, 42],
        estoque: 10,
        imagem: "https://images.unsplash.com/photo-1549298916-b41d501d3772"
    },
    {
        id: 3,
        nome: "Tênis Performance",
        marca: "Mizuno",
        categoria: "Esportivo",
        preco: 459.90,
        tamanhos: [39, 40, 41, 42, 43, 44],
        estoque: 8,
        imagem: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
    }
];

// Listar todos os produtos
app.get("/api/produtos", (req, res) => {
    res.json(produtos);
});

// Buscar produto pelo ID
app.get("/api/produtos/:id", (req, res) => {
    const id = Number(req.params.id);

    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    res.json(produto);
});

// Buscar por marca
app.get("/api/marca/:marca", (req, res) => {
    const marca = req.params.marca.toLowerCase();

    const resultado = produtos.filter(
        p => p.marca.toLowerCase() === marca
    );

    res.json(resultado);
});

app.listen(3000, () => {
    console.log("API funcionando em http://localhost:3000");
});