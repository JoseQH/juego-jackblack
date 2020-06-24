

let deck = [];


const tipos = ['C', 'D', 'H', 'S'];

const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;

// referencias del HTML

const btnPedir = document.querySelector('#btnPedir');
const puntosHTML = document.querySelectorAll('small');




const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        
        for (let tipo of tipos) {
            
            deck.push(i + tipo);
        }
        
    }

    for (let esp of especiales) {
        
        for (const tipo of tipos) {
            
            deck.push(esp + tipo);
        }
    }

    
    deck = _.shuffle(deck);
    
}  

crearDeck();

const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'no tienes mas cartas';
    }

    const carta = deck.pop();

    return carta;
}

// pedirCarta();

// VALOR CARTA

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);

    return (isNaN(valor)) ? 
            (valor === 'A') ? 11 : 10 
            : valor * 1;

}



// eventos 

// evento pedir carta

btnPedir.addEventListener('click', () =>{

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);

    puntosHTML[0].innerText = puntosJugador;
    
});






