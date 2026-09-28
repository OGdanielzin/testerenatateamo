async function carregarProdutos() {
    try {
        const resposta = await fetch(
            "http://localhost:3000/api/produtos"
        );

        const produtos = await resposta.json();

        const container = document.getElementById("produtos");

        container.innerHTML = "";

        produtos.forEach(produto => {
            container.innerHTML += `
                <div class="card">
                    <img src="${produto.imagem}" alt="${produto.nome}">

                    <h2>${produto.nome}</h2>

                    <p>Marca: ${produto.marca}</p>

                    <p>${produto.categoria}</p>

                    <h3>
                        R$ ${produto.preco.toFixed(2)}
                    </h3>

                    <p>
                        Estoque: ${produto.estoque}
                    </p>

                    <select>
                        ${produto.tamanhos.map(tamanho =>
                            `<option>${tamanho}</option>`
                        ).join("")}
                    </select>

                    <button onclick="adicionarCarrinho(${produto.id})">
                        Adicionar ao carrinho
                    </button>
                </div>
            `;
        });

    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
    }
}

function adicionarCarrinho(id) {
    alert("Produto " + id + " adicionado ao carrinho!");
}

carregarProdutos();

// =========================
// LOGIN
// =========================

function abrirLogin() {
    document.getElementById("loginModal").style.display = "flex";
}

function fecharLogin() {
    document.getElementById("loginModal").style.display = "none";
}


// =========================
// CADASTRO
// =========================

function abrirCadastro() {
    document.getElementById("cadastroModal").style.display = "flex";
}

function fecharCadastro() {
    document.getElementById("cadastroModal").style.display = "none";
}




function trocarParaCadastro() {

    fecharLogin();

    abrirCadastro();
}
function trocarParaLogin() {

    fecharCadastro();

    abrirLogin();
}



function cadastrar(event) {

    event.preventDefault();

    const nome =
        document.getElementById("nome").value;

    const email =
        document.getElementById("email").value;

    const senha =
        document.getElementById("senha").value;

    const confirmarSenha =
        document.getElementById("confirmarSenha").value;


    if (senha !== confirmarSenha) {

        alert("As senhas não são iguais!");

        return;
    }


    const usuario = {
        nome: nome,
        email: email,
        senha: senha
    };


    localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
    );


    alert("Cadastro realizado com sucesso!");

    fecharCadastro();

    abrirLogin();
}



function login(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value;

    const senha =
        document.getElementById("loginSenha").value;


    const usuarioSalvo =
        JSON.parse(localStorage.getItem("usuario"));


    if (!usuarioSalvo) {

        alert("Você ainda não possui cadastro.");

        return;
    }


    if (
        email === usuarioSalvo.email &&
        senha === usuarioSalvo.senha
    ) {

        alert(
            "Login realizado! Bem-vindo, " +
            usuarioSalvo.nome
        );

        fecharLogin();

    } else {

        alert("E-mail ou senha incorretos.");

    }
}