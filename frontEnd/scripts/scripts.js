const url = "http://localhost:3000/person"
const loadingElement = document.querySelector("#loading");
const botCli = document.querySelector("#buttonSalvar");
const botRein = document.querySelector("#buttonReiniciar");
let campoEanGeral = ""

// *** EVENTOS: Input 1, input 3, Input 4, botao salvar e botao reiniciar ****************************************

// Evento Input 1: apertar a tecla enter ou tab
document.getElementById("input1").addEventListener('keydown', async function (event) {
    // event.preventDefault();
    if (event.keyCode === 13 | event.keyCode === 9 ) {
        resgatarItem();
    }
});

// Evento Input 3: apertar a tecla enter ou tab
document.getElementById("input3").addEventListener('keydown', async function (event) {
    if (event.keyCode === 13 | event.keyCode === 9 ) {
        armazenarEan();
    }
});

// Evento Input 4: apertar a tecla enter
document.getElementById("input4").addEventListener('keydown', async function (event) {
    if (event.keyCode === 13) {
        funcaoFinal();
    }
});

// Evento botao salvar: clicar no botao
botCli.addEventListener("click",async function(even) {
    funcaoFinal();
});

// Evento botao reinicar: clicar no botao
botRein.addEventListener("click",async function(even) {

    //Torna visível a mensagem de carregamento
    document.getElementById("loading").style.display = ''
    
    //chama a funcao que irá recarregar a página e limpar os dados
    await funcaoInicial();
});

// *** REQUISICOES: Get e Put *************************************************************************************

// Requisição get
async function getPedido(id) {  
    const responseGet = await fetch(`${url}/${id}`);
    const dadosPedido = await responseGet.json();

    return dadosPedido
  }

// Requisição PUT de update (necessário incluir todos os campos)
async function getPut(url, type, data) {

    if (type === "POST" | type === "PUT") {
        return fetch(url, {
        method: type,
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data)
        })
        .then(res => {
            if (res.ok) { console.log("HTTP request successful") }
            else { console.log("HTTP request unsuccessful") }
            return res
        })
        .then(res => res.json())
        .then(data => data)
        .catch(error => error)
        }
}

// *** EXECUCAO PROGRAMA: Funcao Inicial, Resgata item, armazenar Ean, funcao final (armazenar serial e put) ********

async function funcaoInicial() {

    // esconder carregamento da página
    document.getElementById("loading").style.display = 'none'; 

    //zerar campos
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input3").value = "";
    document.getElementById("input4").value = "";

    //mover para o primeiro campo
    input1.focus()

}

async function resgatarItem() {
    //Pega os dados que foram digitados pelo usuário
    const input1 = document.querySelector("#input1");

    //Define os valores dos campos digitados pelo usuário
    campoPedido = input1.value;

    //Chama a função get e traz os dados do pedido
    const dadosPedido = await getPedido(campoPedido)

    //Define campo importado pelo do Get
    const vItem  = dadosPedido.item;

    //Atualiza o campo input item com os dados da requisição
    document.getElementById("input2").value = vItem

    //Verifica se o pedido existe
    if (input2.value === "undefined") {

        //Torna visível a mensagem de carregamento
        document.getElementById("loading").style.display = ''
    
        //chama a funcao que irá recarregar a página e limpar os dados
        await funcaoInicial();
    }

    //Muda para o campo de EAN para fazer a próxima função caso o pedido exista
    if (input2.value != "") {
        input3.focus()
    } else {
        input1.focus()
    }
}

async function armazenarEan() {
    //Pega os dados que foram digitados pelo usuário
    const input3 = document.querySelector("#input3");

    //Atualiza a variável de EAN que será usada no PUT
    campoEanGeral = input3.value;

    //Muda para o campo de Serial para fazer a próxima função caso dados completos
    if (input1.value != "") {
        input4.focus()
    } else {
        input1.focus()
    }
}

async function funcaoFinal() {
    //Avalia se todos os dados estão completos para seguir
    if (input1.value === "" | input3.value === "") {
    input1.focus();
    } else{
        //Pega os dados que foram digitados pelo usuário
        const input4 = document.querySelector("#input4");
    
        //Atualiza a variável de Serial que será usada no PUT
        const campoSerial = input4.value;
    
        //Atualiza a variável de Ean que será usada no PUT
        const campoEan = campoEanGeral;
    
        //Pega os dados que foram digitados pelo usuário
        const input1 = document.querySelector("#input1");
    
        //Define os valores dos campos digitados pelo usuário
        const campoPedido = input1.value;
    
        //Chama a função get e traz os dados do pedido
        const dadosPedido = await getPedido(campoPedido)
    
        //Define campo a campo que foram trazidos do Get & digitados pelo usuário
        const vId  = dadosPedido._id;
        const vPedido  = dadosPedido.pedido;
        const vItem  = dadosPedido.item;
        const vEan = campoEan;
        const vSerial = campoSerial;
        const vV = dadosPedido.__v;
    
        //Atualiza o input item com os dados da requisição
        getPut(`${url}/${campoPedido}`, "PUT", {
            "_id": vId,
            "pedido": vPedido,
            "item": vItem,
            "ean": vEan,
            "serial": vSerial,
            "verificado": true,
            "__v": vV
        });

        //Torna visível a mensagem de carregamento
        document.getElementById("loading").style.display = ''
    
        //chama a funcao que irá recarregar a página e limpar os dados
        await funcaoInicial();
    }
}





