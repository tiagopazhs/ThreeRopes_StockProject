const url = "http://localhost:3000/person"
const loadingElement = document.querySelector("#loading");
const postContainer = document.querySelector("#pedido");
const botCli = document.querySelector("#buttonSalvar");
let pedidoAtual = {"_id": "", "pedido": "","item": "", "ean": "", "serial": "", "verificado": "", "__v": ""}


// Get individual post
async function getPedido(id) {  
    const responseGet = await fetch(`${url}/${id}`);

    // define os campos do pedido 
    const dadosPedido = await responseGet.json();
    pedidoAtual = dadosPedido
    
    // const vId  = dadosPedido._id;
    // const vPedido  = dadosPedido.pedido;
    // const vItem  = dadosPedido.item;
    // const vEan = dadosPedido.ean;
    // const vSerial = dadosPedido.serial;
    // const vVerificado = true;
    // const vV = dadosPedido.__v;

    // document.getElementById("input2").value = vItem

    // console.log(Object.keys(dadosPedido)[1])

    // return pedidoAtual
  }


  
// Adiciona o evento de apertar a tecla tab
document.addEventListener('keydown', function (event) {
    // event.preventDefault()
    if (event.keyCode === 9) {
        const input1 = document.querySelector("#input1");
        const input3 = document.querySelector("#input3");
        const input4 = document.querySelector("#input4");

        const campoPedido = input1.value;
        const campoEan = input3.value;
        const campoSerial = input4.value;

        console.log(pedidoAtual)
        console.log(getPedido(campoPedido))
        console.log(pedidoAtual)

        // document.getElementById("input2").value = vItem

    

    }
});

// put
async function getPut(url, type, data) {

    if (type === "POST" | type === "PUT") {
        return fetch(url, {
        method: type,
        headers: {
            'Content-type': 'application/json'
        },
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
