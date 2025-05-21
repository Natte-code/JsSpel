// variabler för spelare och poäng
let player1 = "Player 1";
let player2 = "Player 2";
let currentplayer = player1;

let player1Score_final = 0;
let player2Score_final = 0;
let player1Score = 0;
let player2Score = 0;

// byter tur till nästa spelare och fixar ui
function changePlayer() {
    currentplayer = currentplayer === player1 ? player2 : player1;
    updateTurnLabel(); // flyttad logik för att återanvända
}

// lägger till poäng till den som spelar nu
function addPoints(dice) {
    if (currentplayer === player1) {
        player1Score += dice;
    } else {
        player2Score += dice;
    }
    updateScoreUI();
}

// slumpar tärning och hanterar logik
function rollDice() {
    const dice = Math.floor(Math.random() * 6) + 1;

    const dots = document.querySelectorAll('#dice .dot');
    dots.forEach(dot => dot.style.display = 'none'); // göm alla prickar först

    // visa rätt antal prickar
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

    if (dice === 1) {
        if (currentplayer === player1) {
            player1Score = 0;
        } else {
            player2Score = 0;
        }
        changePlayer();
    } else {
        addPoints(dice);
    }

    updateScoreUI();
}

// sparar poäng och byter tur
function keepscore() {
    if (currentplayer === player1) {
        player1Score_final += player1Score;
        player1Score = 0;
    } else {
        player2Score_final += player2Score;
        player2Score = 0;
    }
    changePlayer();
    updateScoreUI();
    win();
}

// hämtar namn från ui
function getPlayerNames() {
    player1 = document.getElementById("player1").textContent || "Player 1";
    player2 = document.getElementById("player2").textContent || "Player 2";
}

// kollar om någon har vunnit
function win() {
    getPlayerNames();
    if (player1Score_final >= 50) {
        alert(player1 + " vinner!");

    } else if (player2Score_final >= 50) {
        alert(player2 + " vinner!");

    }
}

// startar om spelet
function replay() {
    player1Score = 0;
    player1Score_final = 0;
    player2Score = 0;
    player2Score_final = 0;
    currentplayer = player1;
    updateScoreUI();
    updateTurnLabel(); // lägg till för att visa rätt tur vid start
}

// uppdaterar poäng i ui
function updateScoreUI() {
    document.getElementById('finalpoint1').textContent = player1Score_final;
    document.getElementById('finalpoint2').textContent = player2Score_final;
    document.getElementById('potentialpoint1').textContent = player1Score;
    document.getElementById('potentialpoint2').textContent = player2Score;
}

// visar rätt tur i ui
function updateTurnLabel() {
    const leftSide = document.getElementById('leftside');
    const rightSide = document.getElementById('rightside');
    const currentTurnLabel = '<div class="current-turn-label">Your Turn</div>';

    document.querySelectorAll('.current-turn-label').forEach(label => label.remove());

    if (currentplayer === player1) {
        leftSide.insertAdjacentHTML('beforeend', currentTurnLabel);
    } else {
        rightSide.insertAdjacentHTML('beforeend', currentTurnLabel);
    }
}

// fixar bakgrunds delen och uppdaterar mitten
function updateBgGradient() {
    const leftColor = document.getElementById('color1').value;
    const rightColor = document.getElementById('color2').value;

    document.getElementById('bg-blur').style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} 50%, ${rightColor} 50%, ${rightColor} 100%)`;
    document.getElementById('middle').style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} 50%, ${rightColor} 50%, ${rightColor} 100%)`;
    document.getElementById('leftside').style.backgroundColor = leftColor;
    document.getElementById('rightside').style.backgroundColor = rightColor;
}

// aktiverar regnbågseffekt för en sida och uppdaterar mitten
function activateRainbowEffect(side) {
    let hue = 0;
    const interval = setInterval(() => {
        const color = `hsl(${hue}, 100%, 50%)`;
        document.getElementById(side).style.backgroundColor = color;

        // uppdatera mitten gradient baserat på regnbågseffekt
        const leftColor = getComputedStyle(document.getElementById('leftside')).backgroundColor;
        const rightColor = getComputedStyle(document.getElementById('rightside')).backgroundColor;
        document.getElementById('middle').style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} 50%, ${rightColor} 50%, ${rightColor} 100%)`;

        hue = (hue + 5) % 360; // snabbare färgövergång
    }, 30); // snabbare intervall

    // returnerar en funktion för att stoppa effekten
    return () => clearInterval(interval);
}

// hanterar klick för att aktivera regnbågseffekt (kräver 4 klick)
let clickCounts = { leftside: 0, rightside: 0 };

function handleMultipleClicks(event) {
    const side = event.target.id === 'color1' ? 'leftside' : 'rightside';

    // öka klickräknaren för sidan
    clickCounts[side]++;

    if (clickCounts[side] === 4) {
        if (side === 'leftside') {
            if (!window.stopLeftRainbow) {
                window.stopLeftRainbow = activateRainbowEffect(side);
            } else {
                window.stopLeftRainbow(); // stoppa regnbågseffekt
                window.stopLeftRainbow = null;
                updateBgGradient(); // återställ gradient
            }
        } else if (side === 'rightside') {
            if (!window.stopRightRainbow) {
                window.stopRightRainbow = activateRainbowEffect(side);
            } else {
                window.stopRightRainbow(); // stoppa regnbågseffekt
                window.stopRightRainbow = null;
                updateBgGradient(); // återställ gradient
            }
        }

        // återställ klickräknaren efter aktivering
        clickCounts[side] = 0;
    }

    // återställ klickräknaren om det inte klickas igen inom 1 sekund
    setTimeout(() => {
        clickCounts[side] = 0;
    }, 1000);
}

// lägger till klicklyssnare för färgfälten
document.getElementById('color1').addEventListener('click', handleMultipleClicks);
document.getElementById('color2').addEventListener('click', handleMultipleClicks);

// hanterar färgändring och säkerställer att gradienten uppdateras korrekt
function handleColorInput() {
    const leftColor = document.getElementById('color1').value;
    const rightColor = document.getElementById('color2').value;

    // om regnbågseffekt inte är aktiv, uppdatera gradienten
    if (!window.stopLeftRainbow && !window.stopRightRainbow) {
        updateBgGradient();
    }

    // om regnbågseffekt är aktiv, återställ den sidan som ändras
    if (window.stopLeftRainbow && leftColor !== '#rainbow') {
        window.stopLeftRainbow();
        window.stopLeftRainbow = null;
        document.getElementById('leftside').style.backgroundColor = leftColor;
        updateBgGradient();
    }

    if (window.stopRightRainbow && rightColor !== '#rainbow') {
        window.stopRightRainbow();
        window.stopRightRainbow = null;
        document.getElementById('rightside').style.backgroundColor = rightColor;
        updateBgGradient();
    }
}

// eventlyssnare för knappar och färg
document.getElementById("rollb").addEventListener("click", rollDice);
document.getElementById("holdb").addEventListener("click", keepscore);
document.getElementById("newgameb").addEventListener("click", replay);
document.getElementById('color1').addEventListener('input', handleColorInput);
document.getElementById('color2').addEventListener('input', handleColorInput);

// kör gradient och uppdaterar tur vid start
updateBgGradient();
updateTurnLabel();
