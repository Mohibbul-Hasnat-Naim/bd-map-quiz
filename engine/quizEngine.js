export function startQuiz(config) {

    const {
        mapDataProvider,

        svgContainerId = "map-layer",

        targetId = "target-name",
        scoreId = "score",
        attemptsId = "attempts",
        timerId = "live-timer",
        statusId = "status-msg",

        sounds = {}
    } = config;

    let mapData = null;

    let items = [];
    let remaining = [];
    let skipped = [];
    let target = "";

    let score = 0;
    let attempts = 0;

    let startTime = null;
    let endTime = null;

    let timerInterval = null;
    let timerRunning = false;

    let hasStarted = false;

    let soundEnabled = true;
    let labelsEnabled = false;
    let skippedCount = 0;

    function init() {
        mapData = mapDataProvider();

        items = [...mapData.items];
        remaining = [...mapData.items];
        skipped = [];

        const layer = d3.select("#" + svgContainerId);

        layer.html(mapData.svg);

        const regions = layer.selectAll(".map-region");

        regions
            .style("cursor", "pointer")
            .on("click", function () {

                if (document.body.classList.contains("learn-mode")) return;

                // FIRST CLICK = ONLY START GAME
                if (!hasStarted) {
                    startGame();

                    // IMPORTANT: do NOT evaluate this click
                    return;
                }

                // after game started → normal logic
                checkAnswer(this.id);
            });

        enableD3Zoom();

        positionLabels();
        updateDisplay();

        document.getElementById(targetId).innerText =
            "Click on map to start";
    }

    // expose global UI hooks (needed for HTML buttons)
    window.resetGame = resetGame;
    window.skipQuestion = skipQuestion;
    window.toggleMode = toggleMode;
    window.toggleSound = toggleSound;
    window.toggleLabels = toggleLabels;

    function startGame() {
        if (hasStarted) return;

        hasStarted = true;
        startTimer();
        nextQuestion();
        updateDisplay();
    }

    function toggleSound() {
        soundEnabled = !soundEnabled;

        const btn = document.getElementById("sound-toggle");

        if (soundEnabled) {
            btn.innerText = "🔊 Sound ON";
        } else {
            btn.innerText = "🔇 Sound OFF";
        }
    }

    function playSound(soundType) {
        if (!soundEnabled) return;

        const sound = sounds[soundType];

        if (sound) {
            sound.currentTime = 0;
            sound.play?.();
        }
    }

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

    function updateDisplay() {
        document.getElementById(scoreId).innerText =
            `${score}/${items.length}`;

        document.getElementById(attemptsId).innerText = attempts;
    }

    function startTimer() {
        if (timerRunning) return;

        startTime = new Date();
        timerRunning = true;

        timerInterval = setInterval(() => {
            const elapsed = new Date() - startTime;
            document.getElementById(timerId).innerText = formatTime(elapsed);
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

    function nextQuestion() {
        if (!hasStarted && !document.body.classList.contains("learn-mode")) {
            document.getElementById(targetId).innerText =
                "Click on map to start";
            return;
        }

        if (remaining.length === 0) {
            if (skipped.length > 0) {
                remaining = [...skipped];
                skipped = [];
            } else {
                stopTimer();
                document.getElementById(targetId).innerText = "FINISHED!";
                setTimeout(showResultModal, 700);
                return;
            }
        }

        const i = Math.floor(Math.random() * remaining.length);
        target = remaining[i];

        document.getElementById(targetId).innerText =
            target.toUpperCase();
    }

    function setStatus(text, color) {
        const msg = document.getElementById(statusId);

        msg.innerHTML = text;
        msg.style.color = color;
        msg.style.opacity = "1";

        clearTimeout(msg.hideTimeout);

        msg.hideTimeout = setTimeout(() => {
            msg.style.opacity = "0";
        }, 500);
    }

    function checkAnswer(id) {
        if (document.body.classList.contains("learn-mode")) return;

        attempts++;

        const el = document.getElementById(id);

        // convert clicked id → proper display name
        const name = id
            .replace(/-/g, " ")
            .replace(/\b\w/g, c => c.toUpperCase());

        if (id === target) {
            score++;

            // sounds.correct?.play?.();
            playSound("correct");

            el.classList.add("locked");

            const label = el.querySelector(".division-label");
            if (label && !document.body.classList.contains("learn-mode")) {
                label.style.display = "block";
            }

            remaining = remaining.filter(d => d !== target);

            setStatus(`✓ Correct! ~ ${name}`, "var(--bd-green)");

            nextQuestion();
        } else {
            // sounds.wrong?.play?.();
            playSound("wrong");

            setStatus(`✗ Wrong! ~ ${name}`, "var(--bd-red)");
        }

        updateDisplay();
    }

    function skipQuestion() {
        if (document.body.classList.contains("learn-mode")) return;

        const totalPending = remaining.length + skipped.length;

        if (totalPending <= 1) return;

        if (!skipped.includes(target)) {
            skipped.push(target);
            skippedCount++;
        }

        remaining = remaining.filter(d => d !== target);

        // sounds.skip?.play?.();
        playSound("skip");

        nextQuestion();
    }

    function resetGame() {
        score = 0;
        attempts = 0;
        hasStarted = false;

        remaining = [...items];
        skipped = [];

        document.querySelectorAll(".map-region").forEach(el => {
            el.classList.remove("locked");
        });

        document.querySelectorAll(".division-label").forEach(label => {
            label.style.display = "";
        });

        clearInterval(timerInterval);

        timerInterval = null;
        timerRunning = false;

        startTime = null;
        endTime = null;

        document.getElementById(timerId).innerText = "00:00";
        document.getElementById(statusId).style.opacity = "0";
        document.getElementById("result-modal").style.display = "none";

        updateDisplay();

        document.getElementById(targetId).innerText =
            "Click on map to start";
    }


    function showResultModal() {
        // sounds.victory?.play?.();
        playSound("victory");

        const totalTime = endTime - startTime;
        const accuracy = attempts ? Math.round((score / attempts) * 100) : 0;

        document.getElementById("final-time").innerText =
            formatTime(totalTime);

        document.getElementById("final-correct").innerText = `${score}/${items.length}`;
        document.getElementById("final-attempts").innerText = attempts;
        document.getElementById("final-skipped").innerText = skippedCount;
        document.getElementById("final-accuracy").innerText = accuracy + "%";

        document.getElementById("result-modal").style.display = "flex";
    }

    function toggleMode() {
        // sounds.mode?.play?.();
        playSound("mode");

        const body = document.body;
        const targetDisplay = document.getElementById(targetId);
        const modeBtn = document.getElementById("mode-btn");

        const isLearn = body.classList.contains("learn-mode");

        resetGame();

        if (!isLearn) {
            body.classList.add("learn-mode");

            targetDisplay.innerText = "STUDY MODE";
            targetDisplay.style.color = "#f700ff";

            modeBtn.innerText = "Back to Quiz";
            modeBtn.style.background = "#333";
        } else {
            body.classList.remove("learn-mode");

            targetDisplay.style.color = "var(--bd-green)";

            modeBtn.innerText = "Learn Map";
            modeBtn.style.background = "#006a4e";

            nextQuestion();
        }
    }

    function positionLabels() {
        document.querySelectorAll(".map-region").forEach(group => {
            const paths = group.querySelectorAll("path");
            
            let label = group.querySelector(".division-label");

            if (paths.length === 0) return;

            // Auto-create label if missing
            if (!label) {
                label = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "text"
                );

                label.classList.add("division-label");

                // Convert id → proper label
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

    function enableD3Zoom() {
        const svg = d3.select("#main-svg");

        const zoomLayer = svg.select("#map-layer");

        const zoom = d3.zoom()
            .scaleExtent([1, 6])
            .on("zoom", (event) => {
                zoomLayer.attr("transform", event.transform);
            });

        svg.call(zoom);

        // optional: better initial position
        // svg.call(
        //     zoom.transform,
        //     d3.zoomIdentity.translate(0, 0).scale(2.2)
        // );
    }

    init();

    return {
        resetGame,
        skipQuestion,
        toggleMode
    };
}