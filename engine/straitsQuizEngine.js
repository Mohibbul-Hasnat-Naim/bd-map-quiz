/* =========================
   QUIZ STATE VARIABLES
========================= */

let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;
let selectedQuestions = [];

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
   START QUIZ WITH MODE
========================= */

function startQuizWithMode(count) {

    quizStarted = true;
    startOverlay.style.display = "none";

    // Reset state
    currentQuestionIndex = 0;
    score = 0;
    wrongAnswers = [];
    timerSeconds = 0;

    // Shuffle dataset
    selectedQuestions = shuffleArray([...straitsData]);

    // Ensure valid count
    count = Math.min(count, selectedQuestions.length);

    // Slice properly
    selectedQuestions = selectedQuestions.slice(0, count);

    // IMPORTANT: now THIS is truth
    totalQuestions = selectedQuestions.length;

    // UI update
    totalQuestionsEl.textContent = totalQuestions;
    scoreEl.textContent = 0;
    currentQuestionEl.textContent = 0;

    startTimer();
    generateQuestion();
}

/* =========================
   NEXT BUTTON EVENT
========================= */

nextBtn.addEventListener("click", function () {
    nextQuestion();
});


/* =========================
   PAGE LOAD
========================= */
buildStartOptions();
initializeQuiz();

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
    if (!selectedQuestions || selectedQuestions.length === 0) {
        return;
    }

    if (currentQuestionIndex >= selectedQuestions.length) {
        showFinalResult();
        return;
    }

    const currentStrait = selectedQuestions[currentQuestionIndex];

    const questionTypes = [
        "connects_to_strait",
        "separates_to_strait",
        "strait_to_connects",
        "strait_to_separates"
    ];

    const type =
        questionTypes[Math.floor(Math.random() * questionTypes.length)];

    let questionLabel = "";
    let correctAnswer = "";
    let options = [];

    if (type === "connects_to_strait") {
        const item =
            currentStrait.connects[
                Math.floor(Math.random() * currentStrait.connects.length)
            ];

        questionLabel = `Which strait connects:`;
        correctAnswer = currentStrait.name;

        questionText.innerHTML = `
            <div class="org-name-en">${item}</div>
        `;
    }

    if (type === "separates_to_strait") {
        const item =
            currentStrait.separates[
                Math.floor(Math.random() * currentStrait.separates.length)
            ];

        questionLabel = `Which strait separates:`;
        correctAnswer = currentStrait.name;

        questionText.innerHTML = `
            <div class="org-name-en">${item}</div>
        `;
    }

    if (type === "strait_to_connects") {
        const item =
            currentStrait.connects[
                Math.floor(Math.random() * currentStrait.connects.length)
            ];

        questionLabel = `${currentStrait.name} connects—`;
        correctAnswer = item;

        questionText.innerHTML = `
            <div class="org-name-en">${questionLabel}</div>
            <div class="org-name-bn">${currentStrait.name_bn || ""}</div>
        `;
    }

    if (type === "strait_to_separates") {
        const item =
            currentStrait.separates[
                Math.floor(Math.random() * currentStrait.separates.length)
            ];

        questionLabel = `${currentStrait.name} separates—`;
        correctAnswer = item;

        questionText.innerHTML = `
            <div class="org-name-en">${questionLabel}</div>
            <div class="org-name-bn">${currentStrait.name_bn || ""}</div>
        `;
    }

    currentCorrectAnswer = correctAnswer;
    options = [correctAnswer];

    while (options.length < 4) {
        let randomStrait =
            straitsData[Math.floor(Math.random() * straitsData.length)];

        let wrongAnswer = "";

        if (
            type === "connects_to_strait" ||
            type === "separates_to_strait"
        ) {
            wrongAnswer = randomStrait.name;
        }

        if (type === "strait_to_connects") {
            wrongAnswer =
                randomStrait.connects[
                    Math.floor(Math.random() * randomStrait.connects.length)
                ];
        }

        if (type === "strait_to_separates") {
            wrongAnswer =
                randomStrait.separates[
                    Math.floor(Math.random() * randomStrait.separates.length)
                ];
        }

        if (!options.includes(wrongAnswer)) {
            options.push(wrongAnswer);
        }
    }

    options = shuffleArray(options);

    optionsContainer.innerHTML = "";

    options.forEach(function (option) {
        const button = document.createElement("button");

        button.classList.add("option-btn");
        button.textContent = option;

        button.addEventListener("click", function () {
            checkAnswer(button, option);
        });

        optionsContainer.appendChild(button);
    });

    currentQuestionEl.textContent = currentQuestionIndex + 1;
    updateProgressBar();

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
            question: questionText.innerText,
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
    resultCard.style.display = "flex";

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
   BUILD START OPTIONS DYNAMICALLY
========================= */

function buildStartOptions() {

    const container = document.getElementById("start-options");
    container.innerHTML = "";

    const total = straitsData.length;

    const options = [
        Math.max(1, Math.round(total * 0.30)),
        Math.max(1, Math.round(total * 0.60)),
        // Math.max(1, Math.round(total * 0.60)),
        // Math.max(1, Math.round(total * 0.80)),
        total
    ];

    const labels = [
        "Easy",
        // "Beginner",
        // "Intermediate",
        "Medium",
        "Hard"
    ];

    options.forEach((count, index) => {

        const btn = document.createElement("button");

        btn.textContent = `${count} Questions (${labels[index]})`;

        btn.onclick = () => startQuizWithMode(count);

        container.appendChild(btn);
    });
}

/* =========================
   SHOW REVIEW SCREEN
========================= */

function showReview() {

    let reviewHTML = `<h2 style="margin-top:20px;">Review Wrong Answers</h2>`;

    if (wrongAnswers.length === 0) {
        reviewHTML += `<p style="margin-top:10px;">Perfect! No mistakes 🎉</p>`;
    } else {

        wrongAnswers.forEach(item => {
            reviewHTML += `
                <div class="review-card">
                    <p class="Question">Question: ${item.question}</p>
                    <p class="wrong">Your Answer: ${item.selected}</p>
                    <p class="correct">Correct: ${item.correct}</p>
                </div>
            `;
        });
    }

    const oldReview = document.getElementById("review-section");
    if (oldReview) oldReview.remove();

    resultCard.innerHTML += `<div id="review-section">${reviewHTML}</div>`;
}

window.startQuizWithMode = startQuizWithMode;