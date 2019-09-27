

const fs = require("fs");
const path = require('path');
const zlib = require('zlib');
const brotli = require('brotli');
const srcFolder = "./src";
const brotliFolder = "./brotli/";
const gzipFolder = "./gzip/";

fs.readdir(srcFolder, (err, fileNames) => {
    //Read all files from src folder and compress it
    fileNames.forEach(function (fileName) {

        //Brotli compression
        let brCompressed = compressBR(fs.readFileSync("src/" + fileName));
        if (brCompressed) {
            writeToFile(brotliFolder + fileName, brCompressed);
        } else {
            console.log(`Brotli compression failed for ${fileName}`);
        }

        //GZIP compression
        let gzipCompressed = compressGZ(fs.readFileSync("src/" + fileName));
        if (gzipCompressed) {
            writeToFile(gzipFolder + fileName, gzipCompressed);
        } else {
            console.log(`GZIP compression failed for ${fileName}`);
        }
    });
});

//Helper functions
function compressBR(data) {
    try {
        let brCompressed = brotli.compress(data);
        if (brCompressed) {
            return Buffer.from(brCompressed.buffer);
        }
    } catch (ex) {
        console.log("[Error] Unable to compress brotly")
    }
    return null;
};

function compressGZ(data) {
    try {
        return zlib.gzipSync(data);
    } catch (ex) {
        console.log("[Error] Unable to compress gzip")
    }
    return null;
};

function writeToFile(path, data){
    ensureDirectoryExistence(path);
    fs.writeFile(path, data, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File " + path);
    });
}
function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
      return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}  