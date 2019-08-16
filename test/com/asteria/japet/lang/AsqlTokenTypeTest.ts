import 'mocha';
import { expect } from 'chai';

// Class to test:
import { AsqlTokenType } from '../../../../../src/com/asteria/japet/lang/AsqlTokenType';

// Utilities:
import * as utils from '../../../../../utils/test-utils/utilities/AsqlTokenTypeTestUtils';

// Test:
describe('AsqlTokenType enum test', () => {

    describe('#OPERATOR', () => {
        it('OPERATOR should equals 0', () => {
            expect(AsqlTokenType.OPERATOR).to.equal(utils.OPERATOR);
        });
    });

    describe('#OPERAND', () => {
        it('OPERAND should equals 1', () => {
            expect(AsqlTokenType.OPERAND).to.equal(utils.OPERAND);
        });
    });

    describe('#CONDITION', () => {
        it('CONDITION should equals 2', () => {
            expect(AsqlTokenType.CONDITION).to.equal(utils.CONDITION);
        });
    });
});