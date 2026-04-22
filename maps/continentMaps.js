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
    return await buildContinentMap(asiaCountries);
}

export async function getEuropeMap() {
    return await buildContinentMap(europeCountries);
}

export async function getAfricaMap() {
    return await buildContinentMap(africaCountries);
}

export async function getNorthAmericaMap() {
    return await buildContinentMap(northAmericaCountries);
}

export async function getSouthAmericaMap() {
    return await buildContinentMap(southAmericaCountries);
}

export async function getOceaniaMap() {
    return await buildContinentMap(oceaniaCountries);
}