let boxes = document.querySelectorAll('.box');

let gameInfo = document.getElementById('game-info');

let message = document.getElementById('message');

let resetBtn = document.getElementById('reset');

let counter = 0;

let chance = true;

let gameOver = false;

message.innerHTML = `${chance ? '❌' : '⭕'}'s Turn`;

let winningChance = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.textContent !== "") return;
        if(chance === true){
            box.textContent = "❌";
            box.style.color = "red";
            chance = false;
        }
        else{
            box.textContent = "⭕";
            box.style.color = "rgb(0, 255, 119)";
            chance = true;
        }
        message.innerHTML = `${chance ? '❌' : '⭕'}'s Turn`;
        checkWinner();
        box.style.rotate = "360deg";
        box.disabled = true;
        counter++;
    })
})

let checkWinner = () => {
    for(let winner of winningChance){
        let pattern1 = boxes[winner[0]].innerHTML;
        let pattern2 = boxes[winner[1]].innerHTML;
        let pattern3 = boxes[winner[2]].innerHTML;

        if(pattern1 !== "" && pattern2 !== "" && pattern3 !== ""){
            winner.forEach(i => boxes[i].style.background = "limegreen");
            boxes.forEach((box) => box.disabled = true);
            message.innerHTML = `The Winner is ${pattern1}`;
            gameOver = true;
            setTimeout(resetGame, 2000);
            return;
        }
    }
    if(counter === 9 && !gameOver){
        message.innerHTML = "The Game is DRAW 🤝";
        setTimeout(resetGame, 2000);
    }
}

let resetGame = () => {
    boxes.forEach((box) => {
        box.innerHTML = "";
        box.style.rotate = "0deg";
        box.disabled = false;
        box.style.background = `linear-gradient(to bottom left,#fff, #888)`;
    })
    counter = 0;
    gameOver = false;
    message.innerHTML = `${chance ? '❌' : '⭕'}'s Turn`;
}

resetBtn.addEventListener("click", resetGame);