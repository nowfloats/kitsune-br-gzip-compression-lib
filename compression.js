import { writeFile, existsSync, mkdirSync } from "fs";
import { dirname as _dirname } from "path";
import { gzipSync } from "zlib";
import { compress } from "brotli";

/**
 * @description Helper functions
 * @param {any} data
 * @returns {any}
 */
export const compressBR = (data) => {
    try {
        let brCompressed = compress(data);
        if (brCompressed) {
            return Buffer.from(brCompressed.buffer);
        }
    } catch (ex) {
        console.log("[Error] Unable to compress brotli");
    }
    return null;
};

/**
 * @description
 * @param {any} data
 * @returns {any}
 */
export const compressGZ = (data) => {
    try {
        return gzipSync(data);
    } catch (ex) {
        console.log("[Error] Unable to compress gzip");
    }
    return null;
};

/**
 * @description
 * @param {any} path
 * @param {any} data
 * @returns {any}
 */
export const writeToFile = (path, data) => {
    ensureDirectoryExistence(path);
    writeFile(path, data, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File " + path);
    });
};

/**
 * @description
 * @param {any} filePath
 * @returns {any}
 */
export const ensureDirectoryExistence = (filePath) => {
    var dirname = _dirname(filePath);
    if (existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    mkdirSync(dirname);
};
