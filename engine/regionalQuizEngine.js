import { regionalGroups }
    from "../config/regionalGroups.js";

export async function startRegionalQuiz(config) {

    const {
        mapDataProvider,

        selectedGroup,

        svgContainerId = "map-layer",

        targetId = "target-name",
        scoreId = "score",
        attemptsId = "attempts",
        remainingId = "remaining-count",
        timerId = "live-timer",
        statusId = "status-msg",

        sounds = {}
    } = config;

    // -----------------------------
    // STATE
    // -----------------------------

    let group = regionalGroups[selectedGroup];

    let items = [];
    let found = [];

    let wrongAttempts = 0;

    let hasStarted = false;

    let startTime = null;
    let endTime = null;

    let timerInterval = null;
    let timerRunning = false;

    let soundEnabled = true;

    // -----------------------------
    // INIT
    // -----------------------------

    async function init() {

        const mapData = await mapDataProvider();

        const layer = d3.select("#" + svgContainerId);

        layer.html(mapData.svg);

        if (mapData.initialViewBox) {
            d3.select("#main-svg")
                .attr("viewBox", mapData.initialViewBox);
        }

        items = [...group.countries];
        found = [];

        document.getElementById(targetId)
            .innerText = group.title.toUpperCase();

        bindRegions();

        enableD3Zoom();

        positionLabels();

        updateDisplay();
    }

    // -----------------------------
    // GLOBAL HOOKS
    // -----------------------------

    window.resetGame = resetGame;
    window.toggleMode = toggleMode;
    window.toggleSound = toggleSound;
    window.toggleLabels = toggleLabels;
    window.changeGroup = changeGroup;

    // -----------------------------
    // GROUP SWITCH (NO RELOAD)
    // -----------------------------

    function changeGroup(groupName) {

        group = regionalGroups[groupName];

        resetGame();

        document.getElementById(targetId)
            .innerText = group.title.toUpperCase();

        init();
    }

    // -----------------------------
    // BIND MAP EVENTS
    // -----------------------------

    function bindRegions() {

        const regions =
            d3.select("#" + svgContainerId)
                .selectAll(".map-region");

        regions
            .style("cursor", "pointer")
            .on("click", function () {

                if (document.body.classList.contains("learn-mode")) return;

                if (!hasStarted) startGame();

                checkAnswer(this.id);
            });
    }

    // -----------------------------
    // GAME START
    // -----------------------------

    function startGame() {

        if (hasStarted) return;

        hasStarted = true;

        startTimer();
    }

    // -----------------------------
    // ANSWER CHECK
    // -----------------------------

    function checkAnswer(id) {

        const el = document.getElementById(id);

        const name = id
            .replace(/-/g, " ")
            .replace(/\b\w/g, c => c.toUpperCase());

        const isCorrect = items.includes(id);
        const alreadyFound = found.includes(id);

        if (isCorrect && !alreadyFound) {

            found.push(id);

            el.classList.add("locked");

            playSound("correct");

            setStatus(`✓ ${name}`, "var(--bd-green)");

            const label = el.querySelector(".division-label");
            if (label) label.style.display = "block";

        } else {

            if (alreadyFound) return;

            wrongAttempts++;

            playSound("wrong");

            setStatus(`✗ ${name}`, "var(--bd-red)");
        }

        updateDisplay();

        if (found.length === items.length) {

            stopTimer();

            setTimeout(showResultModal, 500);
        }
    }

    // -----------------------------
    // DISPLAY
    // -----------------------------

    function updateDisplay() {

        document.getElementById(scoreId)
            .innerText = `${found.length}/${items.length}`;

        document.getElementById(attemptsId)
            .innerText = wrongAttempts;

        document.getElementById(remainingId)
            .innerText = items.length - found.length;
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

        const t = Math.floor(ms / 1000);

        const m = Math.floor(t / 60);

        const s = t % 60;

        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }

    // -----------------------------
    // RESET
    // -----------------------------

    function resetGame() {

        found = [];
        wrongAttempts = 0;

        hasStarted = false;

        clearInterval(timerInterval);

        timerRunning = false;

        startTime = null;
        endTime = null;

        document.querySelectorAll(".map-region")
            .forEach(el => el.classList.remove("locked"));

        document.querySelectorAll(".division-label")
            .forEach(l => l.style.display = "");

        document.getElementById(timerId).innerText = "00:00";
        document.getElementById(statusId).style.opacity = "0";
        document.getElementById("result-modal").style.display = "none";

        updateDisplay();
    }

    // -----------------------------
    // MODE
    // -----------------------------

    function toggleMode() {

        const body = document.body;
        const btn = document.getElementById("mode-btn");

        const isLearn = body.classList.contains("learn-mode");

        if (!isLearn) {

            body.classList.add("learn-mode");

            btn.innerText = `Learn ${group.title}`;
            btn.style.background = "#333";

            applyLearnFocus(true);

        } else {

            body.classList.remove("learn-mode");

            btn.innerText = "Learn Map";
            btn.style.background = "#01d3f8";

            applyLearnFocus(false);
        }
    }

    function applyLearnFocus(enable) {

        const regions = document.querySelectorAll(".map-region");

        regions.forEach(el => {

            const isInGroup = items.includes(el.id);

            if (enable) {

                if (isInGroup) {

                    el.classList.add("learn-focus");

                } else {

                    el.classList.add("learn-dim");
                }

            } else {

                el.classList.remove("learn-focus", "learn-dim");
            }
        });
        updateLearnLabels();
    }

    function showGroupLabels(onlyGroup) {

        const labels = document.querySelectorAll(".division-label");

        labels.forEach(label => {

            const id = label.parentNode?.id;

            if (!id) return;

            const isInGroup = items.includes(id);

            if (onlyGroup) {

                label.style.display = isInGroup ? "block" : "none";

            } else {

                label.style.display = "";
            }
        });
    }

    function updateLearnLabels() {

        document.querySelectorAll(".map-region").forEach(el => {

            const label = el.querySelector(".division-label");

            if (!label) return;

            if (document.body.classList.contains("learn-mode")) {

                label.style.display = items.includes(el.id)
                    ? "block"
                    : "none";

            } else {

                label.style.display = "none";
            }
        });
    }

    // -----------------------------
    // SOUND
    // -----------------------------

    function toggleSound() {

        soundEnabled = !soundEnabled;

        document.getElementById("sound-toggle")
            .innerText = soundEnabled
                ? "🔊 Sound ON"
                : "🔇 Sound OFF";
    }

    function playSound(type) {

        if (!soundEnabled) return;

        const s = sounds[type];

        if (s) {
            s.currentTime = 0;
            s.play?.();
        }
    }

    // -----------------------------
    // LABELS + ZOOM
    // -----------------------------

    function toggleLabels() {

        document.body.classList.toggle("show-labels");
    }

    function enableD3Zoom() {

        const svg = d3.select("#main-svg");

        const layer = svg.select("#map-layer");

        const zoom = d3.zoom()
            .scaleExtent([1, 6])
            .on("zoom", e => {

                layer.attr("transform", e.transform);
            });

        svg.call(zoom);
    }

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

                    label.textContent = group.id
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, c => c.toUpperCase());

                    group.appendChild(label);
                }

                let minX = Infinity, minY = Infinity;
                let maxX = -Infinity, maxY = -Infinity;

                paths.forEach(p => {

                    const b = p.getBBox();

                    minX = Math.min(minX, b.x);
                    minY = Math.min(minY, b.y);

                    maxX = Math.max(maxX, b.x + b.width);
                    maxY = Math.max(maxY, b.y + b.height);
                });

                label.setAttribute("x", (minX + maxX) / 2);
                label.setAttribute("y", (minY + maxY) / 2);
            });
    }

    // -----------------------------
    // START
    // -----------------------------

    await init();

    return {
        resetGame,
        changeGroup
    };
}