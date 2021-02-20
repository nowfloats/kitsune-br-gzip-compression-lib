import { readdir, readFileSync, writeFile, existsSync, mkdirSync } from "fs";
import { dirname as _dirname } from "path";
import { gzipSync } from "zlib";
import { compress } from "brotli";
const srcFolder = "./src";
const brotliFolder = "./brotli/";
const gzipFolder = "./gzip/";

/**
 * @description
 * @param {any} srcFolder
 * @param {any} err
 * @param {any} fileNames
 * @returns {any}
 */
readdir(srcFolder, (err, fileNames) => {
    //Read all files from src folder and compress it
    fileNames.forEach(function (fileName) {
        //Brotli compression
        let brCompressed = compressBR(readFileSync("src/" + fileName));
        if (brCompressed) {
            writeToFile(brotliFolder + fileName, brCompressed);
        } else {
            console.log(`Brotli compression failed for ${fileName}`);
        }

        //GZIP compression
        let gzipCompressed = compressGZ(readFileSync("src/" + fileName));
        if (gzipCompressed) {
            writeToFile(gzipFolder + fileName, gzipCompressed);
        } else {
            console.log(`GZIP compression failed for ${fileName}`);
        }
    });
});

/**
 * @description Helper functions
 * @param {any} data
 * @returns {any}
 */
function compressBR(data) {
    try {
        let brCompressed = compress(data);
        if (brCompressed) {
            return Buffer.from(brCompressed.buffer);
        }
    } catch (ex) {
        console.log("[Error] Unable to compress brotli");
    }
    return null;
}

/**
 * @description
 * @param {any} data
 * @returns {any}
 */
function compressGZ(data) {
    try {
        return gzipSync(data);
    } catch (ex) {
        console.log("[Error] Unable to compress gzip");
    }
    return null;
}

/**
 * @description
 * @param {any} path
 * @param {any} data
 * @returns {any}
 */
function writeToFile(path, data) {
    ensureDirectoryExistence(path);
    writeFile(path, data, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File " + path);
    });
}

/**
 * @description
 * @param {any} filePath
 * @returns {any}
 */
function ensureDirectoryExistence(filePath) {
    var dirname = _dirname(filePath);
    if (existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    mkdirSync(dirname);
}
