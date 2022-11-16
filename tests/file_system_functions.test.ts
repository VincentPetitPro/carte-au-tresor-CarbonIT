import { describe, expect, test } from "@jest/globals";
import { readEntryFile, parseEntryFile } from "../src/file_helpers";
import FileObject_DTO from "../src/fileObject_DTO";

describe("reading and parsing map", () => {
	test("readMap returns the correct string to be parsed.", () => {
		expect(readEntryFile("tests/test_map.txt")).toBe("Test");
	});
	test("isEntryFileCorrectFormat returns true if the entry file is correctly formatted.", () => {
		expect(() => {
			parseEntryFile("Test");
		}).toThrow();

		const entryFileObj = new FileObject_DTO(
			{ x: 3, y: 4 },
			[
				{ x: 1, y: 0 },
				{ x: 2, y: 1 },
			],
			[
				{ x: 0, y: 3, nTreasures: 2 },
				{ x: 1, y: 3, nTreasures: 3 },
			],
			[{ name: "Lara", x: 1, y: 1, direction: "S", moves: "AADADAGGA" }]
		);
		{
		}
		expect(parseEntryFile(readEntryFile("entry.txt")).toString()).toBe(entryFileObj.toString());
	});
});
