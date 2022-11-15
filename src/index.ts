import { readEntryFile, isEntryFileCorrectFormat } from "./entry_file_helpers";

const entryFile = readEntryFile("../entry.txt");
const isCorrectFormat = isEntryFileCorrectFormat(entryFile);

console.log(entryFile);
console.log(isCorrectFormat);
