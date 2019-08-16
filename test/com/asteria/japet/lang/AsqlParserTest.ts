import 'mocha';
import { expect, assert } from 'chai';
import { AsteriaException } from 'asteria-gaia';

// Class to test:
import { AsqlParser } from '../../../../../src/com/asteria/japet/lang/AsqlParser';
import { AsqlToken } from '../../../../../src/com/asteria/japet/lang/AsqlToken';

// Utilities:
import * as utils from '../../../../../utils/test-utils/utilities/AsqlParserTestUtils';
import * as tokens from '../../../../../utils/test-utils/utilities/TokenTestUtils';

// Test:
describe('AsqlParser class test', ()=> {

    describe('#getClassName()', ()=> {
        it('should return the AsqlParser fully qualified class name', ()=> {
            const parser: AsqlParser = new AsqlParser();
            expect(parser.getClassName()).to.equal(utils.CLASS_NAME);
        });
    });
    
    describe('#parse()', ()=> {
        it('should return the correct list of tokens', ()=> {
            const parser: AsqlParser = new AsqlParser();
            const result: Array<AsqlToken> = parser.parse(utils.VALID_STRING);
            result.forEach((token: AsqlToken, index: number)=> {
                const tokenRef: AsqlToken = tokens.TOKEN_LIST[index];
                expect(token.type).to.equal(tokenRef.type);
                expect(token.value).to.equal(tokenRef.value);
            });
        });

        it('should throw an axception when string operand does not end with a quote character', ()=> {
            const parser: AsqlParser = new AsqlParser();
            const shouldThrowError: Function = () => {
                parser.parse(utils.INVALID_TEXT_STRING);
            };
            assert.throws(shouldThrowError, AsteriaException, 'asql string operand must end with a quote character');
        });
        
        it('should throw an axception when number operand ends with a quote character', ()=> {
            const parser: AsqlParser = new AsqlParser();
            const shouldThrowError: Function = () => {
                parser.parse(utils.INVALID_NUMBER_STRING);
            };
            assert.throws(shouldThrowError, AsteriaException, 'asql number operand must not end with a quote character');
        });
    });
});