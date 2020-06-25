

let deck = [];


const tipos = ['C', 'D', 'H', 'S'];

const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;

// referencias del HTML


const btnPedir = document.querySelector('#btnPedir');
const puntosHTML = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas');


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
    

    // <img class="carta" src="assets/cartas/10C.png"></img>

    const imgCarta = document.createElement('img');

    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList = 'carta';

    divCartasJugador.append(imgCarta);

    if(puntosJugador > 21) {
        console.log('perdiste amigo');
        btnPedir.disabled = true;
    } else if(puntosJugador === 21) {
        console.log('ganaste amigo');
        btnPedir.disabled = true;
    } 
});






