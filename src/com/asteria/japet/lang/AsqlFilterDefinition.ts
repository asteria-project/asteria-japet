import { FilterCondition, FilterDefinition } from 'asteria-gaia';

/**
 * The <code>AsqlFilterDefinition</code> interface defines set of APIs you must implement to create AsQL filtering
 * definition objects.
 */
export interface AsqlFilterDefinition {

    /**
     * The condition for this <code>AsqlFilterDefinition</code> object. Default value is
     * <code>FilterCondition.OR</code>.
     */
    condition: FilterCondition;

    /**
     * The list of filters for this <code>AsqlFilterDefinition</code> object.
     */
    filters: Array<FilterDefinition>;
}
