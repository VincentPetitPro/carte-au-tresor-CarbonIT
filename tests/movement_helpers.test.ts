import { describe, expect, test } from "@jest/globals";
import Coords from "../src/coords";
import { isInBoard, isMountain, isAdventurer, isLegalMovement } from "../src/movement_helpers";

const mapCoords = new Coords(3, 3);
const mountains = [
	{ x: 1, y: 0 },
	{ x: 2, y: 1 },
];
const adventurers = [
	{ name: "Lara", x: 1, y: 1, direction: "S", moves: "AADADAGGA" },
	{ name: "Indiana", x: 0, y: 3, direction: "E", moves: "AADAADADDA" },
];

describe("isInBoard", () => {
	test("isInBoard returns true if the next case is in board.", () => {
		expect(isInBoard({ x: 0, y: 0 }, mapCoords)).toBe(true);
		expect(isInBoard({ x: 3, y: 3 }, mapCoords)).toBe(true);
		expect(isInBoard({ x: -1, y: 0 }, mapCoords)).toBe(false);
		expect(isInBoard({ x: 0, y: -1 }, mapCoords)).toBe(false);
		expect(isInBoard({ x: 4, y: 0 }, mapCoords)).toBe(false);
		expect(isInBoard({ x: 0, y: 4 }, mapCoords)).toBe(false);
	});
});

describe("isMountain", () => {
	test("isMountain returns true if next case is a mountain", () => {
		expect(isMountain(new Coords(0, 0), mountains)).toBe(false);
		expect(isMountain(new Coords(1, 0), mountains)).toBe(true);
		expect(isMountain(new Coords(2, 1), mountains)).toBe(true);
		expect(isMountain(new Coords(3, 3), mountains)).toBe(false);
	});
});

describe("isAdventurer", () => {
	test("isAdventurer returns true if next case is an adventurer", () => {
		expect(isAdventurer(new Coords(1, 1), adventurers)).toBe(true);
		expect(isAdventurer(new Coords(0, 3), adventurers)).toBe(true);
		expect(isAdventurer(new Coords(0, 0), adventurers)).toBe(false);
		expect(isAdventurer(new Coords(3, 3), adventurers)).toBe(false);
	});
});

describe("isLegalMovement", () => {
	test("isLegalMovement returns true if next case is legal", () => {
		// Adventurers
		expect(isLegalMovement(new Coords(1, 1), mapCoords, mountains, adventurers)).toBe(false);
		expect(isLegalMovement(new Coords(0, 3), mapCoords, mountains, adventurers)).toBe(false);
		// Mountains
		expect(isLegalMovement(new Coords(1, 0), mapCoords, mountains, adventurers)).toBe(false);
		expect(isLegalMovement(new Coords(2, 1), mapCoords, mountains, adventurers)).toBe(false);
		// Out of board
		expect(isLegalMovement(new Coords(-1, 0), mapCoords, mountains, adventurers)).toBe(false);
		expect(isLegalMovement(new Coords(0, -1), mapCoords, mountains, adventurers)).toBe(false);
		expect(isLegalMovement(new Coords(4, 0), mapCoords, mountains, adventurers)).toBe(false);
		expect(isLegalMovement(new Coords(0, 4), mapCoords, mountains, adventurers)).toBe(false);
		// Legals
		expect(isLegalMovement(new Coords(0, 0), mapCoords, mountains, adventurers)).toBe(true);
		expect(isLegalMovement(new Coords(3, 3), mapCoords, mountains, adventurers)).toBe(true);
	});
});
