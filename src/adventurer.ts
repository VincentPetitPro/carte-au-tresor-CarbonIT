export default class Adventurer {
	name: string;
	x: number;
	y: number;
	direction: string;
	moves: string;
	nTreasures: number;

	constructor(
		name: string,
		x: number,
		y: number,
		direction: string,
		moves: string,
		nTreasures: number
	) {
		this.name = name;
		this.x = x;
		this.y = y;
		this.direction = direction;
		this.moves = moves;
		this.nTreasures = nTreasures;
	}
}
