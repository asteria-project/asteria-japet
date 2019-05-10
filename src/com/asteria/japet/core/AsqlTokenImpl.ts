import { AsqlToken } from '../lang/AsqlToken';
import { AsqlTokenType } from '../lang/AsqlTokenType';
import { AbstractAsteriaObject } from 'asteria-gaia';

/**
 * The default implementation of the <code>AsqlToken</code> interface.
 */
export class AsqlTokenImpl extends AbstractAsteriaObject implements AsqlToken {

    /**
     * @inheritdoc
     */
    public readonly type: AsqlTokenType;

    /**
     * @inheritdoc
     */
    public readonly value: any;

    /**
     * Create a new <code>AsqlTokenImpl</code> instance.
     *
     * @param {AsqlTokenType} type the type of this AsQL token.
     * @param {any} value the value for this AsQL token.
     */
    constructor(type: AsqlTokenType, value: any) {
        super('com.asteria.japet.core::AsqlTokenImpl');
        this.type = type;
        this.value = value;
    }
}
