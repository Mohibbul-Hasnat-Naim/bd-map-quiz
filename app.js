import { getDivisionsMap } from "./maps/divisions.js";

let mapData;

let divisions = [];
let skippedDivisions = [];
let remainingDivisions = [];
let target = "";
let score = 0;
let attempts = 0;

let startTime = null;
let endTime = null;
let timerRunning = false;
let timerInterval = null;

const correctSound = new Audio("./sounds/correct.mp3");
const wrongSound = new Audio("./sounds/wrong.mp3");
const victorySound = new Audio("./sounds/victory.mp3");
const skipSound = new Audio("./sounds/skip.mp3");
const modeSound = new Audio("./sounds/mode.mp3");

window.onload = () => {
    mapData = getDivisionsMap();

    divisions = [...mapData.items];
    remainingDivisions = [...mapData.items];

    document.getElementById("map-layer").innerHTML = mapData.svg;

    enableZoomPan();
    positionLabels();
    attachListeners();
    updateDisplay();
    nextQuestion();
};

window.resetGame = resetGame;
window.skipQuestion = skipQuestion;
window.toggleMode = toggleMode;

function updateDisplay() {
    document.getElementById("score").innerText =
        `${score}/${divisions.length}`;

    document.getElementById("attempts").innerText = attempts;
}

function attachListeners() {
    document.querySelectorAll(".division-group").forEach(el => {
        el.onclick = () => checkAnswer(el.id);
    });
}

function startTimer() {
    if (timerRunning) return;

    clearInterval(timerInterval); // safety

    startTime = new Date();
    timerRunning = true;

    timerInterval = setInterval(() => {
        let now = new Date();
        let elapsed = now - startTime;

        document.getElementById("live-timer").innerText =
            formatTime(elapsed);
    }, 1000);
}

function stopTimer() {
    endTime = new Date();
    timerRunning = false;
    clearInterval(timerInterval);
}

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    return String(minutes).padStart(2, "0") + ":" +
           String(seconds).padStart(2, "0");
}

function nextQuestion() {
    if (remainingDivisions.length === 0) {
        if (skippedDivisions.length > 0) {
            remainingDivisions = [...skippedDivisions];
            skippedDivisions = [];
        } else {
            stopTimer();
            document.getElementById("target-name").innerText = "FINISHED!";
            document.getElementById("target-name").style.color = "var(--bd-red)";
            setTimeout(showResultModal, 700);
            return;
        }
    }

    if (!timerRunning && !document.body.classList.contains("learn-mode")) {
        startTimer();
    }

    let i = Math.floor(Math.random() * remainingDivisions.length);
    target = remainingDivisions[i];

    document.getElementById("target-name").innerText = target.toUpperCase();
    document.getElementById("target-name").style.color = "var(--bd-green)";
}

function checkAnswer(id) {
    if (
        document.body.classList.contains("learn-mode") ||
        remainingDivisions.length === 0
    ) return;

    attempts++;

    const msg = document.getElementById("status-msg");
    const el = document.getElementById(id);
    const paths = el.querySelectorAll("path");

    if (id === target) {
        score++;

        correctSound.currentTime = 0;
        correctSound.play();
        msg.innerText = "✓ Correct!";
        msg.style.color = "var(--bd-green)";

        el.classList.add("locked");
        remainingDivisions = remainingDivisions.filter(d => d !== target);

        nextQuestion();
    } else {
        let name = id.charAt(0).toUpperCase() + id.slice(1);

        wrongSound.currentTime = 0;
        wrongSound.play();
        msg.innerText = `✗ Incorrect\n${name}`;
        msg.style.color = "var(--bd-red)";

        paths.forEach(p => {
            const original = p.getAttribute("fill");
            p.style.fill = "var(--bd-red)";
            setTimeout(() => (p.style.fill = original), 800);
        });
    }

    msg.style.opacity = "1";
    setTimeout(() => (msg.style.opacity = "0"), 2000);

    updateDisplay();
}

function skipQuestion() {
    if (document.body.classList.contains("learn-mode")) return;

    // total unsolved questions
    let totalPending =
        remainingDivisions.length + skippedDivisions.length;

    // if only 1 question exists overall, stop endless skip loop
    if (totalPending <= 1) return;

    // 🔥 THIS LINE prevents duplicate skipped entries
    if (!skippedDivisions.includes(target)) {
        skippedDivisions.push(target);
    }

    // remove current target from active pool
    remainingDivisions =
        remainingDivisions.filter(d => d !== target);

    skipSound.currentTime = 0;
    skipSound.play();
    
    nextQuestion();
}

