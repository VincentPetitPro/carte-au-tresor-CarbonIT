import { describe, expect, test } from "@jest/globals";
import { readInputFile, parseInputFile, writeOutputFile } from "../src/file_helpers";
import * as fs from "fs";
import FileObject_DTO from "../src/fileObject_DTO";

const inputFileObj = new FileObject_DTO(
	{ x: 3, y: 4 },
	[
		{ x: 1, y: 0 },
		{ x: 2, y: 1 },
	],
	[
		{ x: 0, y: 3, nTreasures: 2 },
		{ x: 1, y: 3, nTreasures: 3 },
	],
	[{ name: "Lara", x: 1, y: 1, direction: "S", moves: "AADADAGGA", nTreasures: 0 }]
);

const inputFileString = `C​ - 3 - 4·
    M​ - 1 - 0·
    M​ - 2 - 1·
    T​ - 0 - 3 - 2·
    T​ - 1 - 3 - 3·
    A​ - Lara - 1 - 1 - S - AADADAGGA`.replace(/[^a-zA-Z0-9]/g, "");

describe("reading the map", () => {
	test("readMap returns the correct string to be parsed.", () => {
		const received = readInputFile("tests/test_input.txt").replace(/[^a-zA-Z0-9]/g, "");
		const expected = inputFileString;
		expect(received).toEqual(expected);
	});
});

describe("parsing the map", () => {
	test("isInputFileCorrectFormat returns true if the input file is correctly formatted.", () => {
		const received = parseInputFile(readInputFile("tests/test_input.txt")).toString();
		const expected = inputFileObj.toString();
		expect(() => {
			parseInputFile("Test");
		}).toThrow();
		expect(received).toBe(expected);
	});
});

describe("writing the map", () => {
	test("writeOutputFile writes the correct string to the output file.", () => {
		writeOutputFile("./tests/test_output.txt", inputFileObj);
		const received = fs
			.readFileSync("tests/test_output.txt", "utf8")
			.replace(/[^a-zA-Z0-9]/g, "");
		const expected = "C34M10M21T032T133ALara11S0";
		expect(received).toBe(expected);
	});
});
