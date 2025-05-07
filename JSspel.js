//jag ska börja med att göra tärnings funktion - nathaniel 
//altså allt under här tills linjen har jag skrivit
// Den ska slumpa 1-6 och om 1 är värdet ändrar den turen till andra spelaren

let player1 = prompt("Vad heter spelare 1?") //todo - Gör denna snyggare
let player2 = prompt("Vad heter spelare 2?")


// console.log(player1, player2) - detta var en demo för att kolla så den sparade namnen korrekt

let currentplayer = player1 // - detta är den spelaren som ska spela just nu. ska kunna bytas
// denna ska korilera till vart scores läggs

let player1Score_final = 0
let player2Score_final = 0

let player1Score = 0
let player2Score = 0

function changePlayer() {
    currentplayer = currentplayer === player1 ? player2 : player1;
}


// funktonen är skriven av nathaniel och lägger in poängen i den aktuella spelarens score
function addPoints(dice) { // asså vi skulle kunna lägga en exception för dice = 1 här men asså det ser snyggare ut om den är i dice funktionen tycker jag
    if (currentplayer === player1) {
        player1Score += dice;
    } else {
        player2Score += dice;
    }
}

// funktionen är skriven av nathaniel och är en tärnings funktion som slumpar ett värde mellan 1-6
// och kollar om det är 1 så nollas spelarens score och turen byts till nästa spelare
// om det inte är 1 så läggs poängen till spelarens score
// och turen byts inte.
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
        addPoints(dice); //Lägg till poängen till den aktuella spelarens score
    }
}

function keepscore(){
    if (currentplayer === player1) {
        player1Score_final = player1Score_final + player1Score
        player1Score = 0
    }
    else if (currentplayer === player2){
        player2Score_final = player2Score_final + player2Score
        player2Score = 0 
    }
}


function win(){
    if (player1Score_final >= 50){
        //Gör så spelet stannar och spelare 1 vinner
    }
    else if (player1Score_final >= 50){
        //samma fast för spelare 2
    }
}

function replay(){
    player1Score = 0
    player1Score_final = 0
    player2Score = 0
    player2Score_final = 0
    player2 = null
    player1 = null
}

//todo - gör funktion som sparar pointsen till final score

//////////////////////////////////////////////////////////////////////////////////////////////////// - slut på nathaniels kod

