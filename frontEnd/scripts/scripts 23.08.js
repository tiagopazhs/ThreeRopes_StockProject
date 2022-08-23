const url = "http://localhost:3000/person"
const loadingElement = document.querySelector("#loading");
const postContainer = document.querySelector("#pedido");
const botCli = document.querySelector("#buttonSalvar");

// Adiciona o evento de apertar a tecla enter ou tab no primeiro input
document.getElementById("input1").addEventListener('keydown', async function (event) {
    // event.preventDefault()
    if (event.keyCode === 13 | event.keyCode === 9 ) {

        //Pega os dados que foram digitados pelo usuário
        const input1 = document.querySelector("#input1");
        const input3 = document.querySelector("#input3");
        const input4 = document.querySelector("#input4");

        //Define os valores dos campos digitados pelo usuário
        const campoPedido = input1.value;
        const campoEan = input3.value;
        const campoSerial = input4.value;

        //Chama a função get e traz os dados do pedido
        const dadosPedido = await getPedido(campoPedido)

        //Define campo a campo que foram trazidos do Get
        const vId  = dadosPedido._id;
        const vPedido  = dadosPedido.pedido;
        const vItem  = dadosPedido.item;
        const vEan = dadosPedido.ean;
        const vSerial = dadosPedido.serial;
        const vVerificado = true;
        const vV = dadosPedido.__v;

        //Atualiza o input item com os dados da requisição
        document.getElementById("input2").value = vItem

        //Atualiza o input item com os dados da requisição
        getPut(`${url}/${campoPedido}`, "PUT", {
            "_id": vId,
            "pedido": vPedido,
            "item": vItem,
            "ean": campoEan,
            "serial": campoSerial,
            "verificado": true,
            "__v": vV
        });        
        input3.focus()
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
