const btn = document.querySelector("#buttonSalvar");

btn.addEventListener("click", function(e) {

    e.preventDefault();

    const pedido = document.querySelector("#pedido");

    const value = pedido.value;

    console.log(value);

});

// "/backEnd/routes/personRoutes.js"