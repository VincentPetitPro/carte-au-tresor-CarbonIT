import Coords from "./coords";
import Mountain from "./moutain";
import Treasure from "./treasure";
import Adventurer from "./adventurer";

export default class FileObject_DTO {
	map: Coords;
	mountains: Mountain[];
	treasures: Treasure[];
	adventurers: Adventurer[];

	constructor(
		map: Coords,
		mountains: Mountain[],
		treasures: Treasure[],
		adventurers: Adventurer[]
	) {
		this.map = map;
		this.mountains = mountains;
		this.treasures = treasures;
		this.adventurers = adventurers;
	}
}
