"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteria_gaia_1 = require("asteria-gaia");
const AsqlTokenType_1 = require("./AsqlTokenType");
const AsqlTokenBuilder_1 = require("../util/AsqlTokenBuilder");
const asteria_ouranos_1 = require("asteria-ouranos");
const LOGGER = asteria_ouranos_1.OuranosLogger.getLogger();
class AsqlParser extends asteria_gaia_1.AbstractAsteriaObject {
    constructor() {
        super('com.asteria.japet.lang::AsqlParser');
    }
    parse(query) {
        return this.createTokenList(query);
    }
    createTokenList(query) {
        const tokenList = new Array();
        let cursor = 0;
        query.split(asteria_gaia_1.CommonChar.WHITE_SPACE).forEach((value) => {
            if (value !== asteria_gaia_1.CommonChar.EMPTY) {
                const mod = cursor % 4;
                let val = value;
                let type = null;
                if (mod === 0) {
                    type = AsqlTokenType_1.AsqlTokenType.OPERAND;
                }
                else if (mod === 1) {
                    type = AsqlTokenType_1.AsqlTokenType.OPERATOR;
                }
                else if (mod === 2) {
                    type = AsqlTokenType_1.AsqlTokenType.OPERAND;
                    val = this.getValue(value);
                }
                else {
                    type = AsqlTokenType_1.AsqlTokenType.CONDITION;
                }
                tokenList.push(AsqlTokenBuilder_1.AsqlTokenBuilder.build(type, val));
                cursor++;
            }
        });
        return tokenList;
    }
    getValue(value) {
        let result = null;
        if (value.startsWith(AsqlParser.SINGLE_QUOTE) || value.startsWith(AsqlParser.DOUBLE_QUOTE)) {
            if (value.endsWith(AsqlParser.SINGLE_QUOTE) || value.endsWith(AsqlParser.DOUBLE_QUOTE)) {
                result = value.substr(1, value.length - 2);
            }
            else {
                const error = this.getValueError('asql string operand must end with a quote character');
                LOGGER.fatal(error.toString());
                throw asteria_gaia_1.ErrorUtil.errorToException(error);
            }
        }
        else {
            if (value.endsWith(AsqlParser.SINGLE_QUOTE) || value.endsWith(AsqlParser.DOUBLE_QUOTE)) {
                const error = this.getValueError('asql number operand must not end with a quote character');
                LOGGER.fatal(error.toString());
                throw asteria_gaia_1.ErrorUtil.errorToException(error);
            }
            result = Number(value);
        }
        return result;
    }
    getValueError(errorMsg) {
        return asteria_ouranos_1.OuranosErrorBuilder.getInstance().build(asteria_gaia_1.AsteriaErrorCode.INVALID_ASQL_OPERAND, this.getClassName(), errorMsg);
    }
}
AsqlParser.SINGLE_QUOTE = '\'';
AsqlParser.DOUBLE_QUOTE = '"';
exports.AsqlParser = AsqlParser;
