import { describe, expect, test } from "@jest/globals";
import FileObject_DTO from "../src/fileObject_DTO";
import { playMap } from "../src/index";
import Coords from "../src/coords";
import Mountain from "../src/moutain";
import Treasure from "../src/treasure";
import Adventurer from "../src/adventurer";

describe("playMap", () => {
	test("should return the correct output", () => {
		const inputFileObject = new FileObject_DTO(
			new Coords(3, 4),
			[new Mountain(1, 0), new Mountain(2, 1)],
			[new Treasure(0, 3, 2), new Treasure(1, 3, 3)],
			[new Adventurer("Lara", 0, 1, "S", "AADADAGGA", 0)]
		);

		const mapCoords = inputFileObject.map;
		const mountains = inputFileObject.mountains;
		const treasures = inputFileObject.treasures;
		const adventurers = inputFileObject.adventurers;
		const nTurns = inputFileObject.adventurers.reduce((acc, curr) => {
			return acc < curr.moves.length ? curr.moves.length : acc;
		}, 0);

		const expectedOuputObject = new FileObject_DTO(
			new Coords(3, 4),
			[new Mountain(1, 0), new Mountain(2, 1)],
			[new Treasure(1, 3, 2)],
			[new Adventurer("Lara", 1, 3, "S", "", 3)]
		);

		expect(playMap()).toEqual(JSON.stringify(expectedOuputObject));
	});
});
