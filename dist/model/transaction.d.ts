import { IAttestation, Attestation } from './attestation';
export interface ITransaction {
    uuid?: string;
    attestorPubKey: string;
    datetime: Date | string;
    attest: IAttestation[];
    revoke: IAttestation[];
    verifyRequest: IAttestation[];
    state?: string;
    error?: string;
}
/**
 * A Transaction is a way of recording data
 * transfers. The holder can either receive
 * or send data from/to other parties.
 * It is possible to send and receive data
 * in one transaction. In that case, attest
 * and verifyRequest are both filled.
 */
export declare class Transaction {
    private readonly _uuid;
    private readonly _attestorPubKey;
    private readonly _datetime;
    private readonly _attest;
    private readonly _revoke;
    private readonly _verifyRequest;
    private readonly _state?;
    private readonly _error?;
    constructor(transaction: ITransaction);
    /**
     * The uuid of the transaction
     * @return string
     */
    get uuid(): string;
    /**
     * The public key or DID from the attestor
     * @return string
     */
    get attestorPubKey(): string;
    /**
     * When the transaction took place
     * @return Date
     */
    get datetime(): Date;
    /**
     * The list of claims/credentialsubjects
     * that have been attested during this transaction
     * @return {Attestation[]}
     */
    get attest(): Attestation[];
    /**
     * The list of claims/credentialsubjects that
     * have been revoked during this transaction
     * @return {Attestation[]}
     */
    get revoke(): Attestation[];
    /**
     * The list of claims/credentialsubjects that
     * have been verified during this transaction
     * @return {Attestation[]}
     */
    get verifyRequest(): Attestation[];
    /**
     * Optional - the current state of this transaction
     * Can be 'success', 'error' or 'pending'
     * @return {string|undefined}
     */
    get state(): string | undefined;
    /**
     * Optional - the error message
     * @return {string|undefined}
     */
    get error(): string | undefined;
    /**
     * Converts a this object to a json object
     * @return object
     */
    toJSON(): object;
}
