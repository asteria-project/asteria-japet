/*!
 * This module constains a token list used by test suite.
 */

import { AsqlToken } from '../../../src/com/asteria/japet/lang/AsqlToken';
import { AsqlTokenType } from '../../../src/com/asteria/japet/lang/AsqlTokenType';

// Utilities:
export const TOKEN_1: AsqlToken = {
    type: AsqlTokenType.OPERAND,
    value: 'Population'
};
export const TOKEN_2: AsqlToken = {
    type: AsqlTokenType.OPERATOR,
    value: '>'
};
export const TOKEN_3: AsqlToken = {
    type: AsqlTokenType.OPERAND,
    value: 1000000
};
export const TOKEN_4: AsqlToken = {
    type: AsqlTokenType.CONDITION,
    value: 'AND'
};
export const TOKEN_5: AsqlToken = {
    type: AsqlTokenType.OPERAND,
    value: 'Country'
};
export const TOKEN_6: AsqlToken = {
    type: AsqlTokenType.OPERATOR,
    value: '='
};
export const TOKEN_7: AsqlToken = {
    type: AsqlTokenType.OPERAND,
    value: 'us'
};
export const TOKEN_LIST: Array<AsqlToken> = [ TOKEN_1, TOKEN_2, TOKEN_3, TOKEN_4, TOKEN_5, TOKEN_6, TOKEN_7 ];