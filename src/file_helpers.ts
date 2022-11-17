import * as fs from "fs";
import Coords from "./coords";
import Mountain from "./moutain";
import Treasure from "./treasure";
import Adventurer from "./adventurer";
import FileObject_DTO from "./fileObject_DTO";

/**
 * @param {string} filePath path to the file to be read.
 * @description
 * Reads the input file and returns the contents as a string.
 * In a real world application, I would use fs.readFile instead of fs.readFileSync to avoid blocking the event loop.
 */
export function readInputFile(filePath: string): string {
	return fs.readFileSync(filePath, "utf8");
}

/**
 *
 * @param {string} inputFile the contents of the input file gotten from readInputFile().
 * @returns	{FileObject_DTO} an object containing the map, mountains, treasures and adventurers.
 * @description
 * Parses the input file and returns an object containing the map, mountains, treasures and adventurers.
 */
export function parseInputFile(inputFile: string): FileObject_DTO {
	const mapCoords: Coords[] = [];
	const mountainsCoords: Mountain[] = [];
	const treasuresCoords: Treasure[] = [];
	const adventurers: Adventurer[] = [];

	const inputFileLines = inputFile.split("\r\n");

	inputFileLines.forEach((line: string) => {
		if (line.startsWith("C")) {
			const elems = line.split(" - ");
			if (elems.length === 3 && parseInt(elems[1]) >= 0 && parseInt(elems[2]) >= 0) {
				mapCoords.push({
					x: parseInt(elems[1]),
					y: parseInt(elems[2]),
				});
			} else {
				throw new Error("Input file is not in the correct format: C line is incorrect");
			}
		}

		if (line.startsWith("M")) {
			const elems = line.split(" - ");
			if (elems.length == 3 && parseInt(elems[1]) >= 0 && parseInt(elems[2]) >= 0) {
				mountainsCoords.push({
					x: parseInt(elems[1]),
					y: parseInt(elems[2]),
				});
			} else {
				throw new Error(
					"Input file is not in the correct format: M line " + line + " is incorrect"
				);
			}
		}

		if (line.startsWith("T")) {
			const elems = line.split(" - ");
			if (
				elems.length === 4 &&
				parseInt(elems[1]) >= 0 &&
				parseInt(elems[2]) >= 0 &&
				parseInt(elems[3]) >= 0
			) {
				treasuresCoords.push({
					x: parseInt(elems[1]),
					y: parseInt(elems[2]),
					nTreasures: parseInt(elems[3]),
				});
			} else {
				throw new Error(
					"Input file is not in the correct format: T line " + line + " is incorrect"
				);
			}
		}

		if (line.startsWith("A")) {
			const elems = line.split(" - ");
			if (
				elems.length == 6 &&
				parseInt(elems[2]) >= 0 &&
				parseInt(elems[3]) >= 0 &&
				["N", "S", "W", "E"].includes(elems[4]) &&
				elems[5].length >= 0
			) {
				adventurers.push({
					name: elems[1],
					x: parseInt(elems[2]),
					y: parseInt(elems[3]),
					direction: elems[4],
					moves: elems[5],
				});
			} else {
				throw new Error(
					"Input file is not in the correct format: A line " + line + " is incorrect"
				);
			}
		}
	});

	if (
		mapCoords.length !== 1 ||
		mountainsCoords.length < 0 ||
		treasuresCoords.length < 0 ||
		adventurers.length < 1
	) {
		throw new Error("Input file is not in the correct format");
	}

	const inputFileObject = new FileObject_DTO(
		mapCoords[0],
		mountainsCoords,
		treasuresCoords,
		adventurers
	);

	return inputFileObject;
}

/**
 * @param {FileObject_DTO} fileObject the object containing the map, mountains, treasures and adventurers.
 * @param {string} filePath path to the file to be written.
 * @description
 * Writes the output file after the adventurers have completed their moves.
 * In a real world application, I would use fs.writeFile instead of fs.writeFileSync to avoid blocking the event loop.
 */
export function writeOutputFile(filePath: string, fileObject: FileObject_DTO): void {
	let CLine = "";
	let MLines: string[] = [];
	let TLines: string[] = [];
	let ALines: string[] = [];

	CLine = `C - ${fileObject.map.x} - ${fileObject.map.y}\r\n`;

	for (let mountain of fileObject.mountains) {
		MLines.push(`M - ${mountain.x} - ${mountain.y}\r\n`);
	}

	for (let treasure of fileObject.treasures) {
		TLines.push(`T - ${treasure.x} - ${treasure.y} - ${treasure.nTreasures}\r\n`);
	}

	for (let adventurer of fileObject.adventurers) {
		ALines.push(
			`A - ${adventurer.name} - ${adventurer.x} - ${adventurer.y} - ${adventurer.direction} - ${adventurer.moves}\r\n`
		);
	}

	const output = CLine + MLines.join("") + TLines.join("") + ALines.join("").trimEnd();

	fs.writeFileSync(filePath, output);
}
