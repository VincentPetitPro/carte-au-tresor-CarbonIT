import { describe, expect, test } from "@jest/globals";
import Adventurer from "../src/adventurer";
import Coords from "../src/coords";
import Mountain from "../src/moutain";
import {
	isInBoard,
	isMountain,
	isAdventurer,
	isLegalMovement,
	isTreasure,
} from "../src/movement_helpers";
import Treasure from "../src/treasure";

const mapCoords = new Coords(3, 3);
const mountains = [new Mountain(1, 0), new Mountain(2, 1)];
const treasures = [new Treasure(0, 3, 2), new Treasure(1, 3, 3)];
const adventurers = [
	new Adventurer("Lara", 1, 1, "S", "AADADAGGA", 0),
	new Adventurer("Indiana", 0, 3, "E", "AADAADADDA", 0),
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

describe("isTreasure", () => {
	test("isTreasure returns true if next case is a treasure", () => {
		expect(isTreasure(new Coords(0, 0), treasures)).toBe(false);
		expect(isTreasure(new Coords(1, 3), treasures)).toBe(true);
		expect(isTreasure(new Coords(2, 1), treasures)).toBe(false);
		expect(isTreasure(new Coords(3, 3), treasures)).toBe(false);
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
