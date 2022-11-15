import { describe, expect, test } from "@jest/globals";
import { readEntryFile, isEntryFileCorrectFormat } from "../src/entry_file_helpers";

describe("reading and parsing map", () => {
	test("readMap returns the correct string to be parsed.", () => {
		expect(readEntryFile("tests/test_map.txt")).toBe("Test");
	});
	test("isEntryFileCorrectFormat returns true if the entry file is correctly formatted.", () => {
		expect(isEntryFileCorrectFormat("Test")).toBe(false);
		expect(isEntryFileCorrectFormat(readEntryFile("./entry.txt"))).toBe(true);
	});
});
