import Coords from "./coords";
import { readEntryFile, parseEntryFile } from "./file_helpers";
import { isInBoard, isMountain, isAdventurer, isLegalMovement } from "./movement_helpers";

const entryFile = readEntryFile("../entry.txt");
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
	adventurers.forEach((adventurer) => {
		if (adventurer.moves.length > 0) {
			nextCase = new Coords(adventurer.x, adventurer.y);
			switch (adventurer.moves[0]) {
				case "A":
					switch (adventurer.dir) {
						case "N":
							isLegalMovement(nextCase, mapCoords, adventurers);
							break;
						case "S":
							break;
						case "W":
							break;
						case "E":
							break;
					}

					if (
						isLegalMovement(adventurer.direction, adventurer.moves[0], {
							x: adventurer.x,
							y: adventurer.y,
						})
					) {
						// move forward
					}
				case "D":
				case "G":
			}
		}
	});
}
