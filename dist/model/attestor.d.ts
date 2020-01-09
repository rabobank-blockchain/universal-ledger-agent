import { IAttestation, Attestation } from './attestation';
import { ITransaction, Transaction } from './transaction';
export interface IAttestor {
    name: string;
    icon: string;
    pubKey: string;
    datetime: Date | string;
    transactions?: ITransaction[];
    receivedAttestations?: IAttestation[];
    issuedAttestations?: IAttestation[];
}
/**
 * All data sources and ULA plugins
 * must eventually transform their
 * attestors / issuers  back to this
 * model.
 */
export declare class Attestor {
    private readonly _name;
    private readonly _icon;
    private readonly _pubKey;
    private readonly _datetime;
    private _transactions?;
    private _receivedAttestations?;
    private _issuedAttestations?;
    constructor(attestor: IAttestor);
    /**
     * The (company) name of the attestor
     * @return string
     */
    get name(): string;
    /**
     * The icon respresentation of this attestor
     * @return string
     */
    get icon(): string;
    /**
     * The public key for this attestor
     * @return string
     */
    get pubKey(): string;
    /**
     * The date/time when this attestor
     * was added to the (local) storage
     * @return Date
     */
    get datetime(): Date;
    /**
     * Transactions made by this attestor
     * @return {Transaction[]|undefined}
     */
    get transactions(): Transaction[] | undefined;
    /**
     * Sets the transactions received by this attestor
     * @param {Transaction[]|undefined} transactions
     */
    set transactions(transactions: Transaction[] | undefined);
    /**
     * The attestations received by this attestor
     * @return {Attestation[]|undefined}
     */
    get receivedAttestations(): Attestation[] | undefined;
    /**
     * Sets the attestations received by this attestor
     * @param {Attestation[]|undefined} attestations
     */
    set receivedAttestations(attestations: Attestation[] | undefined);
    /**
     * The attestations issued by this attestation
     * @return {Attestation[]|undefined}
     */
    get issuedAttestations(): Attestation[] | undefined;
    /**
     * Sets the attestations issued by this attestor
     * @param {Attestation[]|undefined} attestations
     */
    set issuedAttestations(attestations: Attestation[] | undefined);
    /**
     * Converts a this object to a json object
     * @return object
     */
    toJSON(): object;
}
