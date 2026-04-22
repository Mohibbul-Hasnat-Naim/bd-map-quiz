import { buildWorldMap } from "../adapters/worldAdapter.js";

export async function getWorldMap() {
    return await buildWorldMap();
}