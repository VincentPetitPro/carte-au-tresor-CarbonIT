import * as fs from "fs";
import Coords from "./coords";
import Mountain from "./moutain";
import Treasure from "./treasure";
import Adventurer from "./adventurer";
import FileObject_DTO from "./fileObject_DTO";

/**
 * Reads the entry file and returns the contents as a string.
 * In a real world application, I would use fs.readFile instead of fs.readFileSync to avoid blocking the event loop.
 */
export function readEntryFile(filePath: string): string {
	return fs.readFileSync(filePath, "utf8");
}

// Create function to test if entry file is the correct format
/*
	Must have a C line with 2 coords
	0 to n montains each with 2 coords
	0 to n treasures each with 2 coords and a number
	1 to n adventurers each with 2 coords, a direction and a set of movements
*/
export function parseEntryFile(entryFile: string): FileObject_DTO {
	const mapCoords: Coords[] = [];
	const mountainsCoords: Mountain[] = [];
	const treasuresCoords: Treasure[] = [];
	const adventurers: Adventurer[] = [];

	const entryFileLines = entryFile.split("\r\n");

	entryFileLines.forEach((line: string) => {
		if (line.startsWith("C")) {
			const elems = line.split(" - ");
			if (elems.length === 3 && parseInt(elems[1]) >= 0 && parseInt(elems[2]) >= 0) {
				mapCoords.push({
					x: parseInt(elems[1]),
					y: parseInt(elems[2]),
				});
			} else {
				throw new Error("Entry file is not in the correct format: C line is incorrect");
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
					"Entry file is not in the correct format: M line " + line + " is incorrect"
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
					"Entry file is not in the correct format: T line " + line + " is incorrect"
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
					"Entry file is not in the correct format: A line " + line + " is incorrect"
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
		throw new Error("Entry file is not in the correct format");
	}

	const entryFileObject = new FileObject_DTO(
		mapCoords[0],
		mountainsCoords,
		treasuresCoords,
		adventurers
	);

	return entryFileObject;
}

// TODO: Create function to write the output file
