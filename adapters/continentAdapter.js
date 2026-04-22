import {
    removeItems,
    aliases
} from "../config/worldCountries.js";

function normalize(text) {
    return text
        .toLowerCase()
        .replace(/[_-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export async function buildContinentMap(allowedCountries) {
    const rawSvg = await fetch("../maps/world.svg")
        .then(res => res.text());

    const parser = new DOMParser();
    const doc = parser.parseFromString(rawSvg, "image/svg+xml");

    const regions = [
        ...doc.querySelectorAll("path"),
        ...doc.querySelectorAll("circle")
    ];

    const grouped = {};
    const finalItems = [];

    regions.forEach(path => {
        let name =
            path.getAttribute("name") ||
            path.getAttribute("class") ||
            path.getAttribute("id");

        if (!name) return;

        name = normalize(name);

        if (aliases[name]) {
            name = aliases[name];
        }

        if (removeItems.includes(name)) return;
        if (!allowedCountries.includes(name)) return;

        path.removeAttribute("class");
        path.removeAttribute("id");

        path.setAttribute("fill", "#7ed957");
        path.setAttribute("stroke", "#ffffff");
        path.setAttribute("stroke-width", "1.2");

        if (!grouped[name]) {
            grouped[name] = [];
            finalItems.push(name);
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

    return {
        id: "continent",
        name: "Continent Map",
        items: finalItems,
        svg: result
    };
}