import { describe, expect, test } from "@jest/globals";
import { readMap } from "../src/file_system_functions";

describe("readMap", () => {
	test("readMap returns the correct string to be parsed.", () => {
		expect(readMap("tests/test_map.txt")).resolves.toBe("Test");
	});
});
