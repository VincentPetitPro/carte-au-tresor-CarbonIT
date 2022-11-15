import { readEntryFile, parseEntryFile } from "./entry_file_helpers";

const entryFile = readEntryFile("../entry.txt");
const fileObject = parseEntryFile(entryFile);
const map = fileObject.map;

console.log(map);
