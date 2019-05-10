/**
 * The <code>AsqlTokenType</code> enum defines the list of AsQL tokens types.
 */
export enum AsqlTokenType {

    /**
     * Specifies an operator in a relational operation.
     */
    OPERATOR = 0,

    /**
     * Specifies an operant in a relational operation.
     */
    OPERAND = 1,

    /**
     * Specifies a logical assembly in a relational operation.
     */
    CONDITION = 2
}
