import * as fs from "fs";

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
	0 to n tresors each with 2 coords and a number
	1 to n adventurers each with 2 coords, a direction and a set of movements
*/
export function isEntryFileCorrectFormat(entryFile: string): boolean {
	let nMapCoords = 0;
	let nMountains = 0;
	let nTresors = 0;
	let nAdventurers = 0;
	let isCorrectFormat = false;

	const entryFileLines = entryFile.split("\r\n");

	entryFileLines.forEach((line: string) => {
		if (line.startsWith("C")) {
			const elems = line.split(" - ");
			if (elems.length == 3 && elems[1] >= "0" && elems[2] >= "0") {
				nMapCoords++;
			}
		}

		if (line.startsWith("M")) {
			const elems = line.split(" - ");
			if (elems.length == 3 && elems[1] >= "0" && elems[2] >= "0") {
				nMountains++;
			}
		}

		if (line.startsWith("T")) {
			const elems = line.split(" - ");
			if (elems.length == 4 && elems[1] >= "0" && elems[2] >= "0" && elems[3] >= "0") {
				nTresors++;
			}
		}

		if (line.startsWith("A")) {
			const elems = line.split(" - ");
			if (
				elems.length == 6 &&
				elems[2] >= "0" &&
				elems[3] >= "0" &&
				["N", "S", "W", "E"].includes(elems[4]) &&
				elems[5].length >= 0
			) {
				nAdventurers++;
			}

			if (nMapCoords == 1 && nMountains >= 0 && nTresors >= 0 && nAdventurers >= 1) {
				isCorrectFormat = true;
			}
		}
	});

	return isCorrectFormat;
}

// export function parseEntryFile(entryFile: string): Object {}
