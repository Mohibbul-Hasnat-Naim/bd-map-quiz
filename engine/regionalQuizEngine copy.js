import { regionalGroups }
from "../config/regionalGroups.js";

export async function startRegionalQuiz(config) {

    const {
        mapDataProvider,
        selectedGroup,
        setMap, // NEW

        svgContainerId = "map-layer",

        targetId = "target-name",
        scoreId = "score",
        attemptsId = "attempts",
        timerId = "live-timer",
        statusId = "status-msg",

        sounds = {}
    } = config;

    // -----------------------------
    // GROUP DATA
    // -----------------------------

    const group = regionalGroups[selectedGroup];

    if (!group) {
        console.error("Invalid regional group:", selectedGroup);
        return;
    }

    // -----------------------------
    // STATE
    // -----------------------------

    let mapData = null;

    let targets = [...group.countries];
    let found = [];

    let wrongAttempts = 0;

    let hasStarted = false;

    let startTime = null;
    let endTime = null;

    let timerInterval = null;
    let timerRunning = false;

    let soundEnabled = true;
    let labelsEnabled = false;

    // -----------------------------
    // INIT
    // -----------------------------

    async function init() {

        // -----------------------------
        // AUTO MAP SWITCH (SMART DEFAULT)
        // -----------------------------

        if (group.preferredMap && typeof setMap === "function") {

            const params = new URLSearchParams(window.location.search);

            const currentMap = params.get("map");

            if (!currentMap) {
                setMap(group.preferredMap);
            }
        }

        mapData = await mapDataProvider();

        const layer = d3.select("#" + svgContainerId);

        layer.html(mapData.svg);

        if (mapData.initialViewBox) {
            d3.select("#main-svg")
                .attr("viewBox", mapData.initialViewBox);
        }

        document.getElementById(targetId)
            .innerText = group.title.toUpperCase();

        const regions = layer.selectAll(".map-region");

        regions
            .style("cursor", "pointer")
            .on("click", function () {

                if (document.body.classList.contains("learn-mode")) return;

                if (!hasStarted) {
                    startGame();
                }

                checkAnswer(this.id);
            });

        enableD3Zoom();

        positionLabels();

        updateDisplay();
    }

    // -----------------------------
    // GLOBAL BUTTONS
    // -----------------------------

    window.resetGame = resetGame;
    window.toggleMode = toggleMode;
    window.toggleSound = toggleSound;
    window.toggleLabels = toggleLabels;

    // -----------------------------
    // START GAME
    // -----------------------------

    function startGame() {

        if (hasStarted) return;

        hasStarted = true;

        startTimer();
    }

    // -----------------------------
    // SOUND
    // -----------------------------

    function toggleSound() {

        soundEnabled = !soundEnabled;

        const btn = document.getElementById("sound-toggle");

        btn.innerText = soundEnabled
            ? "🔊 Sound ON"
            : "🔇 Sound OFF";
    }

    function playSound(type) {

        if (!soundEnabled) return;

        const sound = sounds[type];

        if (sound) {
            sound.currentTime = 0;
            sound.play?.();
        }
    }

    // -----------------------------
    // LABELS
    // -----------------------------

    function toggleLabels() {

        labelsEnabled = !labelsEnabled;

        const btn = document.getElementById("label-toggle");

        if (labelsEnabled) {

            btn.innerText = "🏷 Labels ON";

            document.body.classList.add("show-labels");

        } else {

            btn.innerText = "🏷 Labels OFF";

            document.body.classList.remove("show-labels");
        }
    }

    // -----------------------------
    // TIMER
    // -----------------------------

    function startTimer() {

        if (timerRunning) return;

        startTime = new Date();

        timerRunning = true;

        timerInterval = setInterval(() => {

            const elapsed = new Date() - startTime;

            document.getElementById(timerId)
                .innerText = formatTime(elapsed);

        }, 1000);
    }

    function stopTimer() {

        endTime = new Date();

        timerRunning = false;

        clearInterval(timerInterval);
    }

    function formatTime(ms) {

        const totalSeconds = Math.floor(ms / 1000);

        const minutes = Math.floor(totalSeconds / 60);

        const seconds = totalSeconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    // -----------------------------
    // DISPLAY
    // -----------------------------

    function updateDisplay() {

        document.getElementById(scoreId)
            .innerText = `${found.length}/${targets.length}`;

        document.getElementById(attemptsId)
            .innerText = wrongAttempts;
    }

    // -----------------------------
    // STATUS
    // -----------------------------

    function setStatus(text, color) {

        const msg = document.getElementById(statusId);

        msg.innerHTML = text;
        msg.style.color = color;
        msg.style.opacity = "1";

        clearTimeout(msg.hideTimeout);

        msg.hideTimeout = setTimeout(() => {
            msg.style.opacity = "0";
        }, 700);
    }

    // -----------------------------
    // ANSWER CHECK
    // -----------------------------

    function checkAnswer(id) {

        const el = document.getElementById(id);

        const displayName = id
            .replace(/-/g, " ")
            .replace(/\b\w/g, c => c.toUpperCase());

        const isCorrect = targets.includes(id);

        const alreadyFound = found.includes(id);

        if (isCorrect && !alreadyFound) {

            found.push(id);

            el.classList.add("locked");

            playSound("correct");

            setStatus(`✓ ${displayName}`, "var(--bd-green)");

            const label = el.querySelector(".division-label");

            if (label) label.style.display = "block";

        } else {

            if (alreadyFound) return;

            wrongAttempts++;

            playSound("wrong");

            setStatus(`✗ ${displayName}`, "var(--bd-red)");
        }

        updateDisplay();

        checkCompletion();
    }

    // -----------------------------
    // COMPLETION
    // -----------------------------

    function checkCompletion() {

        if (found.length !== targets.length) return;

        stopTimer();

        setTimeout(() => showResultModal(), 500);
    }

    // -----------------------------
    // RESULT
    // -----------------------------

    function showResultModal() {

        playSound("victory");

        const totalTime = endTime - startTime;

        const totalClicks = found.length + wrongAttempts;

        const accuracy = totalClicks
            ? Math.round((found.length / totalClicks) * 100)
            : 0;

        document.getElementById("final-group")
            .innerText = group.title;

        document.getElementById("final-time")
            .innerText = formatTime(totalTime);

        document.getElementById("final-correct")
            .innerText = `${found.length}/${targets.length}`;

        document.getElementById("final-attempts")
            .innerText = wrongAttempts;

        document.getElementById("final-accuracy")
            .innerText = accuracy + "%";

        document.getElementById("result-modal")
            .style.display = "flex";
    }

    // -----------------------------
    // RESET
    // -----------------------------

    function resetGame() {

        found = [];

        wrongAttempts = 0;

        hasStarted = false;

        clearInterval(timerInterval);

        timerInterval = null;

        timerRunning = false;

        startTime = null;
        endTime = null;

        document.querySelectorAll(".map-region")
            .forEach(el => el.classList.remove("locked"));

        document.querySelectorAll(".division-label")
            .forEach(label => label.style.display = "");

        document.getElementById(timerId)
            .innerText = "00:00";

        document.getElementById(statusId)
            .style.opacity = "0";

        document.getElementById("result-modal")
            .style.display = "none";

        updateDisplay();
    }

    // -----------------------------
    // MODE
    // -----------------------------

    function toggleMode() {

        playSound("mode");

        const body = document.body;

        const modeBtn = document.getElementById("mode-btn");

        const isLearn = body.classList.contains("learn-mode");

        if (!isLearn) {

            body.classList.add("learn-mode");

            modeBtn.innerText = "Back to Quiz";

            modeBtn.style.background = "#333";

        } else {

            body.classList.remove("learn-mode");

            modeBtn.innerText = "Learn Map";

            modeBtn.style.background = "#8d6442";
        }
    }

    // -----------------------------
    // LABEL POSITIONING
    // -----------------------------

    function positionLabels() {

        document.querySelectorAll(".map-region")
            .forEach(group => {

                const paths = group.querySelectorAll("path");

                let label = group.querySelector(".division-label");

                if (!paths.length) return;

                if (!label) {

                    label = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "text"
                    );

                    label.classList.add("division-label");

                    let name = group.id
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, c => c.toUpperCase());

                    label.textContent = name;

                    group.appendChild(label);
                }

                let minX = Infinity, minY = Infinity;
                let maxX = -Infinity, maxY = -Infinity;

                paths.forEach(path => {

                    const box = path.getBBox();

                    minX = Math.min(minX, box.x);
                    minY = Math.min(minY, box.y);

                    maxX = Math.max(maxX, box.x + box.width);
                    maxY = Math.max(maxY, box.y + box.height);
                });

                label.setAttribute("x", (minX + maxX) / 2);
                label.setAttribute("y", (minY + maxY) / 2);
            });
    }

    // -----------------------------
    // ZOOM
    // -----------------------------

    function enableD3Zoom() {

        const svg = d3.select("#main-svg");

        const zoomLayer = svg.select("#map-layer");

        const zoom = d3.zoom()
            .scaleExtent([1, 6])
            .on("zoom", event => {

                zoomLayer.attr("transform", event.transform);
            });

        svg.call(zoom);
    }

    // -----------------------------
    // START
    // -----------------------------

    await init();

    return {
        resetGame,
        toggleMode
    };
}