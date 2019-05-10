/*!
 * Asteria Japet Node Module
 * Copyright(c) 2019 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the Asteria Project: <https://github.com/asteria-project>
 */

declare module "asteria-japet" {

import { FilterCondition, FilterDefinition, AbstractAsteriaObject } from "asteria-gaia";

export class FilterQueryAdapter extends AbstractAsteriaObject {
    private _condition;
    private _filters;
    private _filterAcc;
    constructor();
    adapt(tokens: Array<AsqlToken>): AsqlFilterDefinition;
    private checkAndSetCondition;
    private checkAndAddToken;
}
export class AsqlTokenImpl extends AbstractAsteriaObject implements AsqlToken {
    readonly type: AsqlTokenType;
    readonly value: any;
    constructor(type: AsqlTokenType, value: any);
}
export interface AsqlFilterDefinition {
    condition: FilterCondition;
    filters: Array<FilterDefinition>;
}
export class AsqlParser extends AbstractAsteriaObject {
    private static readonly SINGLE_QUOTE;
    private static readonly DOUBLE_QUOTE;
    constructor();
    parse(query: string): Array<AsqlToken>;
    private createTokenList;
    private getValue;
    private getValueError;
}
export interface AsqlToken {
    type: AsqlTokenType;
    value: any;
}
export enum AsqlTokenType {
    OPERATOR = 0,
    OPERAND = 1,
    CONDITION = 2
}
export class AsqlTokenBuilder extends AbstractAsteriaObject {
    constructor();
    static build(type: AsqlTokenType, value: any): AsqlToken;
}
}