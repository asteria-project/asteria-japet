import { CommonChar, AsteriaError, AsteriaErrorCode, AsteriaLogger, AbstractAsteriaObject, ErrorUtil } from 'asteria-gaia';
import { AsqlToken } from './AsqlToken';
import { AsqlTokenType } from './AsqlTokenType';
import { AsqlTokenBuilder } from '../util/AsqlTokenBuilder';
import { OuranosErrorBuilder, OuranosLogger } from 'asteria-ouranos';

// Static logger reference:
const LOGGER: AsteriaLogger = OuranosLogger.getLogger();

/**
 * The <code>AsqlParser</code> class allows to parse strings that represent queries as defined by the Asteria Query
 * Lanquage specification (AsQL).
 */
export class AsqlParser extends AbstractAsteriaObject {
    
    /**
     * The reference to a single quote character.
     */
    private static readonly SINGLE_QUOTE: string = '\'';
    
    /**
     * The reference to a double quote character.
     */
    private static readonly DOUBLE_QUOTE: string = '"';

    /**
     * Create a new <code>AsteriaDataBase</code> instance.
     */
    constructor() {
        super('com.asteria.japet.lang::AsqlParser');
    }

    /**
     * Parse the specified AsQL string and return the corresponding array of AsQL tokens.
     * 
     * @param {string} query the AsQL string to parse.
     * 
     * @returns {Array<AsqlToken>} an array of AsQL tokens.
     */
    public parse(query: string): Array<AsqlToken> {
        return this.createTokenList(query);
    }

    /**
     * Create and return a list of AsQL tokens from the specified query.
     * 
     * @param {string} query the query from which to build the list of AsQL tokens.
     * 
     * @returns {Array<AsqlToken>} an array of AsQL tokens.
     */
    private createTokenList(query: string): Array<AsqlToken> {
        const tokenList: Array<AsqlToken> = new Array<AsqlToken>();
        let cursor: number = 0;
        query.split(CommonChar.WHITE_SPACE).forEach((value: string)=> {
            if (value !== CommonChar.EMPTY) {
                const mod: number = cursor % 4;
                let val: string | number = value;
                let type: AsqlTokenType = null;
                if (mod === 0) {
                    type = AsqlTokenType.OPERAND;
                } else if (mod === 1) {
                    type = AsqlTokenType.OPERATOR;
                } else if (mod === 2) {
                    type = AsqlTokenType.OPERAND;
                    val = this.getValue(value);
                } else {
                    type = AsqlTokenType.CONDITION;
                }
                tokenList.push(
                    AsqlTokenBuilder.build(type, val)
                );
                cursor++;
            }
        });
        return tokenList;
    }

    /**
     * Return the well-formed operand value for specified input.
     * 
     * @param {string} value the input value to format.
     * 
     * @returns {string | number} a well-formed operand value based on the specified input.
     */
    private getValue(value: string): string | number {
        let result: string | number = null;
        if (value.startsWith(AsqlParser.SINGLE_QUOTE) || value.startsWith(AsqlParser.DOUBLE_QUOTE)) {
            if (value.endsWith(AsqlParser.SINGLE_QUOTE) || value.endsWith(AsqlParser.DOUBLE_QUOTE)) {
                result = value.substr(1, value.length - 2);
            } else {
                const error: AsteriaError = this.getValueError('asql string operand must end with a quote character');
                LOGGER.fatal(error.toString());
                throw ErrorUtil.errorToException(error);
            }
        } else {
            if (value.endsWith(AsqlParser.SINGLE_QUOTE) || value.endsWith(AsqlParser.DOUBLE_QUOTE)) {
                const error: AsteriaError = 
                    this.getValueError('asql number operand must not end with a quote character');
                LOGGER.fatal(error.toString());
                throw ErrorUtil.errorToException(error);
            }
            result = Number(value);
        }
        return result;
    }

    /**
     * Return an asteria error set with the specified message.
     * 
     * @param {string} errorMsg the message of the asteria error.
     * 
     * @returns {AsteriaError} an asteria error with the specified message.
     */
    private getValueError(errorMsg: string): AsteriaError {
        return OuranosErrorBuilder.getInstance().build(
            AsteriaErrorCode.INVALID_ASQL_OPERAND,
            this.getClassName(),
            errorMsg
        );
    }
}
