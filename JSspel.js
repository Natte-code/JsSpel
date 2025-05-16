//jag ska börja med att göra tärnings funktion - nathaniel 
//altså allt under här tills linjen har jag skrivit
// Den ska slumpa 1-6 och om 1 är värdet ändrar den turen till andra spelaren

let player1 = "Player 1"; // todo gör snyggare
let player2 = "Player 2";




// console.log(player1, player2) - detta var en demo för att kolla så den sparade namnen korrekt

let currentplayer = player1; // - detta är den spelaren som ska spela just nu. ska kunna bytas
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
    updateScoreUI();
    
}

// funktionen är skriven av nathaniel och är en tärnings funktion som slumpar ett värde mellan 1-6
// och kollar om det är 1 så nollas spelarens score och turen byts till nästa spelare
// om det inte är 1 så läggs poängen till spelarens score
// och turen byts inte.
function rollDice() { 
    const dice = Math.floor(Math.random() * 6) + 1; // slumpar ett värde mellan 1-6

    // Dölj alla prickar först
    const dots = document.querySelectorAll('#dice .dot');
    dots.forEach(dot => dot.style.display = 'none'); // gjorde i ai

    // Visa prickar enligt tärningssida
    if (dice === 1) {
        document.querySelector('.dot1').style.display = 'block';
    } else if (dice === 2) {
        document.querySelector('.dot2').style.display = 'block';
        document.querySelector('.dot3').style.display = 'block';
    } else if (dice === 3) {
        document.querySelector('.dot1').style.display = 'block';
        document.querySelector('.dot2').style.display = 'block';
        document.querySelector('.dot3').style.display = 'block';
    } else if (dice === 4) {
        document.querySelector('.dot2').style.display = 'block';
        document.querySelector('.dot3').style.display = 'block';
        document.querySelector('.dot4').style.display = 'block';
        document.querySelector('.dot5').style.display = 'block';
    } else if (dice === 5) {
        document.querySelector('.dot1').style.display = 'block';
        document.querySelector('.dot2').style.display = 'block';
        document.querySelector('.dot3').style.display = 'block';
        document.querySelector('.dot4').style.display = 'block';
        document.querySelector('.dot5').style.display = 'block';
    } else if (dice === 6) {
        document.querySelector('.dot2').style.display = 'block';
        document.querySelector('.dot3').style.display = 'block';
        document.querySelector('.dot4').style.display = 'block';
        document.querySelector('.dot5').style.display = 'block';
        document.querySelector('.dot6').style.display = 'block';
        document.querySelector('.dot7').style.display = 'block';
    }

    if (dice === 1) { //kollar om tärningen är 1
        if (currentplayer === player1) { 
            player1Score = 0;
        } else {
            player2Score = 0;
        }
        changePlayer(); //byter spelare
    } else {
        addPoints(dice); //Lägg till poängen till den aktuella spelarens score
    }
    
    updateScoreUI();
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
    changePlayer(); // Byt spelare efter att poängen lagts till
    updateScoreUI();
    win(); // kollar ifall någon har vunnit efter att poäng lagts till
}

function win(){
    if (player1Score_final >= 50){
        alert(player1 + " vinner!");
        
    }
    else if (player2Score_final >= 50){
        alert(player2 + " vinner!");
        
    }
}

function replay(){
    player1Score = 0
    player1Score_final = 0
    player2Score = 0
    player2Score_final = 0
    currentplayer = player1; // Lägg till denna rad
    updateScoreUI(); 
}

function updateScoreUI(){
    document.getElementById('finalpoint1').textContent = player1Score_final;
    document.getElementById('finalpoint2').textContent = player2Score_final;
    document.getElementById('potentialpoint1').textContent = player1Score;
    document.getElementById('potentialpoint2').textContent = player2Score;
}

//core functions
document.getElementById("rollb").addEventListener("click", function() {
    rollDice();
});


document.getElementById("holdb").addEventListener("click", function() {
    keepscore();
});

document.getElementById("newgameb").addEventListener("click", function() {
    replay();
});

// listerners


document.getElementById("Aplicera").addEventListener("click", function(){
    player1 = document.getElementById("playe1input").value || "player 1";

    document.getElementById("player1").textContent = player1;   
    
})


document.getElementById("Aplicera2").addEventListener("click", function(){
    player2 = document.getElementById("playe2input").value || "player 2";
    document.getElementById("player2").textContent = player2;
})

function updateBgGradient() { // updaterar bakrunderna korrekt
    const leftColor = document.getElementById('color1').value;
    const rightColor = document.getElementById('color2').value;
    //bakgrundsgradient för hela sidan
    document.getElementById('bg-blur').style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} 50%, ${rightColor} 50%, ${rightColor} 100%)`;
    //gradient för mitten
    document.getElementById('middle').style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} 50%, ${rightColor} 50%, ${rightColor} 100%)`;
}

//färger bara
//funktioner som kollar efter färger osv.

document.getElementById('color1').addEventListener('input', function() {
    document.getElementById('leftside').style.backgroundColor = this.value;
    updateBgGradient();
    
});
document.getElementById('color2').addEventListener('input', function() {
    document.getElementById('rightside').style.backgroundColor = this.value;
    updateBgGradient();
    
});

// Kör en gång vid start
updateBgGradient();