function resetGame() {
    score = 0;
    attempts = 0;
    remainingDivisions = [...divisions];

    document.querySelectorAll(".division-group").forEach(el => {
        el.classList.remove("locked");
    });

    // STOP EVERYTHING PROPERLY
    clearInterval(timerInterval);
    timerInterval = null;

    timerRunning = false;
    startTime = null;
    endTime = null;

    document.getElementById("live-timer").innerText = "00:00";
    document.getElementById("status-msg").style.opacity = "0";
    document.getElementById("result-modal").style.display = "none";

    updateDisplay();
    // nextQuestion();
}

function showResultModal() {
    victorySound.currentTime = 0;
    victorySound.play();

    let totalTime = endTime - startTime;
    let accuracy = attempts ? Math.round((score / attempts) * 100) : 0;

    document.getElementById("final-time").innerText =
        formatTime(totalTime);

    document.getElementById("final-correct").innerText =
        `${score} / ${divisions.length}`;

    document.getElementById("final-attempts").innerText = attempts;
    document.getElementById("final-accuracy").innerText = accuracy + "%";

    document.getElementById("result-modal").style.display = "flex";
}

function toggleMode() {
    modeSound.currentTime = 0;
    modeSound.play();

    const body = document.body;
    const targetDisplay = document.getElementById("target-name");
    const modeBtn = document.getElementById("mode-btn");

    const isLearn = body.classList.contains("learn-mode");

    resetGame();

    if (!isLearn) {
        // ENTER learn mode
        body.classList.add("learn-mode");

        targetDisplay.innerText = "STUDY MODE";
        targetDisplay.style.color = "#666";

        modeBtn.innerText = "Back to Quiz";
        modeBtn.style.background = "#333";
    } else {
        // EXIT learn mode
        body.classList.remove("learn-mode");

        targetDisplay.style.color = "var(--bd-green)";

        modeBtn.innerText = "Learn Map";
        modeBtn.style.background = "#006a4e";

        nextQuestion();
    }
}

function positionLabels() {
    document.querySelectorAll(".division-group").forEach(group => {
        const paths = group.querySelectorAll("path");
        const label = group.querySelector(".division-label");

        if (!label || paths.length === 0) return;

        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        paths.forEach(path => {
            const box = path.getBBox();

            minX = Math.min(minX, box.x);
            minY = Math.min(minY, box.y);
            maxX = Math.max(maxX, box.x + box.width);
            maxY = Math.max(maxY, box.y + box.height);
        });

        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        label.setAttribute("x", centerX);
        label.setAttribute("y", centerY);
    });
}

function enableZoomPan() {
    const svg = document.getElementById("main-svg");
    const viewport = document.getElementById("map-viewport");

    let panX = 0;
    let panY = 0;

    let isDragging = false;
    let startX = 0;
    let startY = 0;

    function updateTransform() {
        svg.style.transform = `translate(${panX}px, ${panY}px)`;
    }

    // ---------------------------
    // MOUSE DRAG (PAN)
    // ---------------------------
    viewport.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX - panX;
        startY = e.clientY - panY;
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        panX = e.clientX - startX;
        panY = e.clientY - startY;

        updateTransform();
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // ---------------------------
    // TOUCH PAN (SINGLE FINGER)
    // ---------------------------
    let touchStartX = 0;
    let touchStartY = 0;
    let isTouchDragging = false;

    viewport.addEventListener("touchstart", (e) => {
        if (e.touches.length === 1) {
            isTouchDragging = true;

            touchStartX = e.touches[0].clientX - panX;
            touchStartY = e.touches[0].clientY - panY;
        }
    }, { passive: false });

    viewport.addEventListener("touchmove", (e) => {
        if (!isTouchDragging || e.touches.length !== 1) return;

        e.preventDefault();

        panX = e.touches[0].clientX - touchStartX;
        panY = e.touches[0].clientY - touchStartY;

        updateTransform();
    }, { passive: false });

    viewport.addEventListener("touchend", () => {
        isTouchDragging = false;
    });

    // initial render
    updateTransform();
}