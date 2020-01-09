/**
 * The UlaError has an extra field
 * 'statusCode' and inherits the Error type.
 */
export declare class UlaError extends Error {
    private readonly _statusCode;
    constructor(statusCode: string, message: string);
    /**
     * Status code
     * @return any
     */
    get statusCode(): any;
    /**
     * Converts a this object to a json object
     * @return object
     */
    toJSON(): object;
}
