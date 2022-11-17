import { describe, expect, test } from "@jest/globals";
import FileObject_DTO from "../src/fileObject_DTO";
import { playMap } from "../src/index";
import Coords from "../src/coords";
import Mountain from "../src/moutain";
import Treasure from "../src/treasure";
import Adventurer from "../src/adventurer";

describe("playMap", () => {
	test("should return the correct output", () => {
		const expectedOuputObject = new FileObject_DTO(
			new Coords(3, 4),
			[new Mountain(1, 0), new Mountain(2, 1)],
			[new Treasure(0, 3, 0), new Treasure(1, 3, 2)],
			[new Adventurer("Lara", 0, 3, "S", "", 3)]
		);
		expect(JSON.stringify(playMap())).toEqual(JSON.stringify(expectedOuputObject));
	});
});
