import 'mocha';
import { expect } from 'chai';
import { AsqlToken } from '../../../../../src/com/asteria/japet/lang/AsqlToken';

// Class to test:
import { AsqlTokenImpl } from '../../../../../src/com/asteria/japet/core/AsqlTokenImpl';

// Utilities:
import * as utils from '../../../../../utils/test-utils/utilities/AsqlTokenImplTestUtils';

// Test:
describe('AsqlTokenImpl class test', ()=> {

    describe('#getClassName()', ()=> {
        it('should return the AsqlTokenImpl fully qualified class name', ()=> {
            const token: AsqlTokenImpl = new AsqlTokenImpl(utils.TYPE, utils.VALUE);
            expect(token.getClassName()).to.equal(utils.CLASS_NAME);
        });
    });
    
    describe('constructor', ()=> {
        it('should create an AsqlTokenImpl object with the same type as passed as constructor parameter', ()=> {
            const token: AsqlToken = new AsqlTokenImpl(utils.TYPE, utils.VALUE);
            expect(token.type).to.equal(utils.TYPE);
        });

        it('should create an AsqlTokenImpl object with the same value as passed as constructor parameter', ()=> {
            const token: AsqlToken = new AsqlTokenImpl(utils.TYPE, utils.VALUE);
            expect(token.value).to.equal(utils.VALUE);
        });
    });
});