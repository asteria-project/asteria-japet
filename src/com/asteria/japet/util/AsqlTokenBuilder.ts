import { AsqlToken } from '../lang/AsqlToken';
import { AsqlTokenImpl } from '../core/AsqlTokenImpl';
import { AsqlTokenType } from '../lang/AsqlTokenType';
import { AbstractAsteriaObject } from 'asteria-gaia';

/**
 * A static builder for creating <code>AsqlToken</code> objects.
 */
export class AsqlTokenBuilder extends AbstractAsteriaObject {

    /**
     * Create a new <code>AsteriaDataBase</code> instance.
     */
    constructor() {
        super('com.asteria.japet.util::AsqlTokenBuilder');
    }

    /**
     * Create and return a new <code>AsqlToken</code> object.
     *
     * @param {AsqlTokenType} type the type of this AsQL token.
     * @param {any} value the value for this AsQL token.
     * 
     * @returns {AsqlToken} a new <code>AsqlToken</code> object.
     */
    public static build(type: AsqlTokenType, value: any): AsqlToken {
        return new AsqlTokenImpl(type, value);
    }
}
