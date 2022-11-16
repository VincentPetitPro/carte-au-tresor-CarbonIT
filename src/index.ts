import Coords from "./coords";
import { readEntryFile, parseEntryFile } from "./file_helpers";
import { isLegalMovement } from "./movement_helpers";

const directions = ["N", "E", "S", "W"];

const entryFile = readEntryFile("./entry.txt");
const fileObject = parseEntryFile(entryFile);

const mapCoords = fileObject.map;
const mountains = fileObject.mountains;
const treasures = fileObject.treasures;
const adventurers = fileObject.adventurers;
const nTurns = fileObject.adventurers.reduce((acc, curr) => {
	return acc < curr.moves.length ? curr.moves.length : acc;
}, 0);

console.log(fileObject);

// Main Loop
for (let i = 0; i < nTurns; i++) {
	let nextCase: Coords;
	for (let adventurer of adventurers) {
		if (adventurer.moves.length > 0) {
			switch (adventurer.moves[0]) {
				case "A":
					switch (adventurer.direction) {
						case "N":
							nextCase = new Coords(adventurer.x, adventurer.y + 1);
							if (isLegalMovement(nextCase, mapCoords, mountains, adventurers)) {
								adventurer.y++;
							}
							break;
						case "S":
							nextCase = new Coords(adventurer.x, adventurer.y - 1);
							if (isLegalMovement(nextCase, mapCoords, mountains, adventurers)) {
								adventurer.y--;
							}
							break;
						case "W":
							nextCase = new Coords(adventurer.x - 1, adventurer.y);
							if (isLegalMovement(nextCase, mapCoords, mountains, adventurers)) {
								adventurer.x--;
							}
							break;
						case "E":
							nextCase = new Coords(adventurer.x + 1, adventurer.y);
							if (isLegalMovement(nextCase, mapCoords, mountains, adventurers)) {
								adventurer.x++;
							}
							break;
					}
					// Check for treasures
					break;
				case "D":
					adventurer.direction =
						directions[(directions.indexOf(adventurer.direction) + 1) % 4];
					break;

				case "G":
					adventurer.direction =
						directions[(directions.indexOf(adventurer.direction) + 3) % 4];
					break;
			}
		}
	}
}
