import { describe, expect, test } from "@jest/globals";
import { isInBoard } from "../src/movement_helpers";

describe("isInBoard", () => {
	test("isInBoard returns true if the next case is in board.", () => {
		expect(isInBoard("N", { x: 0, y: 3 }, { x: 3, y: 3 })).toBe(true);
		expect(isInBoard("N", { x: 0, y: 0 }, { x: 3, y: 3 })).toBe(false);
		expect(isInBoard("S", { x: 0, y: 0 }, { x: 3, y: 3 })).toBe(true);
		expect(isInBoard("S", { x: 0, y: 3 }, { x: 3, y: 3 })).toBe(false);
		expect(isInBoard("E", { x: 0, y: 0 }, { x: 3, y: 3 })).toBe(true);
		expect(isInBoard("E", { x: 3, y: 0 }, { x: 3, y: 3 })).toBe(false);
		expect(isInBoard("W", { x: 3, y: 0 }, { x: 3, y: 3 })).toBe(true);
		expect(isInBoard("W", { x: 0, y: 0 }, { x: 3, y: 3 })).toBe(false);
	});
});
