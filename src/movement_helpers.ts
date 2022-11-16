import Adventurer from "./adventurer";
import Coords from "./coords";
import Mountain from "./moutain";

// Function to check if next case is in board
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

// Function to check if next case is a mountain
export function isMountain(nextCase: Coords, mountains: Mountain[]): boolean {
	return mountains.some((m) => {
		return JSON.stringify(m) === JSON.stringify(nextCase);
	});
}

// Function to check if next case is an adventurers
export function isAdventurer(nextCase: Coords, adventurers: Adventurer[]): boolean {
	return adventurers.some((a) => {
		return JSON.stringify(new Coords(a.x, a.y)) === JSON.stringify(nextCase);
	});
}

// function to check if movement if legal
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
