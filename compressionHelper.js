const zlib = require('zlib');
const brotli = require('brotli');

const compressBR = async function (data){
    return brotli.compress(data);
};

const compressGZ = async function (data) {
    return zlib.gzipSync(data);
};

exports.compressBR = compressBR;
exports.compressGZ = compressGZ;