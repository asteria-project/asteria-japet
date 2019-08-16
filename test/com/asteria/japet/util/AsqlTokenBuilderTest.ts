
import 'mocha';
import { expect } from 'chai';

// Class to test:
import { AsqlTokenBuilder } from '../../../../../src/com/asteria/japet/util/AsqlTokenBuilder';
import { AsqlToken } from '../../../../../src/com/asteria/japet/lang/AsqlToken';

// Utilities:

import * as utils from '../../../../../utils/test-utils/utilities/AsqlTokenBuilderTestUtils';

// Test:
describe('AsqlTokenBuilder class test', () => {

    describe('#build()', () => {
        it('should return the AsqlTokenBuilder fully qualified class name', ()=> {
            const builder: AsqlTokenBuilder = new AsqlTokenBuilder();
            expect(builder.getClassName()).to.equal(utils.CLASS_NAME);
        });
    });

    describe('#build()', () => {
        it('should create an AsqlToken object with the same type as the type parameter', () => {
            const result: AsqlToken = AsqlTokenBuilder.build(utils.TYPE, utils.VALUE);
            expect(result.type).to.equal(utils.TYPE);
        });
        
        it('should create an AsqlToken object with the same value as the value parameter', () => {
            const result: AsqlToken = AsqlTokenBuilder.build(utils.TYPE, utils.VALUE);
            expect(result.value).to.equal(utils.VALUE);
        });
    });
});