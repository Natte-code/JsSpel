function rollDice() { 
    const dice = Math.floor(Math.random() * 6) + 1; // slumpar ett värde mellan 1-6

    if (dice === 1) { //kollar om tärningen är 1
        if (currentplayer === player1) { 
            //todo - låt hmtl sidan uppdatera till dice funktionen
            player1Score = 0;
        } else {
            player2Score = 0;
        }
        changePlayer(); //byter spelare
    } else {
        addPoints(dice); // Lägg till poängen till den aktuella spelarens score
    }
}

function addPoints(score) { // asså vi skulle kunna lägga en exception för dice = 1 här men asså det ser snyggare ut om den är i dice funktionen tycker jag

    if (currentplayer === player1) {
        player1Score += score;
    } else {
        player2Score += score;
    }
}

function changePlayer() {
    currentplayer = currentplayer === player1 ? player2 : player1;
}

let player1 = prompt("Vad heter spelare 1?") //todo - Gör denna snyggare
let player2 = prompt("Vad heter spelare 2?")
let currentplayer = player1
let player1Score_final, player2Score_final = 0
let player1Score, player2Score = 0 
// rå kåd här. ingan spaces (vill se hur litet spelet kan bli)