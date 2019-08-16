import 'mocha';
import { expect, assert } from 'chai';
import { AsqlFilterDefinition } from '../../../../../src/com/asteria/japet/lang/AsqlFilterDefinition';
import { FilterCondition, AsteriaException } from 'asteria-gaia';
import { AsqlToken } from '../../../../../src/com/asteria/japet/lang/AsqlToken';
import { AsqlTokenType } from '../../../../../src/com/asteria/japet/lang/AsqlTokenType';

// Class to test:
import { FilterQueryAdapter } from '../../../../../src/com/asteria/japet/adapter/FilterQueryAdapter';

// Utilities:
import * as utils from '../../../../../utils/test-utils/utilities/FilterQueryAdapterTestUtils';
import * as tokens from '../../../../../utils/test-utils/utilities/TokenTestUtils';

// Test:
describe('FilterQueryAdapter class test', ()=> {

    describe('#getClassName()', ()=> {
        it('should return the FilterQueryAdapter fully qualified class name', ()=> {
            const adapter: FilterQueryAdapter = new FilterQueryAdapter();
            expect(adapter.getClassName()).to.equal(utils.CLASS_NAME);
        });
    });
    
    describe('#adapt()', ()=> {
        it('should create an AsqlFilterDefinition object with the correct number of filters', ()=> {
            const adapter: FilterQueryAdapter = new FilterQueryAdapter();
            const result: AsqlFilterDefinition = adapter.adapt(tokens.TOKEN_LIST);
            expect(result.filters.length).to.equal(2);
        });

        it('should create an AsqlFilterDefinition object with the registered FilterCondition', ()=> {
            const adapter: FilterQueryAdapter = new FilterQueryAdapter();
            const result: AsqlFilterDefinition = adapter.adapt(tokens.TOKEN_LIST);
            expect(result.condition).to.equal(FilterCondition.AND);
        });
        
        it('should create an AsqlFilterDefinition object with the FilterCondition.OR as default filter condition', ()=> {
            const adapter: FilterQueryAdapter = new FilterQueryAdapter();
            const result: AsqlFilterDefinition = adapter.adapt([tokens.TOKEN_1]);
            expect(result.condition).to.equal(FilterCondition.OR);
        });

        it('should throw an exception whether the filter condition is not valid', ()=> {
            const adapter: FilterQueryAdapter = new FilterQueryAdapter();
            const TOKEN: AsqlToken = {
                type: AsqlTokenType.CONDITION,
                value: '='
            };
            const shouldThrowError: Function = () => {
                adapter.adapt([TOKEN]);
            };
            assert.throws(shouldThrowError, AsteriaException, `filter condition must be AND or OR; found '${TOKEN.value}'`);
        });
        
        it('should throw an exception whether two different conditions are found', ()=> {
            const adapter: FilterQueryAdapter = new FilterQueryAdapter();
            const TOKEN_1: AsqlToken = {
                type: AsqlTokenType.CONDITION,
                value: 'AND'
            };
            const TOKEN_2: AsqlToken = {
                type: AsqlTokenType.CONDITION,
                value: 'OR'
            };
            const shouldThrowError: Function = () => {
                adapter.adapt([TOKEN_1, TOKEN_2]);
            };
            assert.throws(shouldThrowError, AsteriaException, 'filters support only one type of condition clause');
        });
    });
});