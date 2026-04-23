/*
|--------------------------------------------------------------------------
| World Map + Continents Map Provider
|--------------------------------------------------------------------------
|
| This file controls which map is loaded for the quiz.
|
| It handles:
| - Full world countries map
| - Asia
| - Europe
| - Africa
| - North America
| - South America
| - Oceania
|
| Logic:
| - buildWorldMap() → loads all countries from world.svg
| - buildContinentMap() → filters only selected continent countries
|
| Each function returns:
| - map SVG
| - quiz items list
| - initialViewBox (starting camera position)
|
| initialViewBox controls:
| x-position, y-position, zoom level
| for better first view of each continent.
|
| Example:
| getAsiaMap() → loads only Asia countries
| and opens centered on Asia.
|
| This file is the main map controller
| for the entire world map quiz system.
|
--------------------------------------------------------------------------
*/

import { buildWorldMap } from "../adapters/worldAdapter.js";
import { buildContinentMap } from "../adapters/continentAdapter.js";

import {
    asiaCountries,
    europeCountries,
    africaCountries,
    northAmericaCountries,
    southAmericaCountries,
    oceaniaCountries
} from "../config/worldCountries.js";

export async function getWorldMap() {
    const map = await buildWorldMap();

    return {
        ...map,
        initialViewBox: "0 0 2000 857"
    };
}

export async function getAsiaMap() {
    const map = await buildContinentMap(asiaCountries);
    
    
    return {
        ...map,
        initialViewBox: "1050 80 900 550"
    };
}

export async function getEuropeMap() {
    const map = await buildContinentMap(europeCountries);

    return {
        ...map,
        initialViewBox: "850 0 450 400"
    };
}

export async function getAfricaMap() {
    const map = await buildContinentMap(africaCountries);

    return {
        ...map,
        initialViewBox: "820 180 550 600"
    };
}

export async function getNorthAmericaMap() {
    const map = await buildContinentMap(northAmericaCountries);

    return {
        ...map,
        initialViewBox: "150 50 750 500"
    };
}

export async function getSouthAmericaMap() {
    const map = await buildContinentMap(southAmericaCountries);

    return {
        ...map,
        initialViewBox: "450 300 450 700"
    };
}

export async function getOceaniaMap() {
    const map = await buildContinentMap(oceaniaCountries);

    return {
        ...map,
        initialViewBox: "1550 450 550 400"
    };
}