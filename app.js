"use strict"
// DOM
let cardSelected;
let contador = 0
let disabled = false
const Contador = document.querySelector(".contador")
const startBtn = document.querySelector(".start")
const inicio = document.querySelector(".inicio")
const juego = document.querySelector(".juego")
const h4 = document.querySelector("h4")
const h3 = document.querySelector("h3")
const resultado = document.querySelector(".resultado")
const game = document.querySelector(".game")
const result = document.querySelector(".result")
const startAgain = document.querySelector(".startAgain")
const Emoticonos = ["🐒","🦍","🦧","🐕‍🦺","🐩","🦊","🦝","🐈"];
const audio = document.querySelector(".audio")
// const Emoticonos = ["🐒","🦍"];
const EmoticonosParejas = [...Emoticonos,...Emoticonos]
let cards;
const random = (array)=> {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
const prepararCartas = ()=>{
    const EmoticonosDesordenados = random(EmoticonosParejas)
    game.innerHTML = ""
    EmoticonosDesordenados.forEach((emoticono,idx) =>{
        game.innerHTML+=
        `
        <div class="card tapada" data="${emoticono}" draggable=${false} id="${idx}">
            <img src="./a39b5e71f4218f37cac9dcb0474c0850.jpg">
            <p>${emoticono}</p>
        </div>
        `
        // game.innerHTML+=
        // `
        // <div class="card tapada" data="${emoticono}" draggable=${false} id="${idx}">
        //     <div>C</div>
        // </div>
        // `
    })
    cards = document.querySelectorAll(".card")
    cards.forEach(card => {
        card.addEventListener('click',()=>{
            
            handleClick(card)
        })
    })
    Contador.innerHTML ="0"
    contador=0
    
}
// EVENT LISTENER
startAgain.addEventListener('click', () => {
    prepararCartas()
    
    result.classList.add("hidden")
    juego.classList.remove("hidden")
})
startBtn.addEventListener('click',()=>{
    inicio.classList.toggle("hidden")
    juego.classList.toggle("hidden")
     prepararCartas()
})

const p = document.querySelector("p")
// Game Logic
// HTML
const handleClick = (card) =>{
    if(disabled || !card.classList.contains("tapada")){
        return
    }
    audio.pause()
    audio.currentTime = 0
    audio.play()
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
            
            audio.pause()
            audio.currentTime = 0
            audio.play()
        }, 1500);
    }
    showContador()
    endGame()
}

const endGame = () =>{
    const divsArray = Array.from(cards)
    const tapadas = divsArray.filter((card) => card.className.includes("tapada"))
    if (tapadas == 0){
        resultado.innerText =`${contador} `
        if(contador <= 12){
            h3.innerText+= `Excelente `
        } else if (contador <= 20){
            h3.innerText = "Bien hecho"
        } else if (contador <= 26){
            h3.innerText = "Se podria mejorar"
        } else {
            h3.innerText = "Muy mal"
        }
        setTimeout(() => {
            juego.classList.add("hidden")
            result.classList.remove("hidden")
        }, 1500);
    }
}

const showContador = () =>{
    Contador.innerHTML= contador
}
