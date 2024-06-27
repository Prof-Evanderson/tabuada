let playerName = "";
let score = 0;
let questionCount = 0;
let answer = 0;
let startTime = 0;
let timerInterval;

const questionsLimit = 15;

function startGame() {
    playerName = document.getElementById("player-name").value;
    if (playerName.trim() === "") {
        alert("Por favor, insira seu nome.");
        return;
    }
    score = 0;
    questionCount = 0;
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    nextQuestion();
}

function nextQuestion() {
    
    if (questionCount >= questionsLimit) {
        endGame();
        return;
    }
    //const num1 = Math.floor(Math.random() * 10) + 1;
    const num1 = Math.floor(Math.random() * (9 - 4)) + 4;
    //Math.random() * (max - min)) + min
    const num2 = Math.floor(Math.random() * (9 - 2)) + 2;
    //const num2 = Math.floor(Math.random() * 10) + 1;
    answer = num1 * num2;
    document.getElementById("question").innerText = `${num1} x ${num2} = ?`;
    document.getElementById("answer").value = "";
    startTime = new Date().getTime();
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
    questionCount++;
}

function updateTimer() {
    const elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
    const remainingTime = 17 - elapsedTime;
    document.getElementById("timer").innerText = `Tempo: ${remainingTime}s`;
    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        checkAnswer();
    }
}

function checkAnswer(event) {
    if (event && event.key !== "Enter") return;
    clearInterval(timerInterval);
    const userAnswer = parseInt(document.getElementById("answer").value);
    if (userAnswer === answer) {
        const elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
        const points = Math.max(1, 10 - elapsedTime);
        score += points;
        document.getElementById("score").innerText = `Pontuação: ${score}`;
    }
    nextQuestion();
}

function endGame() {
    saveScore();
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("end-screen").style.display = "block";
    document.getElementById("final-score").innerText = `Sua pontuação: ${score}`;
}

function saveScore() {
    const ranking = JSON.parse(localStorage.getItem("ranking") || "[]");
    ranking.push({ name: playerName, score: score });
    ranking.sort((a, b) => b.score - a.score);
    localStorage.setItem("ranking", JSON.stringify(ranking));
}

function showRanking() {
    document.getElementById("end-screen").style.display = "none";
    const ranking = JSON.parse(localStorage.getItem("ranking") || "[]");
    //const rankingList = ranking.slice(0, 10).map((item, index) => `<li>${index + 1}. ${item.name}: ${item.score}</li>`).join("");
    const rankingList = ranking.slice(0, 20).map((item, index) => `<li>${index + 1}. ${item.name}: ${item.score}</li>`).join("");
    document.getElementById("ranking").innerHTML = `<ul>${rankingList}</ul>`;
    document.getElementById("ranking-screen").style.display = "block";
}

function restartGame() {
    document.getElementById("ranking-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "block";
}
