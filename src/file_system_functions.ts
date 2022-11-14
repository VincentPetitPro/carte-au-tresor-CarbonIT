import * as fs from "fs";

export const readMap = (path: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		fs.readFile(path, "utf8", (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};
