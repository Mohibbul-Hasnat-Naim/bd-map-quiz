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

// function generateQuestion v1() {
//     if (!selectedQuestions || selectedQuestions.length === 0) {
//         return;
//     }

//     if (currentQuestionIndex >= selectedQuestions.length) {
//         showFinalResult();
//         return;
//     }

//     const currentStrait = selectedQuestions[currentQuestionIndex];

//     const questionTypes = [
//         "strait_to_details",
//         "details_to_strait"
//     ];

//     const type =
//         questionTypes[Math.floor(Math.random() * questionTypes.length)];

//     let correctAnswer = "";
//     let options = [];

//     const connectItem =
//         currentStrait.connects[
//             Math.floor(Math.random() * currentStrait.connects.length)
//         ];

//     const separateItem =
//         currentStrait.separates[
//             Math.floor(Math.random() * currentStrait.separates.length)
//         ];

//     /* =========================
//        TYPE 1: STRAIT → DETAILS
//     ========================= */
//     if (type === "strait_to_details") {

//         // QUESTION = STRAIT NAME
//         questionText.innerHTML = `
//             <div class="org-name-en">
//                 ${currentStrait.name}
//             </div>

//             <div class="org-name-bn">
//                 ${currentStrait.name_bn || ""}
//             </div>
//         `;

//         // ANSWER = DETAILS
//         correctAnswer = `Connects: ${connectItem}\nSeparates: ${separateItem}`;
//         options = [correctAnswer];

//         while (options.length < 4) {

//             let randomStrait =
//                 straitsData[Math.floor(Math.random() * straitsData.length)];

//             let wrongConnect =
//                 randomStrait.connects[
//                     Math.floor(Math.random() * randomStrait.connects.length)
//                 ];

//             let wrongSeparate =
//                 randomStrait.separates[
//                     Math.floor(Math.random() * randomStrait.separates.length)
//                 ];

//             let wrongAnswer =
//                 `Connects: ${wrongConnect}\nSeparates: ${wrongSeparate}`;

//             if (!options.includes(wrongAnswer)) {
//                 options.push(wrongAnswer);
//             }
//         }
//     }

//     /* =========================
//        TYPE 2: DETAILS → STRAIT
//     ========================= */
//     if (type === "details_to_strait") {

//         // QUESTION = DETAILS
//         questionText.innerHTML = `
//             <div class="strait-detail">
//                 <span class="connect-label">Connects:</span>
//                 <span class="connect-value">${connectItem}</span>
//             </div>

//             <div class="strait-detail">
//                 <span class="separate-label">Separates:</span>
//                 <span class="separate-value">${separateItem}</span>
//             </div>
//         `;

//         // ANSWER = STRAIT NAME
//         correctAnswer = currentStrait.name;
//         options = [correctAnswer];

//         while (options.length < 4) {

//             let randomStrait =
//                 straitsData[Math.floor(Math.random() * straitsData.length)];

//             let wrongAnswer = randomStrait.name;

//             if (!options.includes(wrongAnswer)) {
//                 options.push(wrongAnswer);
//             }
//         }
//     }

//     /* =========================
//        FINALIZE STATE
//     ========================= */

//     currentCorrectAnswer = correctAnswer;
//     options = shuffleArray(options);

//     optionsContainer.innerHTML = "";

//     options.forEach(function (option) {
//         const button = document.createElement("button");

//         button.classList.add("option-btn");

//         // 🔥 CRITICAL FIX: use dataset for logic safety
//         button.dataset.answer = option;

//         // TYPE-AWARE RENDERING
//         if (type === "strait_to_details") {
//             button.innerHTML = option
//                 .replace("Connects:", '<span class="connect-label">Connects:</span>')
//                 .replace("Separates:", '<span class="separate-label">Separates:</span>')
//                 .replace(/\n/g, "<br>");
//         } else {
//             button.textContent = option;
//         }

//         button.addEventListener("click", function () {
//             checkAnswer(button, option);
//         });

//         optionsContainer.appendChild(button);
//     });

//     /* =========================
//        UI UPDATE
//     ========================= */

//     currentQuestionEl.textContent = currentQuestionIndex + 1;
//     updateProgressBar();
//     nextBtn.disabled = true;
// }

