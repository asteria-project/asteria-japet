"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteria_gaia_1 = require("asteria-gaia");
class AsqlTokenImpl extends asteria_gaia_1.AbstractAsteriaObject {
    constructor(type, value) {
        super('com.asteria.japet.core::AsqlTokenImpl');
        this.type = type;
        this.value = value;
    }
}
exports.AsqlTokenImpl = AsqlTokenImpl;
