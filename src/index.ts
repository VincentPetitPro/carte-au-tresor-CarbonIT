import Coords from "./coords";
import { readEntryFile, parseEntryFile } from "./file_helpers";

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
	adventurers.forEach((adventurer) => {
		if (adventurer.moves.length > 0) {
			switch (adventurer.moves[0]) {
				case "A":
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
