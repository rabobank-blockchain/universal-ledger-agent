export interface IUlaResponse {
    statusCode: any;
    body: any;
    error?: Error;
}
/**
 * UlaResponse object is sent back to the caller
 * and acts like an HTTP response. It contains
 * a statuscode and a dynamic body.
 */
export declare class UlaResponse {
    private readonly _statusCode;
    private readonly _body;
    private readonly _error?;
    constructor(ulaResponse: IUlaResponse);
    /**
     * Status code
     * @return any
     */
    get statusCode(): any;
    /**
     * The dynamic body
     * @return any
     */
    get body(): any;
    /**
     * (Optional) error
     * @return Error|undefined
     */
    get error(): Error | undefined;
    /**
     * Converts a this object to a json object
     * NOTE: Some properties of the Error might
     *       be lost after serializing.
     * @return object
     */
    toJSON(): object;
}
