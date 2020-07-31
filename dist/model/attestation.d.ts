export interface IAttestation {
    uuid?: string;
    attestorPubKey: string;
    forPubKey?: string;
    context: string[];
    type: string[];
    expires?: Date | string;
    datetime: Date | string;
    statements: any;
}
/**
 * All data sources and ULA plugins
 * must eventually transform their
 * attestations / credentials back
 * to this model.
 */
export declare class Attestation {
    private readonly _uuid;
    private readonly _attestorPubKey;
    private readonly _forPubKey?;
    private readonly _context;
    private readonly _type;
    private readonly _expires?;
    private readonly _datetime;
    private readonly _statements;
    constructor(attestation: IAttestation);
    /**
     * The uuid of this attestation
     * @return string
     */
    get uuid(): string;
    /**
     * The attestor/issuer public key
     * (Can also be a DID)
     * @return string
     */
    get attestorPubKey(): string;
    /**
     * The forPubKey (the subject/holder)
     * @return {string|undefined}
     */
    get forPubKey(): string | undefined;
    /**
     * Gives context to the contents of
     * this attestation. Usually this is
     * a collection of schema.org url's.
     * @return {string[]}
     */
    get context(): string[];
    /**
     * Room for various types/properties
     * @return {string[]}
     */
    get type(): string[];
    /**
     * The expiry time of this attestation
     * @return {Date|undefined}
     */
    get expires(): Date | undefined;
    /**
     * The datetime when this attestation
     * was issued.
     * @return Date
     */
    get datetime(): Date;
    /**
     * The statements of this attestation.
     * This is a key-value pair array, just
     * like a set of claims or CredentialSubjects.
     * @return any
     */
    get statements(): any;
    /**
     * Converts this object to a json object
     * @return object
     */
    toJSON(): object;
}
