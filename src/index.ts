import Coords from "./coords";
import FileObject_DTO from "./fileObject_DTO";
import { readInputFile, parseInputFile, writeOutputFile } from "./file_helpers";
import { isLegalMovement } from "./movement_helpers";

const directions = ["N", "E", "S", "W"];

const inputFile = readInputFile("./input.txt");
const inputFileObject = parseInputFile(inputFile);

const mapCoords = inputFileObject.map;
const mountains = inputFileObject.mountains;
const treasures = inputFileObject.treasures;
const adventurers = inputFileObject.adventurers;
const nTurns = inputFileObject.adventurers.reduce((acc, curr) => {
	return acc < curr.moves.length ? curr.moves.length : acc;
}, 0);

console.log(inputFileObject);

export function playMap(): void {
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
									adventurers[adventurers.indexOf(adventurer)].y++;
									adventurer.y++;
								}
								break;
							case "S":
								nextCase = new Coords(adventurer.x, adventurer.y - 1);
								if (isLegalMovement(nextCase, mapCoords, mountains, adventurers)) {
									adventurers[adventurers.indexOf(adventurer)].y--;
									adventurer.y--;
								}
								break;
							case "W":
								nextCase = new Coords(adventurer.x - 1, adventurer.y);
								if (isLegalMovement(nextCase, mapCoords, mountains, adventurers)) {
									adventurers[adventurers.indexOf(adventurer)].x--;
									adventurer.x--;
								}
								break;
							case "E":
								nextCase = new Coords(adventurer.x + 1, adventurer.y);
								if (isLegalMovement(nextCase, mapCoords, mountains, adventurers)) {
									adventurers[adventurers.indexOf(adventurer)].x++;
									adventurer.x++;
								}
								break;
						}
						// Check for treasures
						// Should already have an output different from the input
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
}

playMap();

writeOutputFile("./output.txt", new FileObject_DTO(mapCoords, mountains, treasures, adventurers));
