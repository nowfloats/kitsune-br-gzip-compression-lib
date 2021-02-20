import { gzipSync } from "zlib";
import { compress } from "brotli";

/**
 * @description
 * @param {any} data
 * @returns {any}
 */
const compressBR = async function (data) {
    return compress(data);
};

/**
 * @description
 * @param {any} data
 * @returns {any}
 */
const compressGZ = async function (data) {
    return gzipSync(data);
};

const _compressBR = compressBR;
export { _compressBR as compressBR };
const _compressGZ = compressGZ;
export { _compressGZ as compressGZ };
