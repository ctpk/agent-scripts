// ==UserScript==
// @name         [01005CA01580E000] Persona 5 Royal
// @version      0.1 - 1.0.0 (base)
// @author       Koukdw & [DC]
// @description  Yuzu
// * Atlus
// * 
// ==/UserScript==
const gameVer = '1.0.0';

const { setHook } = require('./libYuzu.js');
const { readString, createTable } = require('./libPCAtlus.js');

const mainHandler = trans.send(handler, '200+'); // join 200ms
const table = createTable('P5R');
table[0xa] = ' '; // single line

setHook({
    '1.0.0': {
        0x8ec4db0: mainHandler
    }
}[globalThis.gameVer ?? gameVer]);

function handler(regs) {
    const type = regs[2].value & 0xFFFF;
    //console.log(ptr(this.returnAddress) + ' ' + type);
    if (type === 3 || type === 4) return null;

    const address = regs[1].value;
    //console.log(hexdump(address, { header: false, ansi: false, length: 0x50 }));
    const s = readString(address, table);
    return s;
}