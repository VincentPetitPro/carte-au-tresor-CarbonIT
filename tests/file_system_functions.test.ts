import { describe, expect, test } from "@jest/globals";
import { readEntryFile, parseEntryFile } from "../src/entry_file_helpers";

describe("reading and parsing map", () => {
	test("readMap returns the correct string to be parsed.", () => {
		expect(readEntryFile("tests/test_map.txt")).toBe("Test");
	});
	test("isEntryFileCorrectFormat returns true if the entry file is correctly formatted.", () => {
		expect(parseEntryFile("Test")).toBe(false);
		expect(parseEntryFile(readEntryFile("./entry.txt"))).toBe(true);
	});
});
