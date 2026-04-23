import { buildContinentMap } from "../adapters/continentAdapter.js";

import {
    asiaCountries,
    europeCountries,
    africaCountries,
    northAmericaCountries,
    southAmericaCountries,
    oceaniaCountries
} from "../config/continentCountries.js";

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