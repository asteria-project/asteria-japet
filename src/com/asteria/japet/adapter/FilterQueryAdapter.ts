import { AsqlToken } from '../lang/AsqlToken';
import { AsqlFilterDefinition } from '../lang/AsqlFilterDefinition';
import { FilterCondition, AsteriaLogger, AsteriaErrorCode, CommonChar, FilterDefinition, AbstractAsteriaObject, ErrorUtil, AsteriaError } from 'asteria-gaia';
import { AsqlTokenType } from '../lang/AsqlTokenType';
import { OuranosLogger, OuranosErrorBuilder } from 'asteria-ouranos';

// Static logger reference:
const LOGGER: AsteriaLogger = OuranosLogger.getLogger();

/**
 * The <code>FilterQueryAdapter</code> class allows to transform a series of AsQL tokens into an Asteria filtering
 * definition object.
 */
export class FilterQueryAdapter extends AbstractAsteriaObject {

    /**
     * The reference to the condition clause of the Asteria filtering definition object.
     */
    private _condition: FilterCondition = null;

    /**
     * The list of filters for the adapted <code>AsqlFilterDefinition</code> object.
     */
    private _filters: Array<FilterDefinition> = null; 

    /**
     * An accumulator used to create new <code>FilterDefinition</code> objects based on <code>AsqlToken</code>
     * references.
     */
    private _filterAcc: Array<AsqlToken> = null; 

    /**
     * Create a new <code>FilterQueryAdapter</code> instance.
     */
    constructor() {
        super('com.asteria.japet.adapter::FilterQueryAdapter');
    }

    /**
     * Turns a list of AsQL tokens into an Asteria filtering definition object.
     * 
     * @param {Array<AsqlToken>} tokens the list of tokens to turn into an Asteria filtering definition object.
     * 
     * @returns {AsqlFilterDefinition} an Asteria filtering definition object.
     */
    public adapt(tokens: Array<AsqlToken>): AsqlFilterDefinition {
        this._filters = new Array<FilterDefinition>();
        this._filterAcc = new Array<AsqlToken>();
        tokens.forEach((token: AsqlToken)=> {
            if (token.type === AsqlTokenType.CONDITION) {
                this.checkAndSetCondition(token);
            } else {
                this.checkAndAddToken(token);
            }
        });
        if (!this._condition) {
            this._condition = FilterCondition.OR;
        }
        return {
            condition: this._condition,
            filters: this._filters
        };
    }

    /**
     * Sets and/or checks the condition of the resulting <code>AsqlFilterDefinition</code> object.
     * 
     * @param {AsqlToken} token a token to the type of <code>AsqlTokenType.CONDITION</code>.
     */
    private checkAndSetCondition(token: AsqlToken): void {
        const condition: FilterCondition = token.value;
        let error: AsteriaError = null;
        if (condition !== FilterCondition.AND && condition !== FilterCondition.OR) {
            error = OuranosErrorBuilder.getInstance().build(
                AsteriaErrorCode.INVALID_ASQL_CONDITION,
                this.getClassName(),
                `filter condition must be AND or OR; found '${condition}'`
            )
            LOGGER.fatal(error.toString());
            throw ErrorUtil.errorToException(error);
        }
        if (!this._condition) {
            this._condition = condition;
        } else {
            if (this._condition !== condition) {
                error = OuranosErrorBuilder.getInstance().build(
                    AsteriaErrorCode.INVALID_ASQL_CONDITION,
                    this.getClassName(),
                    'filters support only one type of condition clause'
                );
                LOGGER.fatal(error.toString());
                throw ErrorUtil.errorToException(error);
            }
        }
    }

    /**
     * Check ans add the specified to the tokens accumulator.
     * 
     * @param {AsqlToken} token the token to validate and to add to the tokens accumulator.
     */
    private checkAndAddToken(token: AsqlToken): void {
        this._filterAcc.push(token);
        if (this._filterAcc.length === 3) {
            const filter: FilterDefinition = {
                property: this._filterAcc[0].value,
                operator: this._filterAcc[1].value,
                value: this._filterAcc[2].value,
            };
            this._filters.push(filter);
            this._filterAcc.splice(0);
        }
    }
}
