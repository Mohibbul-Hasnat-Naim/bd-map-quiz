/* =========================
   QUIZ STATE VARIABLES
========================= */

let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = organizations.length;

let timerSeconds = 0;
let timerInterval = null;

let currentCorrectAnswer = "";
let quizStarted = false;

let wrongAnswers = [];


/* =========================
   DOM ELEMENTS
========================= */

const startOverlay = document.getElementById("start-overlay");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");

const currentQuestionEl = document.getElementById("current-question");
const totalQuestionsEl = document.getElementById("total-questions");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");

const progressBar = document.getElementById("progress-bar");

const nextBtn = document.getElementById("next-btn");

const resultCard = document.getElementById("result-card");
const finalScoreEl = document.getElementById("final-score");
const accuracyEl = document.getElementById("accuracy");
const finalTimeEl = document.getElementById("final-time");


/* =========================
   INITIAL SETUP
========================= */

function initializeQuiz() {
    totalQuestionsEl.textContent = totalQuestions;
    currentQuestionEl.textContent = 0;
    scoreEl.textContent = 0;
    timerEl.textContent = "00:00";
}


/* =========================
   START QUIZ EVENT
========================= */

startOverlay.addEventListener("click", function () {
    if (!quizStarted) {
        quizStarted = true;
        startOverlay.style.display = "none";

        startQuiz();
    }
});


/* =========================
   NEXT BUTTON EVENT
========================= */

nextBtn.addEventListener("click", function () {
    nextQuestion();
});


/* =========================
   PAGE LOAD
========================= */

initializeQuiz();


/* =========================
   START QUIZ
========================= */

function startQuiz() {
    // Shuffle entire question list ONCE
    selectedQuestions = shuffleArray([...organizations]);

    startTimer();
    generateQuestion();
}


/* =========================
   TIMER ENGINE
========================= */

function startTimer() {
    timerInterval = setInterval(function () {
        timerSeconds++;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimerDisplay() {
    let minutes = Math.floor(timerSeconds / 60);
    let seconds = timerSeconds % 60;

    let formattedMinutes = minutes < 10
        ? "0" + minutes
        : minutes;

    let formattedSeconds = seconds < 10
        ? "0" + seconds
        : seconds;

    timerEl.textContent =
        formattedMinutes + ":" + formattedSeconds;
}

function generateQuestion() {
    if (currentQuestionIndex >= totalQuestions) {
        showFinalResult();
        return;
    }

    // Current question object
    const currentOrg = selectedQuestions[currentQuestionIndex];

    // Set question text
    questionText.textContent =
        "Where is the headquarters of " + currentOrg.name + "?";

    // Correct answer
    currentCorrectAnswer = currentOrg.headquarters;

    // Generate options
    let options = [currentCorrectAnswer];

    // while (options.length < 4) {
    //     let randomOrg =
    //         organizations[Math.floor(Math.random() * organizations.length)];

    //     let wrongAnswer = randomOrg.headquarters;

    //     if (!options.includes(wrongAnswer)) {
    //         options.push(wrongAnswer);
    //     }
    // }

    if (options.length < 4) {
        const fallbackPool = [
            "New York",
            "Geneva",
            "Paris",
            "Rome",
            "Washington, D.C."
        ];

        while (options.length < 4) {
            let fallback = fallbackPool[Math.floor(Math.random() * fallbackPool.length)];
            if (!options.includes(fallback)) {
                options.push(fallback);
            }
        }
    }

    // Shuffle options
    options = shuffleArray(options);

    // Clear old buttons
    optionsContainer.innerHTML = "";

    const allButtons = document.querySelectorAll(".option-btn");

    allButtons.forEach(btn => {
        btn.disabled = false;
        btn.style.backgroundColor = "white";
        btn.style.color = "#222";
    });

    // Create new buttons
    options.forEach(function (option) {
        const button = document.createElement("button");

        button.classList.add("option-btn");
        button.textContent = option;

        button.addEventListener("click", function () {
            checkAnswer(button, option);
        });

        optionsContainer.appendChild(button);
    });

    // Update scoreboard
    currentQuestionEl.textContent = currentQuestionIndex + 1;
    updateProgressBar();
    
     // Enable next button after answering
    nextBtn.disabled = true;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function updateProgressBar() {
    let progress =
        ((currentQuestionIndex + 1) / totalQuestions) * 100;

    progressBar.style.width = progress + "%";
}

function checkAnswer(selectedButton, selectedAnswer) {

    // Prevent multiple clicks
    const allButtons = document.querySelectorAll(".option-btn");

    allButtons.forEach(btn => {
        btn.disabled = true;
    });

    // Correct answer handling
    if (selectedAnswer === currentCorrectAnswer) {
        selectedButton.style.backgroundColor = "#4CAF50"; // green
        selectedButton.style.color = "white";
        playSound("correct");
        score++;
        scoreEl.textContent = score;
    } 
    else {
        // Wrong answer
        selectedButton.style.backgroundColor = "#f44336"; // red
        selectedButton.style.color = "white";
        playSound("wrong");

        // Highlight correct answer
        allButtons.forEach(btn => {
            if (btn.textContent === currentCorrectAnswer) {
                btn.style.backgroundColor = "#4CAF50"; // green
                btn.style.color = "white";
            }
        });
    }

    if (selectedAnswer !== currentCorrectAnswer) {
        wrongAnswers.push({
            question: selectedQuestions[currentQuestionIndex].name,
            correct: currentCorrectAnswer,
            selected: selectedAnswer
        });
    }

    // Update UI score display
    scoreEl.textContent = score;
     // Enable next button after answering
    nextBtn.disabled = false;
}

function nextQuestion() {
    // Move to next question
    currentQuestionIndex++;
    // Load next question
    generateQuestion();
}

function showFinalResult() {

    // Stop timer
    stopTimer();

    // Hide quiz UI
    document.querySelector(".quiz-container").style.display = "none";

    // Show result card
    resultCard.style.display = "block";

    // Calculate accuracy
    let accuracy = Math.round((score / totalQuestions) * 100);

    // Format final time
    finalTimeEl.textContent = timerEl.textContent;

    // Fill result data
    finalScoreEl.textContent = score + " / " + totalQuestions;
    accuracyEl.textContent = accuracy + "%";

    // Optional: progress bar full
    progressBar.style.width = "100%";

    showReview();
}

function goHome() {
    stopTimer();
    window.location.href = "../index.html";
}

function playSound(type) {
    const audio = new Audio();

    if (type === "correct") {
        audio.src = "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg";
    } 
    else {
        audio.src = "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg";
    }

    audio.play();
}

/* =========================
   SHOW REVIEW SCREEN
========================= */

function showReview() {

    let reviewHTML = "<h2>Review Wrong Answers</h2>";

    if (wrongAnswers.length === 0) {
        reviewHTML += "<p>Perfect! No mistakes 🎉</p>";
    } else {

        wrongAnswers.forEach(item => {
            reviewHTML += `
                <div style="margin:15px; padding:15px; background:#f5f5f5; border-radius:10px;">
                    <p><b>Question:</b> ${item.question}</p>
                    <p style="color:red;"><b>Your Answer:</b> ${item.selected}</p>
                    <p style="color:green;"><b>Correct:</b> ${item.correct}</p>
                </div>
            `;
        });
    }

    // resultCard.innerHTML += reviewHTML;
    const oldReview = document.getElementById("review-section");

    if (oldReview) oldReview.remove();

    resultCard.innerHTML += `<div id="review-section">${reviewHTML}</div>`;
}