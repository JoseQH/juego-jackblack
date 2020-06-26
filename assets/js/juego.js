

let deck = [];


const tipos = ['C', 'D', 'H', 'S'];

const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;

// referencias del HTML


const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const puntosHTML = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');


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

const turnoComputadora = (puntosMinimos) => {

    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;

        // <img class="carta" src="assets/cartas/10C.png"></img>
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList = 'carta';
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    //  el && significa " y esta condicion más"


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
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    } else if(puntosJugador === 21) {
        console.log('ganaste amigo');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    } 
});

btnDetener.addEventListener('click', () => {

    btnPedir.disabled = true ;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);   
})



