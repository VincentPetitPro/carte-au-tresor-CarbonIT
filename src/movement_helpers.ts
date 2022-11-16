import Coords from "./coords";

// Function to check if next case is in board
export function isInBoard(advDir: string, advCoords: Coords, mapCoords: Coords): boolean {
	let ans: boolean = false;

	switch (advDir) {
		case "N":
			advCoords.y - 1 >= 0 ? (ans = true) : (ans = false);
			break;
		case "S":
			advCoords.y + 1 <= mapCoords.y ? (ans = true) : (ans = false);
			break;
		case "W":
			advCoords.x - 1 >= 0 ? (ans = true) : (ans = false);
			break;
		case "E":
			advCoords.x + 1 <= mapCoords.x ? (ans = true) : (ans = false);
			break;
	}

	return ans;
}

// Function to check if next case is a mountain

// Function to check if next case is an adventurers

// function to check if movement if legal
// function isLegalMovement(advDir: string, advMov: string, advCoords: Coords): boolean {
// 	switch (advDir) {
// 	    case "N":
//	        If next case is in board, not a mountain nor an adventurer
// 	        if () {
// 	    case "S":;
// 	    case "E":;
// 	    case "W":;
// 	return true;
// }
