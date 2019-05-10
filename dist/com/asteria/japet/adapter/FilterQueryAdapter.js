"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteria_gaia_1 = require("asteria-gaia");
const AsqlTokenType_1 = require("../lang/AsqlTokenType");
const asteria_ouranos_1 = require("asteria-ouranos");
const LOGGER = asteria_ouranos_1.OuranosLogger.getLogger();
class FilterQueryAdapter extends asteria_gaia_1.AbstractAsteriaObject {
    constructor() {
        super('com.asteria.japet.lang::FilterQueryAdapter');
        this._condition = null;
        this._filters = null;
        this._filterAcc = null;
    }
    adapt(tokens) {
        this._filters = new Array();
        this._filterAcc = new Array();
        tokens.forEach((token) => {
            if (token.type === AsqlTokenType_1.AsqlTokenType.CONDITION) {
                this.checkAndSetCondition(token);
            }
            else {
                this.checkAndAddToken(token);
            }
        });
        if (!this._condition) {
            this._condition = asteria_gaia_1.FilterCondition.OR;
        }
        return {
            condition: this._condition,
            filters: this._filters
        };
    }
    checkAndSetCondition(token) {
        const condition = token.value;
        let errorString = asteria_gaia_1.CommonChar.EMPTY;
        if (condition !== asteria_gaia_1.FilterCondition.AND && condition !== asteria_gaia_1.FilterCondition.OR) {
            errorString = asteria_ouranos_1.OuranosErrorBuilder.getInstance().build(asteria_gaia_1.AsteriaErrorCode.INVALID_ASQL_CONDITION, this.getClassName(), `filter condition must be AND or OR; found '${condition}'`).toString();
            LOGGER.fatal(errorString);
            throw new SyntaxError(errorString);
        }
        if (!this._condition) {
            this._condition = condition;
        }
        else {
            if (this._condition !== condition) {
                errorString = asteria_ouranos_1.OuranosErrorBuilder.getInstance().build(asteria_gaia_1.AsteriaErrorCode.INVALID_ASQL_CONDITION, this.getClassName(), 'filters support only one type of condition clause').toString();
                LOGGER.fatal(errorString);
                throw new SyntaxError(errorString);
            }
        }
    }
    checkAndAddToken(token) {
        this._filterAcc.push(token);
        if (this._filterAcc.length === 3) {
            const filter = {
                property: this._filterAcc[0].value,
                operator: this._filterAcc[1].value,
                value: this._filterAcc[2].value,
            };
            this._filters.push(filter);
            this._filterAcc.splice(0);
        }
    }
}
exports.FilterQueryAdapter = FilterQueryAdapter;
