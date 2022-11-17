# Carte au trésors Carbon IT

## Credit

-   [Carbon IT](https://carbon-it.fr/)

## Installation

```bash
git clone https://github.com/VincentPetitPro/carte-au-tresor-CarbonIT.git
cd carte-au-tresor-CarbonIT
```

## Run app

```bash
npx nodemon ./src/index.ts
```

## Run tests

```bash
npm test
```

## Input map

The map used by the application is named `input.txt` and is located at the root of the projetc. It follows the following schema.

```text
C - x - y
M - x - y
T - x - y - n
A - name - x - y - D - ADG
```

The `C-line` gives the latitude `x` and longitude `y` of the map. The input file can only have `1` C-line.<br>
The `M-line` represents a moutain and gives its latitude `x` and longitude `y`. The input file can have from `0 to n` M-lines.<br>
The `T-line` represents a treasure and gives its latitude `x`, longitude `y` and the number of treasures `n` on these coordinates. The input file can have from `0 to n` T-lines.<br>
The `A-line` represents an adventurer and gives its `name`, latitude `x`, longitude `y`, the direction `D` it is facing amongst `N | S | W | E` and finally it's movements `ADG` amongst `A | D | G`.<br>
`A` means `forward` ; `D` means `turn right` and `G` means `turn left`. `D & G` do not move the adventurer but only change its direction.

Here is an example of an `input.txt` :

```text
C​ - 3 - 4
M​ - 1 - 0
M​ - 2 - 1
T​ - 0 - 3 - 2
T​ - 1 - 3 - 3
A​ - Lara - 1 - 1 - S - AADADAGGA
```
