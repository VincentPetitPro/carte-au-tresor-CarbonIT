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
export function isAdventurer() {}

// function to check if movement if legal
// function isLegalMovement(nextCase: Coords, mapCoords: Coords, adventurers: Adventurer[]): boolean {
// 	switch (advDir) {
// 	    case "N":
//	        If next case is in board, not a mountain nor an adventurer
// 	        if () {
// 	    case "S":;
// 	    case "E":;
// 	    case "W":;
// 	return true;
// }
