"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AsqlTokenImpl_1 = require("../core/AsqlTokenImpl");
const asteria_gaia_1 = require("asteria-gaia");
class AsqlTokenBuilder extends asteria_gaia_1.AbstractAsteriaObject {
    constructor() {
        super('com.asteria.japet.lang::AsqlTokenBuilder');
    }
    static build(type, value) {
        return new AsqlTokenImpl_1.AsqlTokenImpl(type, value);
    }
}
exports.AsqlTokenBuilder = AsqlTokenBuilder;
