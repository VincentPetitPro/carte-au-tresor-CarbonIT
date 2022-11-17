import Coords from "./coords";
import FileObject_DTO from "./fileObject_DTO";
import { readInputFile, parseInputFile, writeOutputFile } from "./file_helpers";
import { isLegalMovement, isTreasure } from "./movement_helpers";

/**
 * @returns {FileObject_DTO} an object containing the map, mountains, treasures and adventurers.
 * @description Main Loop: moves the adventurers until they reach the end of their movements.
 */
export function playMap(): FileObject_DTO {
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

	for (let i = 0; i < nTurns; i++) {
		let nextCase = new Coords(-1, 1);
		for (let adventurer of adventurers) {
			if (adventurer.moves.length > 0) {
				switch (adventurer.moves[0]) {
					case "A":
						switch (adventurer.direction) {
							case "N":
								nextCase = new Coords(adventurer.x, adventurer.y - 1);
								if (isLegalMovement(nextCase, mapCoords, mountains, adventurers)) {
									adventurer.y--;
								}
								break;
							case "S":
								nextCase = new Coords(adventurer.x, adventurer.y + 1);
								if (isLegalMovement(nextCase, mapCoords, mountains, adventurers)) {
									adventurer.y++;
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
				if (isTreasure(nextCase, treasures)) {
					treasures[treasures.findIndex((t) => t.x === nextCase.x && t.y === nextCase.y)]
						.nTreasures--;
					adventurer.nTreasures++;
				}
				adventurers[adventurers.indexOf(adventurer)].moves = adventurer.moves.slice(1);
			}
		}
	}

	return new FileObject_DTO(mapCoords, mountains, treasures, adventurers);
}

const output = playMap();

writeOutputFile("./output.txt", output);
