//here
import React, {useState, useEffect} from 'react'
import axios from 'axios'
//here

const btn = document.querySelector("#buttonSalvar");
btn.addEventListener("click", function(e) {

//here
    useEffect(() => {
        axios.get("http://localhost:3000/person")
        .then(()=>{console.log("Deu tudo certo")})
        .catch(()=>{console.log("Deu tudo errado")})
    },[]) // este colchete serve para definir que a funcao sera executada somente uma vez
//here

    e.preventDefault();

    const pedido = document.querySelector("#pedido");

    const value = pedido.value;

    console.log(value);

});

// "/backEnd/routes/personRoutes.js"