function generateQuestion() {
    if (!selectedQuestions || selectedQuestions.length === 0) return;

    if (currentQuestionIndex >= selectedQuestions.length) {
        showFinalResult();
        return;
    }

    const currentStrait = selectedQuestions[currentQuestionIndex];

    const questionTypes = [
        "strait_to_details",
        "details_to_strait"
    ];

    const type =
        questionTypes[Math.floor(Math.random() * questionTypes.length)];

    let correctAnswer = "";
    let options = [];

    // FULL structured values (IMPORTANT FIX)
    // const connectItem = currentStrait.connects.join("; ");
    // const separateItem = currentStrait.separates.join("; ");
    
    const connectItem = currentStrait.connects?.[0] || "N/A";
    const separateItem = currentStrait.separates?.[0] || "N/A";

    /* =========================
       TYPE 1: STRAIT → DETAILS
    ========================= */
    if (type === "strait_to_details") {

        // QUESTION: Strait name
        questionText.innerHTML = `
            <div class="org-name-en">
                ${currentStrait.name}
            </div>

            <div class="org-name-bn">
                ${currentStrait.name_bn || ""}
            </div>
        `;

        // ANSWER: full structured details
        correctAnswer =
            `Connects: ${connectItem}\nSeparates: ${separateItem}`;

        options = [correctAnswer];

        // WRONG OPTIONS (FULL STRUCTURE)
        while (options.length < 4) {

            let randomStrait =
                straitsData[Math.floor(Math.random() * straitsData.length)];

            let wrongAnswer =
                `Connects: ${randomStrait.connects[0] || "N/A"}\nSeparates: ${randomStrait.separates[0] || "N/A"}`;

            if (!options.includes(wrongAnswer)) {
                options.push(wrongAnswer);
            }
        }
    }

    /* =========================
       TYPE 2: DETAILS → STRAIT
    ========================= */
    if (type === "details_to_strait") {

        // QUESTION: full structured details
        questionText.innerHTML = `
            <div class="strait-detail">
                <span class="connect-label">Connects:</span>
                <span class="connect-value">${connectItem}</span>
            </div>

            <div class="strait-detail">
                <span class="separate-label">Separates:</span>
                <span class="separate-value">${separateItem}</span>
            </div>
        `;

        // ANSWER: strait name
        correctAnswer = currentStrait.name;
        options = [correctAnswer];

        // WRONG OPTIONS (STRAIT NAMES)
        while (options.length < 4) {

            let randomStrait =
                straitsData[Math.floor(Math.random() * straitsData.length)];

            let wrongAnswer = randomStrait.name;

            if (!options.includes(wrongAnswer)) {
                options.push(wrongAnswer);
            }
        }
    }

    /* =========================
       FINALIZE
    ========================= */

    currentCorrectAnswer = correctAnswer;
    options = shuffleArray(options);

    optionsContainer.innerHTML = "";

    options.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("option-btn");

        // IMPORTANT: stable logic value
        button.dataset.answer = option;

        // TYPE-BASED RENDERING
        if (type === "strait_to_details") {
            button.innerHTML = option
                .replace("Connects:", '<span class="connect-label">Connects:</span>')
                .replace("Separates:", '<span class="separate-label">Separates:</span>')
                .replace(/\n/g, "<br>");
        } else {
            button.textContent = option;
        }

        button.addEventListener("click", () => {
            checkAnswer(button, option);
        });

        optionsContainer.appendChild(button);
    });

    /* =========================
       UI UPDATE
    ========================= */

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

    const allButtons = document.querySelectorAll(".option-btn");

    allButtons.forEach(btn => {
        btn.disabled = true;
    });

    // Correct answer check
    if (selectedAnswer === currentCorrectAnswer) {
        selectedButton.style.backgroundColor = "#6aff6f";
        selectedButton.style.color = "white";
        playSound("correct");
        score++;
        scoreEl.textContent = score;
    } 
    else {
        selectedButton.style.backgroundColor = "#ff786e";
        selectedButton.style.color = "white";
        playSound("wrong");

        // highlight correct
        allButtons.forEach(btn => {
            if (btn.dataset.answer === currentCorrectAnswer) {
                btn.style.backgroundColor = "#6aff6f";
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

    scoreEl.textContent = score;
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
        reviewHTML += `<div class="perfect-message">Perfect! No mistakes 🎉</div>`;
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