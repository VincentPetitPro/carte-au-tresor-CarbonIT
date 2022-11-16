import { describe, expect, test } from "@jest/globals";
import Coords from "../src/coords";
import { isInBoard, isMountain } from "../src/movement_helpers";

describe("isInBoard", () => {
	test("isInBoard returns true if the next case is in board.", () => {
		expect(isInBoard({ x: 0, y: 0 }, new Coords(3, 3))).toBe(true);
		expect(isInBoard({ x: 3, y: 3 }, new Coords(3, 3))).toBe(true);
		expect(isInBoard({ x: -1, y: 0 }, new Coords(3, 3))).toBe(false);
		expect(isInBoard({ x: 0, y: -1 }, new Coords(3, 3))).toBe(false);
		expect(isInBoard({ x: 4, y: 0 }, new Coords(3, 3))).toBe(false);
		expect(isInBoard({ x: 0, y: 4 }, new Coords(3, 3))).toBe(false);
	});
});

const mountains = [
	{ x: 1, y: 0 },
	{ x: 2, y: 1 },
];
describe("isMountain", () => {
	test("isMountain returns true if next case is a mountain", () => {
		expect(isMountain(new Coords(0, 0), mountains)).toBe(false);
		expect(isMountain(new Coords(1, 0), mountains)).toBe(true);
		expect(isMountain(new Coords(2, 1), mountains)).toBe(true);
		expect(isMountain(new Coords(3, 3), mountains)).toBe(false);
	});
});
