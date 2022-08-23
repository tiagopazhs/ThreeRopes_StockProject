const url = "http://localhost:3000/person"
const loadingElement = document.querySelector("#loading");
const postContainer = document.querySelector("#pedido");
const botCli = document.querySelector("#buttonSalvar");

// Adiciona o evento de apertar a tecla enter ou tab no PRIMEIRO CAMPO DE INPUT
document.getElementById("input1").addEventListener('keydown', async function (event) {
    // event.preventDefault()
    if (event.keyCode === 13 | event.keyCode === 9 ) {

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

        //Muda para o campo de EAN para fazer a próxima função
        input3.focus()
    }
});

// Adiciona o evento de apertar a tecla enter ou tab no TERCEIRO CAMPO DE INPUT
document.getElementById("input3").addEventListener('keydown', async function eanSearch(event) {
    // event.preventDefault()
    if (event.keyCode === 13 | event.keyCode === 9 ) {

        //Pega os dados que foram digitados pelo usuário
        const input3 = document.querySelector("#input3");

        //Atualiza a variável de EAN que será usada no PUT
        const campoEan = input3.value;

        //Muda para o campo de EAN para fazer a próxima função
        input4.focus()

        return (campoEan)
    }
});

// Adiciona o evento de apertar a tecla enter ou tab no QUARTO CAMPO DE INPUT
document.getElementById("input4").addEventListener('keydown', async function (event) {
    // event.preventDefault()
    if (event.keyCode === 13 | event.keyCode === 9 ) {

        //Pega os dados que foram digitados pelo usuário
        const input4 = document.querySelector("#input4");

        //Atualiza a variável de Serial que será usada no PUT
        const campoSerial = input4.value;

        //Atualiza a variável de Ean que será usada no PUT
        const campoEan = await eanSearch(event.keyCode === 13);

        console.log(campoEan)

        //Pega os dados que foram digitados pelo usuário
        const input1 = document.querySelector("#input1");

        //Define os valores dos campos digitados pelo usuário
        campoPedido = input1.value;

        //Chama a função get e traz os dados do pedido
        const dadosPedido = await getPedido(campoPedido)

        //Define campo a campo que foram trazidos do Get & digitados pelo usuário
        const vId  = dadosPedido._id;
        const vPedido  = dadosPedido.pedido;
        const vItem  = dadosPedido.item;
        const vEan = eanSearch();
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
    }
});

// Faz a requisição get
async function getPedido(id) {  
    const responseGet = await fetch(`${url}/${id}`);
    const dadosPedido = await responseGet.json();

    return dadosPedido
  }

// Faz o update dos dados com o método put (necessário incluir todos os campos)
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
