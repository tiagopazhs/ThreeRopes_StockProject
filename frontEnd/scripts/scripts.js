
const btn = document.querySelector("#buttonSalvar");

// adiconou um evento: evento clicar
btn.addEventListener("click",async function(e) {

    // utilizado para a página não recarregar
    e.preventDefault();

    // essa variável vai receber o retorno da API
    const dataReturn = await fetch("http://localhost:3000/person")


    // const pedido = document.querySelector("#pedido");

    // const value = pedido.value;

    console.log(dataReturn);

});

// "/backEnd/routes/personRoutes.js"