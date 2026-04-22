import {
    allowedCountries,
    removeItems
} from "../config/worldCountries.js";

export async function buildWorldMap() {
    const rawSvg = await fetch("../maps/world.svg")
        .then(res => res.text());

    const normalizedSvg = normalizeWorldSVG(rawSvg);

    const items = extractItems(rawSvg);

    return {
        id: "world",
        name: "World Countries",
        items,
        svg: normalizedSvg
    };
}

function normalize(text) {
    return text
        .toLowerCase()
        .replace(/[_-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function normalizeWorldSVG(rawSvg) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawSvg, "image/svg+xml");

    const paths = [...doc.querySelectorAll("path")];
    const grouped = {};

    paths.forEach(path => {
        let name =
            path.getAttribute("name") ||
            path.getAttribute("class") ||
            path.getAttribute("id");

        if (!name) return;

        if (name.length <= 2 && path.getAttribute("name")) {
            name = path.getAttribute("name");
        }

        name = normalize(name);

        path.removeAttribute("class");
        path.removeAttribute("id");

        path.setAttribute("fill", "#7ed957");
        path.setAttribute("stroke", "#ffffff");
        path.setAttribute("stroke-width", "1.2");

        if (!grouped[name]) {
            grouped[name] = [];
        }

        grouped[name].push(path.outerHTML);
    });

    let result = "";

    Object.keys(grouped).forEach(name => {
        result += `
            <g id="${name}" class="map-region">
                ${grouped[name].join("\n")}
            </g>
        `;
    });

    return result;
}

function extractItems(rawSvg) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawSvg, "image/svg+xml");

    const paths = [...doc.querySelectorAll("path")];
    const set = new Set();

    paths.forEach(path => {
        let name =
            path.getAttribute("name") ||
            path.getAttribute("class") ||
            path.getAttribute("id");

        if (!name) return;

        if (name.length <= 2 && path.getAttribute("name")) {
            name = path.getAttribute("name");
        }

        name = normalize(name);

        // if (aliases[name]) {
        //     name = aliases[name];
        // }

        set.add(name);
    });

    const extracted = [...set];

    const finalItems = extracted
        .filter(item => !removeItems.includes(item))
        .filter(item => allowedCountries.includes(item));

        console.log("Total Extracted:", extracted.length);
    console.log("Extracted:", extracted);
    console.log("Total Final:", finalItems.length);
    console.log("Final Items:", finalItems);

    return finalItems;
}