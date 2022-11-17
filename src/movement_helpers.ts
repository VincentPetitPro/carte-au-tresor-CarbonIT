import Adventurer from "./adventurer";
import Coords from "./coords";
import Mountain from "./moutain";

/**
 * @param nextCase the next case to be checked
 * @param mapCoords the coordinates of the map
 * @returns {boolean} true if the next case is inside the map, false otherwise
 */
export function isInBoard(nextCase: Coords, mapCoords: Coords): boolean {
	if (
		nextCase.x >= 0 &&
		nextCase.x <= mapCoords.x &&
		nextCase.y >= 0 &&
		nextCase.y <= mapCoords.y
	) {
		return true;
	} else {
		return false;
	}
}
/**
 * @param {Coords} nextCase the next case to be checked
 * @param {Mountain[]} mountains list of all mountains
 * @returns {boolean} true if the next case is a mountain, false otherwise
 */
export function isMountain(nextCase: Coords, mountains: Mountain[]): boolean {
	return mountains.some((m) => {
		return JSON.stringify(m) === JSON.stringify(nextCase);
	});
}

/**
 * @param {Coords} nextCase the next case to be checked
 * @param {Adventurer[]} adventurers list of all adventurers
 * @returns {boolean} true if the next case is an adventurer, false otherwise
 */
export function isAdventurer(nextCase: Coords, adventurers: Adventurer[]): boolean {
	return adventurers.some((a) => {
		return JSON.stringify(new Coords(a.x, a.y)) === JSON.stringify(nextCase);
	});
}

/**
 * @param {Coords} nextCase the next case to be checked
 * @param {Coords} mapCoords the coordinates of the map
 * @param {Mountain[]} mountains list of all mountains
 * @param {Adventurer[]} adventurers list of all adventurers
 * @returns {boolean} true if the next move is a legal move, false otherwise
 */
export function isLegalMovement(
	nextCase: Coords,
	mapCoords: Coords,
	mountains: Mountain[],
	adventurers: Adventurer[]
): boolean {
	if (
		isInBoard(nextCase, mapCoords) &&
		!isMountain(nextCase, mountains) &&
		!isAdventurer(nextCase, adventurers)
	) {
		return true;
	} else {
		return false;
	}
}
