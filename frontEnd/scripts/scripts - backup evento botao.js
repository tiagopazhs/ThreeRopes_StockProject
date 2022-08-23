

//***PARTE 2 */
const url = "http://localhost:3000/person"
const id = '111112'
const loadingElement = document.querySelector("#loading");
const postContainer = document.querySelector("#pedido");
const botCli = document.querySelector("#buttonSalvar");

// adiconar um evento: evento clicar
botCli.addEventListener("click",async function(even) {

    even.preventDefault();
    const pedido = document.querySelector("#pedido");
    const value = pedido.value;

    console.log(getPost(value));

});




// Get all posts
// async function getAllPosts() {
//   const response = await fetch(url);
//   console.log(response);
//   const data = await response.json();
//   console.log(data);
//   loadingElement.classList.add("hide"); 
// }

// Get individual post
async function getPost(id) {
    
    const [responsePost] = await Promise.all([
      fetch(`${url}/${id}`),
    ]);

    // define os campos do pedido 
    const dadosPedido = await responsePost.json();

    const vPedido  = dadosPedido.pedido;
    const vItem  = dadosPedido.item;
    const vVerificado  = dadosPedido.verificado;

    console.log(vItem)

    //editar aqui o appendClind que irá editar
    // postContainer.appendChild(dadosPedido);
  

  }

// getAllPosts()   
// getPost(id)