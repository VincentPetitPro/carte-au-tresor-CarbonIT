export default class Adventurer {
    name: string;
    x: number;
    y: number;
    direction: string;
    moves: string;
    
    constructor(name: string, x: number, y: number, direction: string, moves: string) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.moves = moves;
    }
}