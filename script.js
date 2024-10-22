let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;
let maxLevel = localStorage.getItem('maxLevel') || 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if(started == false){
        started = true;
        levelUp();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4 );
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameflash(randbtn);
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }
    else {
        if (level > maxLevel) {
            maxLevel = level;
            localStorage.setItem('maxLevel', maxLevel);
        }
        h2.innerHTML = `Game Over !!! Your Score Is <b>${level}</b> <br> Max Level: ${maxLevel} <br> Press Any Key To Start ...`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userflash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
