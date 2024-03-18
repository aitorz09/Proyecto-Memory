"use strict"
// DOM
const game = document.querySelector(".game")
// Game Logic
const Emoticonos = ["🐒","🦍","🦧","🐕‍🦺","🐩","🦊","🦝","🐈"];
const EmoticonosParejas = [...Emoticonos,...Emoticonos]
const random = (array)=> {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
const p = document.querySelector("p")
const Contador = document.querySelector(".contador")
// EVENT LISTENER
// HTML
const EmoticonosDesordenados = random(EmoticonosParejas)
EmoticonosDesordenados.forEach((emoticono,idx) =>{
    game.innerHTML+=
    `
    <div class="card tapada" data="${emoticono}" id="${idx}">
    <img src="./Captura de pantalla 2024-03-18 1044463.png">
    <p>${emoticono}</p>
    </div>
    `
})
let cardSelected;
let disabled = false
let contador = 0
const cards = document.querySelectorAll(".card")
cards.forEach(card => {
    card.addEventListener('click',()=>{

        handleClick(card)
    })
})

const handleClick = (card) =>{
    if(disabled){
        return
    }
    if(!cardSelected){
        card.classList.toggle("tapada")
        cardSelected = card

    } else if (cardSelected.getAttribute("data") == card.getAttribute("data")){
        card.classList.toggle("tapada")
        cardSelected = null
        contador++
    } else {
        contador++
        card.classList.toggle("tapada")
        disabled = true
        setTimeout(() => {
            card.classList.toggle("tapada")
            cardSelected.classList.toggle("tapada")
            cardSelected = null
            disabled = false
        }, 1000);
    }
    showContador()
    endGame()
}
console.log(cards)
const endGame = () =>{
   const divsArray = Array.from(cards)
   const tapadas =divsArray.filter((card) => card.className.includes("tapada"))
    if (tapadas == 0){
        setTimeout(() => {
            game.classList.add("hidden")
        }, 1500);
    }
}
const showContador = () =>{
    Contador.innerHTML= contador
}